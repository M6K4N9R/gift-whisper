import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const gelica = localFont({
  src: "./fonts/Fontspring-DEMO-gelica-bold.otf",
  variable: "--font-gelica",
  weight: "800",
});

export const metadata: Metadata = {
  title: "Create your Gift list for any occasion",
  description: "Add gifts from any website and share it with anyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${gelica.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
