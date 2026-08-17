import type { Metadata, Viewport } from "next";
import { Nunito, Noto_Sans_Armenian } from "next/font/google";
import { ProgressProvider } from "@/lib/store";
import { ScreenshotGuard } from "@/components/layout/ScreenshotGuard";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

const armenian = Noto_Sans_Armenian({
  variable: "--font-armenian",
  subsets: ["armenian"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Le Lingo — Ֆրանսերեն սովորիր",
  description:
    "Le Lingo — հայերեն ինտերֆեյսով ֆրանսերենի ուսուցման հավելված A1–B2 մակարդակների համար",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#C7E0E7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hy" className={`${nunito.variable} ${armenian.variable} h-full`}>
      <body className="min-h-full antialiased">
        <ProgressProvider>
          <ScreenshotGuard>
            <div className="app-shell bg-[#FAFAFA]">{children}</div>
          </ScreenshotGuard>
        </ProgressProvider>
      </body>
    </html>
  );
}
