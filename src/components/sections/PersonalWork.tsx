"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Clock,
  CheckCircle2,
  Hammer,
  Gavel,
  IdCard,
  Radio,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

type Status = "coming-soon" | "in-progress" | "live";

interface PersonalProject {
  name: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  stack: string[];
  status: Status;
  demoUrl: string | null;
  githubUrl: string | null;
  accent: "violet" | "cyan" | "emerald";
}

const projects: PersonalProject[] = [
  {
    name: "BidWars",
    icon: Gavel,
    tagline: "Multiplayer live auction · WebSocket bidding in real time",
    description:
      "The same real-time sync pattern I shipped on Lincpay's e-procurement auction — public, multiplayer, and 100% my code. Join via room code on two phones and watch the prices fight live.",
    stack: ["Next.js", "TypeScript", "Supabase Realtime", "Tailwind"],
    status: "live",
    demoUrl: "https://bidwars-alpha.vercel.app",
    githubUrl: "https://github.com/Chandrakant-Nagwanshi/bidwars",
    accent: "violet",
  },
  {
    name: "SmartKYC",
    icon: IdCard,
    tagline: "Multi-step onboarding · React Hook Form + Zod validation",
    description:
      "Mirrors the merchant KYC flow I built into Lincpay's payment panel. Same form architecture, animated step transitions, document preview, mock OTP — public demo so the pattern is verifiable.",
    stack: ["Next.js", "TypeScript", "React Hook Form", "Zod", "Tailwind"],
    status: "coming-soon",
    demoUrl: null,
    githubUrl: null,
    accent: "cyan",
  },
  {
    name: "Pulse",
    icon: Radio,
    tagline: "Live event polling · sub-100ms results across devices",
    description:
      "Real-time sync applied to a different domain. Create a poll, share a QR code, watch audience votes update on screen in real time. Proves WebSocket fluency beyond auctions.",
    stack: ["Next.js", "TypeScript", "Supabase Realtime", "Tailwind"],
    status: "coming-soon",
    demoUrl: null,
    githubUrl: null,
    accent: "emerald",
  },
];

const accentMap = {
  violet: {
    badge: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    icon: "text-violet-400",
    hoverBorder: "hover:border-violet-500/30",
    glow: "bg-violet-500/5",
  },
  cyan: {
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    icon: "text-cyan-400",
    hoverBorder: "hover:border-cyan-500/30",
    glow: "bg-cyan-500/5",
  },
  emerald: {
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    icon: "text-emerald-400",
    hoverBorder: "hover:border-emerald-500/30",
    glow: "bg-emerald-500/5",
  },
};

function StatusBadge({ status }: { status: Status }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-display">
        <CheckCircle2 className="w-3 h-3" />
        Live
      </span>
    );
  }
  if (status === "in-progress") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20 font-display">
        <Hammer className="w-3 h-3" />
        Building now
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-white/5 text-gray-300 border border-white/10 font-display">
      <Clock className="w-3 h-3" />
      Coming Soon
    </span>
  );
}

export default function PersonalWork() {
  return (
    <section
      id="work"
      className="relative py-32 px-5 md:px-10 max-w-[1200px] mx-auto"
    >
      <div className="mb-14 max-w-2xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4 font-display"
        >
          04 · Personal Work
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tight text-white leading-tight"
        >
          Public proof of the <span className="text-gradient">skills I use at work.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-400 text-base md:text-lg mt-5 leading-relaxed"
        >
          Lincpay&apos;s code is under NDA, so I&apos;m building public versions of the same patterns — open repos, live demos, my own IP. Click through and try them.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {projects.map((proj, i) => {
          const accent = accentMap[proj.accent];
          const Icon = proj.icon;
          const isLive = proj.status === "live";
          const isFeatured = proj.name === "BidWars";

          return (
            <motion.article
              key={proj.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-80px" }}
              className={`glass rounded-3xl p-6 md:p-7 relative overflow-hidden flex flex-col ${
                isFeatured ? "lg:col-span-2 md:flex-row gap-6 md:items-stretch" : "lg:col-span-1 gap-5"
              } ${accent.hoverBorder} transition-colors`}
            >
              <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full ${accent.glow} blur-3xl pointer-events-none`} />

              {/* Information Half */}
              <div className="flex-1 flex flex-col gap-5 justify-between">
                <div className="flex flex-col gap-4">
                  <header className="flex items-start justify-between gap-3">
                    <div className={`w-11 h-11 rounded-xl ${accent.badge} border flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${accent.icon}`} />
                    </div>
                    <StatusBadge status={proj.status} />
                  </header>

                  <div>
                    <h3 className="text-2xl font-display font-black text-white tracking-tight">{proj.name}</h3>
                    <p className={`text-xs font-bold mt-1 ${accent.icon}`}>{proj.tagline}</p>
                  </div>

                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/5 border border-white/10 text-gray-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <footer className="flex items-center gap-2 mt-auto pt-2">
                  {isLive && proj.demoUrl ? (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-display font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-violet-500/20 transition-all active:scale-95 cursor-pointer`}
                    >
                      Live demo <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      disabled
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-display font-black bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed"
                    >
                      {proj.status === "in-progress" ? "Demo soon" : "Coming soon"}
                    </button>
                  )}

                  {proj.githubUrl ? (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-display font-black bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 hover:text-white transition-all active:scale-95 cursor-pointer"
                    >
                      <GithubIcon className="w-3.5 h-3.5" /> Code
                    </a>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-display font-black bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed"
                    >
                      <GithubIcon className="w-3.5 h-3.5" /> Code
                    </button>
                  )}
                </footer>
              </div>

              {/* Bespoke Human-built Code Snippet Register for Featured card */}
              {isFeatured && (
                <div className="hidden md:flex flex-col w-[320px] shrink-0 bg-[#070709] border border-white/5 rounded-2xl overflow-hidden text-[9px] font-mono leading-relaxed p-4 h-full relative shadow-inner">
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20 text-[8px] font-black uppercase tracking-widest font-display">
                    useBiddingFeed.ts
                  </div>
                  <div className="text-gray-500 border-b border-white/5 pb-2 mb-3 uppercase text-[8px] font-black tracking-widest font-display flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse shadow-md shadow-violet-500/50" />
                    STOMP WebSocket Sync Hook
                  </div>
                  <pre className="text-gray-300 overflow-x-auto whitespace-pre h-[180px] scrollbar-thin select-text">
                    <code className="text-gray-400">
                      <span className="text-violet-400">{"function"}</span> <span className="text-violet-300">{"useBiddingFeed"}</span>{"(tenderId: string) {"}
                      {"\n  const [bids, setBids] = useState([]);"}
                      {"\n  useEffect(() => {"}
                      {"\n    const sock = new SockJS(\"/ws-api\");"}
                      {"\n    const client = Stomp.over(sock);"}
                      {"\n    client.connect({}, () => {"}
                      {"\n      client.subscribe(`/auction/${tenderId}`, (msg) => {"}
                      {"\n        const newBid = JSON.parse(msg.body);"}
                      {"\n        setBids(prev => [newBid, ...prev].slice(0, 5));"}
                      {"\n      });"}
                      {"\n    });"}
                      {"\n    return () => client.disconnect();"}
                      {"\n  }, [tenderId]);"}
                      {"\n  return bids;"}
                      {"\n}"}
                    </code>
                  </pre>
                </div>
              )}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
