import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/common/top-bar";
 import { Toggle } from "@/components/ui/toggle"
import { BookmarkIcon, ItalicIcon } from "lucide-react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "vip 한방재활센터 by Dr.신사경",
  description: "vip 한방재활센터 알림톡 자동 프로그램",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Toggle aria-label="Toggle bookmark" size="sm" variant="outline" className="flex items-center">
      <BookmarkIcon className="group-data-[state=on]/toggle:fill-black" />
      Bookmark
    </Toggle>
        <TopBar />
        {children}
      </body>
    </html>
  );
}
