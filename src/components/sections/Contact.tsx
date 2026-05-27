"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Download, Loader2, Check, ExternalLink, Sparkles } from "lucide-react";
import { resumeData } from "@/data/resumeContext";
import MagneticButton from "../ui/MagneticButton";
import { useChat } from "../chat/ChatContext";

export default function Contact() {
  const [resumeState, setResumeState] = useState<"idle" | "generating" | "complete">("idle");
  const [progress, setProgress] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);
  const { openPanel } = useChat();

  const handleEmailClick = async () => {
    const email = resumeData.personalInfo.email;
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // older browsers — silently fall through; mailto attempt below still runs
    }
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);

    // Also attempt to open the default mail client (works only if one is registered).
    window.location.href = `mailto:${email}?subject=Opportunity for Chandrakant`;
  };

  const handleDownloadResume = () => {
    if (resumeState !== "idle") return;
    setResumeState("generating");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setResumeState("complete");

          const link = document.createElement("a");
          link.href = "/Chandrakant_Nagwanshi_Resume.pdf";
          link.download = "Chandrakant_Nagwanshi_Resume.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setTimeout(() => setResumeState("idle"), 3000);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  return (
    <section id="contact" className="relative py-32 px-5 md:px-10 max-w-[1200px] mx-auto">
      <div className="relative glass rounded-3xl p-8 md:p-14 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-violet-600/15 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4 font-display"
            >
              06 · Let&apos;s talk
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-display font-black tracking-tight text-white leading-tight"
            >
              Have a role I&apos;d <span className="text-gradient">love?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-300 text-base md:text-lg mt-5 leading-relaxed max-w-md"
            >
              I respond to recruiter messages within 24 hours. Reach out directly, or have my AI copilot answer screening questions first.
            </motion.p>

            <div className="flex flex-wrap gap-3 mt-8">
              <button
                onClick={handleEmailClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-display font-black transition-all shadow-xl shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                {emailCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" /> Copied — paste in your mail app!
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" /> Email me
                  </>
                )}
              </button>
              <MagneticButton
                onClick={openPanel}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-display font-black transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-violet-400" /> Ask my AI
              </MagneticButton>
              <MagneticButton
                onClick={handleDownloadResume}
                disabled={resumeState !== "idle"}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-display font-black transition-colors disabled:opacity-80 cursor-pointer"
              >
                {resumeState === "idle" && (
                  <>
                    <Download className="w-4 h-4" /> Download resume
                  </>
                )}
                {resumeState === "generating" && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> {progress}%
                  </>
                )}
                {resumeState === "complete" && (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" /> Downloaded
                  </>
                )}
              </MagneticButton>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={handleEmailClick}
              className="group flex items-center gap-4 p-5 rounded-2xl bg-white/3 border border-white/8 hover:border-violet-500/30 transition-colors text-left w-full cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 transition-colors">
                {emailCopied ? (
                  <Check className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Mail className="w-5 h-5 text-violet-400" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-display block">
                  {emailCopied ? "Copied to clipboard" : "Email · click to copy"}
                </span>
                <span className="text-base font-bold text-white truncate block">{resumeData.personalInfo.email}</span>
              </div>
            </button>

            <a
              href={`tel:${resumeData.personalInfo.phone}`}
              className="group flex items-center gap-4 p-5 rounded-2xl bg-white/3 border border-white/8 hover:border-violet-500/30 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 transition-colors">
                <Phone className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-display block">Phone</span>
                <span className="text-base font-bold text-white">{resumeData.personalInfo.phone}</span>
              </div>
            </a>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/3 border border-white/8">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-display block">Location</span>
                <span className="text-base font-bold text-white">{resumeData.personalInfo.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <a
                href={`https://${resumeData.personalInfo.github}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-white/3 border border-white/8 hover:border-violet-500/30 text-violet-300 hover:text-white text-sm font-black transition-colors"
              >
                GitHub <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={`https://${resumeData.personalInfo.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-white/3 border border-white/8 hover:border-cyan-500/30 text-cyan-300 hover:text-white text-sm font-black transition-colors"
              >
                LinkedIn <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
