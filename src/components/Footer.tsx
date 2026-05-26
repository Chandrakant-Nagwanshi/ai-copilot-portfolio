import React from "react";
import { Terminal } from "lucide-react";
import { resumeData } from "@/data/resumeContext";

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/8 py-6 px-5 md:px-10 bg-[#08080A] z-10">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-gray-500 font-semibold">
        <p>© 2026 {resumeData.personalInfo.name}. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          Built with Next.js 16, React 19, Tailwind 4, Framer Motion 12, and a custom AI copilot.
        </p>
      </div>
    </footer>
  );
}
