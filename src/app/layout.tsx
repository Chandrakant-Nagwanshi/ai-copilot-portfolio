import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import { ChatProvider } from "@/components/chat/ChatContext";

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
  themeColor: "#08080A",
  width: "device-width",
  initialScale: 1,
};

const siteTitle = "Chandrakant Nagwanshi — React Engineer with an AI Career Copilot";
const siteDescription =
  "React Engineer (2+ yrs) shipping real-time fintech, healthcare, and e-procurement at scale. This portfolio includes an AI copilot trained on my full resume — ask it anything.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Chandrakant Nagwanshi",
    "React Developer",
    "Frontend Engineer",
    "Next.js Portfolio",
    "AI Recruiter Copilot",
    "WebSockets",
    "TypeScript",
    "Redux Toolkit",
    "React Query",
    "Bhopal",
  ],
  authors: [{ name: "Chandrakant Nagwanshi" }],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    locale: "en_US",
    siteName: "Chandrakant Nagwanshi · Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
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
      <body
        className="min-h-full flex flex-col font-sans selection:bg-violet-500/30 selection:text-violet-200"
        suppressHydrationWarning
      >
        <ChatProvider>{children}</ChatProvider>
      </body>
    </html>
  );
}

