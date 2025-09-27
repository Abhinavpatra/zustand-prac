import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zustand",
  description: "Next JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

      <Link className="p-2 m-2 bg-amber-50 rounded-2xl text-black" href="/Form">form to add</Link>
      <Link className="p-2 m-2 bg-amber-50 rounded-2xl text-black" href='/List'>List of all</Link>

      </body>
    </html>
  );
}

