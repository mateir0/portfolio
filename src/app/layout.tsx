import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

import { content } from "@/data/content";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
  keywords: [
    "Muhammad Hashir",
    "Full-Stack Developer",
    "Oman",
    "Muscat",
    "Remote Developer",
    "Web Developer Muscat",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Muhammad Hashir", url: "https://github.com/mateir0" }],
  openGraph: {
    title: content.metadata.title,
    description: content.metadata.description,
    url: "https://grantquest.tech",
    siteName: content.person.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: content.metadata.title,
    description: content.metadata.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}