"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Briefcase, Clock, MapPin, Sparkles } from "lucide-react";
import ChatInput from "../chat/ChatInput";
import { useChat } from "../chat/ChatContext";

const headline = ["Don't", "read", "my", "resume."];
const headlineAccent = ["Ask", "my", "AI."];

const quickPrompts = [
  "What are his biggest production wins?",
  "Show me the WebSocket auction project",
  "Why hire him over other 2 YOE devs?",
];

export default function Hero() {
  const { scrollY } = useScroll();
  const yShift = useTransform(scrollY, [0, 600], [0, -120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const { sendMessage, openPanel } = useChat();

  const handlePrompt = (q: string) => {
    openPanel();
    sendMessage(q);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-5"
    >
      <div className="mesh-gradient animate-pulse-slow" />
      <div className="noise-overlay" />
      <div className="absolute top-1/4 -left-32 w-[40rem] h-[40rem] rounded-full bg-violet-600/10 blur-[140px] animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[40rem] h-[40rem] rounded-full bg-cyan-500/10 blur-[140px] animate-float pointer-events-none" style={{ animationDelay: "4s" }} />

      <motion.div
        style={{ y: yShift, opacity }}
        className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center gap-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2.5"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shadow-inner">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
            </span>
            Open to senior roles · available July 2026
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white/5 text-gray-200 border border-white/10">
            <Briefcase className="w-3.5 h-3.5 text-violet-400" />
            Currently @ Lincpay · React Engineer
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white/5 text-gray-200 border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            Bhopal · open to relocate
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white/5 text-gray-200 border border-white/10">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            30-45 day notice
          </span>
        </motion.div>

        <h1 className="font-display font-black tracking-tight leading-[0.95] text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="block">
            {headline.map((w, i) => (
              <motion.span
                key={w + i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: "easeOut" }}
                className="inline-block mr-3 lg:mr-4 text-white"
              >
                {w}
              </motion.span>
            ))}
          </span>
          <span className="block mt-1">
            {headlineAccent.map((w, i) => (
              <motion.span
                key={w + i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.06, duration: 0.5, ease: "easeOut" }}
                className="inline-block mr-3 lg:mr-4 text-gradient"
              >
                {w}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed"
        >
          I&apos;m <span className="text-white font-semibold">Chandrakant Nagwanshi</span>, a React engineer who ships real-time fintech, healthcare, and e-procurement platforms. This portfolio comes with its own
          <span className="text-violet-300 font-semibold"> AI copilot </span>
          trained on my full work history — ask it anything.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="w-full flex flex-col items-center gap-4 mt-4"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest bg-violet-500/10 text-violet-300 border border-violet-500/20 font-display"
          >
            <ArrowDown className="w-3 h-3" />
            Talk to my AI — it knows everything about me
          </motion.div>

          <ChatInput
            variant="hero"
            placeholder="e.g. What was the hardest part of the auction engine?"
            openPanelOnSend
          />
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black mr-2 hidden sm:inline">
              Try:
            </span>
            {quickPrompts.map((q) => (
              <button
                key={q}
                onClick={() => handlePrompt(q)}
                className="px-3.5 py-2 rounded-full text-xs md:text-sm font-semibold bg-white/3 hover:bg-violet-500/10 border border-white/8 hover:border-violet-500/30 text-gray-300 hover:text-white transition-all cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-500 z-10 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold font-display">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

      <div className="absolute top-28 right-6 hidden lg:flex items-center gap-2 text-[10px] text-gray-500 font-mono">
        <Sparkles className="w-3 h-3 text-violet-400" />
        <span>Powered by Gemini 2.5 Flash</span>
      </div>
    </section>
  );
}
