"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Sparkles } from "lucide-react";
import { useChat } from "./chat/ChatContext";

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "playground", label: "Playground" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState<string>("hero");
  const [scrolled, setScrolled] = useState(false);
  const { openPanel } = useChat();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["hero", ...navItems.map((n) => n.id)];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleJump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#08080A]/80 backdrop-blur-xl border-b border-white/8"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-16 flex items-center justify-between gap-4">
        <a
          href="#hero"
          onClick={handleJump("hero")}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center font-display font-black text-sm text-white shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform">
            CN
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-display font-black text-sm text-white tracking-tight">Chandrakant Nagwanshi</span>
            <span className="text-[9px] text-violet-400 font-black tracking-widest uppercase flex items-center gap-1 font-display">
              <Cpu className="w-3 h-3" /> Frontend React Engineer
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1 bg-white/3 border border-white/5 rounded-full p-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={handleJump(item.id)}
              className="relative px-4 py-2 text-sm font-bold rounded-full transition-colors cursor-pointer"
            >
              {active === item.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full shadow-lg shadow-violet-500/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${active === item.id ? "text-white" : "text-gray-400 hover:text-white"}`}>
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        <button
          onClick={openPanel}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-500/20 transition-all active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ask AI</span>
        </button>
      </div>
    </motion.header>
  );
}
