import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0C",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Chandrakant Nagwanshi | Frontend React & AI Engineer",
  description: "Interactive portfolio and custom AI Recruiter Copilot of Chandrakant Nagwanshi, showcasing production-tested WebSockets, state sync, and premium web architectures.",
  keywords: [
    "Chandrakant Nagwanshi",
    "React Developer",
    "Frontend Engineer",
    "Bhopal",
    "WebSockets",
    "Next.js Portfolio",
    "AI Recruiter Copilot",
    "TypeScript",
    "Redux Toolkit"
  ],
  authors: [{ name: "Chandrakant Nagwanshi" }],
  openGraph: {
    title: "Chandrakant Nagwanshi | Frontend React & AI Engineer",
    description: "Interactive developer portfolio featuring a secure AI recruiter copilot and real-time simulators.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-violet-500/30 selection:text-violet-200" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

