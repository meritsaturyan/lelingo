import { NextRequest, NextResponse } from "next/server";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Clear, natural French female neural voice */
const FRENCH_VOICE = "fr-FR-DeniseNeural";

function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

export async function GET(req: NextRequest) {
  const text = (req.nextUrl.searchParams.get("text") || "").trim();
  if (!text) {
    return NextResponse.json({ error: "text required" }, { status: 400 });
  }
  if (text.length > 400) {
    return NextResponse.json({ error: "text too long" }, { status: 400 });
  }

  try {
    const tts = new MsEdgeTTS();
    await tts.setMetadata(
      FRENCH_VOICE,
      OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3
    );

    const rateParam = req.nextUrl.searchParams.get("rate");
    const rate = rateParam ? Number(rateParam) : 0.9;
    const { audioStream } = tts.toStream(text, {
      rate: Number.isFinite(rate) ? rate : 0.9,
      pitch: "default",
    });

    const buffer = await streamToBuffer(audioStream);
    tts.close();

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch (err) {
    console.error("TTS error", err);
    return NextResponse.json({ error: "tts_failed" }, { status: 500 });
  }
}
