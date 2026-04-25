import type { Metadata } from "next";
import { Syne, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anselmo Ferrer — Full Stack Engineer",
  description:
    "Full Stack Software Engineer building internal web platforms at Casa dos Ventos. Specializing in React, Next.js, TypeScript, and Node.js.",
  keywords: ["Full Stack Engineer", "React", "Next.js", "TypeScript", "Node.js", "Software Engineer"],
  authors: [{ name: "Anselmo Ferrer" }],
  openGraph: {
    title: "Anselmo Ferrer — Full Stack Engineer",
    description: "Full Stack Software Engineer specializing in React, Next.js, and TypeScript.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anselmo Ferrer — Full Stack Engineer",
    description: "Full Stack Software Engineer specializing in React, Next.js, and TypeScript.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
