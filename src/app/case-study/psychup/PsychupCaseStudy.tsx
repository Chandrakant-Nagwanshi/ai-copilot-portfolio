"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Calendar,
  Layers,
  Check,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useChat } from "@/components/chat/ChatContext";

const stats = [
  { icon: Briefcase, label: "Role", value: "Lead Frontend Engineer · sole frontend owner" },
  { icon: Layers, label: "Scale", value: "3 role-based dashboards · 100+ screens · 200+ components" },
  { icon: Calendar, label: "Duration", value: "Oct 2024 — present at Lincpay Solutions" },
];

const techStack: Record<string, string[]> = {
  "Frontend core": ["React 19", "TypeScript", "Vite 7", "SWC"],
  "State management": ["TanStack Query", "Redux Toolkit", "redux-persist", "React Context"],
  "Styling & UI": ["Tailwind CSS 4", "Radix UI", "Headless UI", "MUI (selective)", "shadcn-style patterns", "class-variance-authority", "tailwind-merge"],
  "Motion": ["Framer Motion", "tw-animate-css", "Lottie"],
  "API & data": ["Axios + interceptors", "TanStack Query mutations", "Real-time polling layer"],
  "Routing": ["React Router 7", "Role-based protected routes", "Dynamic route generation"],
  "Charts & viz": ["Recharts", "Nivo", "D3", "react-circular-progressbar"],
  "PDF pipeline": ["Playwright (headless browser)", "jsPDF", "html2canvas", "html-to-image", "react-to-print"],
  "Forms & inputs": ["Radix form primitives", "input-otp", "react-phone-input-2", "react-day-picker", "MUI date pickers"],
  "Theming": ["next-themes", "Tailwind CSS variables", "Theme-aware chart palettes"],
  "Tooling": ["ESLint 9", "TypeScript ESLint", "Vite PWA plugin", "TS project references"],
  "Performance": ["Code splitting", "List virtualization", "React.memo discipline", "Suspense + skeletons", "Request dedup"],
  "Drag & drop": ["@dnd-kit/core", "@dnd-kit/sortable"],
};

const architecturePillars = [
  {
    head: "Feature-based folder structure",
    body: "features/appointments, features/assessments, features/tests, features/organization … domain logic stays colocated and cross-module coupling is prevented at the file system layer.",
  },
  {
    head: "Shared component library on Radix + Tailwind tokens",
    body: "Accessibility for free, one visual language across every role. Primitives → compounds → feature components, with variant APIs powered by class-variance-authority.",
  },
  {
    head: "Context-aware page layer",
    body: "Pages like assessment preview, patient profile, and report viewer detect their consumer (therapist vs. patient vs. organization vs. public) and adapt their toolbar, permissions, and layout — without forking the code.",
  },
  {
    head: "TanStack Query for all server state",
    body: "Normalized cache keys, optimistic updates on common mutations, background refetching for live data like appointment status and payment polling.",
  },
  {
    head: "Redux Toolkit only for client-only concerns",
    body: "Auth session, theme, UI preferences — persisted via redux-persist. Server data never crosses into Redux.",
  },
];

const designDecisions = [
  {
    title: "Command-style therapist dashboard",
    body: "Surfaces today's appointments, pending reports, and unread assignments above the fold — derived from interviewing how clinicians actually start their day, not how product owners imagine it.",
  },
  {
    title: "Public payment pages with silent polling",
    body: "QR + link flow lets therapists collect fees from patients who don't yet have an account. The page polls silently for payment confirmation and transitions to a success state without a reload.",
  },
  {
    title: "Combined report rendering for batteries",
    body: "When an organization assigns multiple tests, the patient gets a single unified PDF instead of three — with a generated summary section that contextualizes results across instruments.",
  },
  {
    title: "Bulk assignment workspace",
    body: "Drag-select employee grid + multi-select test panel + live cost preview, all on one screen — reducing what was originally a five-step wizard into a single fluid surface.",
  },
];

const technicalChallenges = [
  {
    title: "Dynamic PDF reports via component registry",
    body: "Each assessment declares its own report layout as a React component. The same component renders inside the app, on a public share page, and inside a Playwright-driven headless browser that produces the final printable PDF — guaranteeing visual parity across all three surfaces.",
  },
  {
    title: "Print-quality output from a SPA",
    body: "Solved the long-standing problem of generating clinical-grade PDFs from React by combining html2canvas/jsPDF for client-side previews and a Playwright pipeline for the authoritative PDF, with a shared CSS contract so preview matches print.",
  },
  {
    title: "Real-time payment polling without sockets",
    body: "Implemented an exponential-backoff polling layer over TanStack Query that gracefully degrades, cancels on unmount, and pauses on tab blur to save bandwidth.",
  },
  {
    title: "Theme architecture",
    body: "Token-driven dark/light system built on Tailwind 4's CSS variables, integrated with next-themes and gated through prefers-color-scheme — with theme-aware Recharts/Nivo color palettes.",
  },
  {
    title: "Performance under scale",
    body: "Virtualized patient and appointment lists, route-level code splitting, memoized chart subtrees, and skeleton loaders on every async surface — keeping perceived latency near zero on 1000+ row datasets.",
  },
];

const complexParts = [
  {
    title: "Dynamic Report Generation System",
    body: "Registry pattern where every assessment declares its own report React component, scoring logic, and metadata. Adding a new test is dropping a folder into the registry — no wiring changes elsewhere.",
  },
  {
    title: "Shared Rendering Pipeline (Preview ↔ Public ↔ Print)",
    body: "The same report component renders in three contexts with different chrome, permissions, and constraints. Solved through context-aware wrappers, a shared CSS contract, and strict separation between report content and shell.",
  },
  {
    title: "Playwright Headless PDF Pipeline",
    body: "Signed URLs, render-ready route variants, font/asset preloading guarantees, and deterministic CSS — producing print-quality clinical PDFs from the same React components used in-app.",
  },
  {
    title: "Combined Multi-Test Report Layouts",
    body: "When orgs assign a battery of tests, the system composes a single unified report with cross-instrument summaries — requiring a layout engine that sequences sub-reports, shares a cover/footer, and avoids page-break artifacts.",
  },
  {
    title: "Context-Aware Reusable Pages",
    body: "Patient profile, report viewer, and assessment preview all detect their consumer and adapt — preventing the classic mistake of forking pages per role.",
  },
  {
    title: "Multi-Role Dashboard Architecture",
    body: "Three completely different products (therapist, patient, organization) sharing one codebase, one component library, one routing layer, and one auth model — without leaking concerns across modules.",
  },
];

const engineeringPractices = [
  "Component-driven architecture (primitive → compound → feature layering)",
  "Reusable, tokenized design system (Radix + Tailwind 4 + CVA)",
  "Theme tokenization via CSS variables → Tailwind utilities",
  "Dynamic rendering systems (report registry, role-derived routes)",
  "Context-aware shared pages that adapt without forking code",
  "Headless-browser render pipeline (Playwright) for PDF output",
  "Optimistic UI on common mutations with rollback on failure",
  "API abstraction via Axios interceptors + typed service layer",
  "Feature-based folder structure for domain isolation",
  "Motion + interaction design language consistent across platform",
  "Dark mode architecture end-to-end (UI + charts + report)",
  "Responsive-first development from mobile breakpoints up",
  "Skeleton loaders on every async surface",
  "Accessibility via Radix primitives (focus, ARIA, keyboard nav)",
  "Production-grade scalability patterns (lazy routes, virtualization)",
  "Real-time polling with backoff, cancellation, visibility awareness",
  "Modern React 19 patterns (transitions, concurrent rendering)",
];

const ownershipHighlights = [
  "Sole frontend owner of a production healthcare platform serving three distinct user roles — from scoping to ship.",
  "Authored every UI/UX decision without external design references: information architecture, visual language, motion system, component patterns.",
  "Built and maintained the design system the entire application sits on — visual and behavioural consistency across 100+ screens.",
  "Defined frontend ↔ backend data contracts for major modules (assessments, reports, payments, appointments), driving API shape decisions with engineering counterparts.",
  "Translated product requirements into scalable systems, not one-off pages — the report registry and context-aware shared pages emerged from anticipating future scale, not retrofitting it.",
  "Led architectural decisions on state separation, folder structure, routing strategy, and theming — decisions still standing as the codebase grows.",
  "Owned the report rendering pipeline end-to-end: client preview, public share, Playwright print, including its CSS contract and asset strategy.",
  "Built features independently under ambiguous specs, making and defending product trade-offs (e.g. single bulk-assignment surface vs. multi-step wizard).",
  "Maintained consistency across large modules by enforcing shared primitives, design tokens, and patterns — preventing the typical 'every page looks different' drift.",
  "Engineered for forward compatibility: adding a new psychometric test, a new role view, or a new report layout is a localized change, not a cross-cutting one.",
];

function SectionHeader({
  num,
  kicker,
  title,
}: {
  num: string;
  kicker: string;
  title: React.ReactNode;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4 font-display"
      >
        {num} · {kicker}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tight text-white leading-tight"
      >
        {title}
      </motion.h2>
    </div>
  );
}

export default function PsychupCaseStudy() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.4 });
  const { openPanel, sendMessage } = useChat();

  const askAboutPsychup = () => {
    openPanel();
    sendMessage("Tell me more about the PsychUp project — what was the hardest engineering decision, and what would you do differently next time?");
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 z-50 origin-left"
      />

      {/* Mini nav */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-[#08080A]/80 backdrop-blur-xl border-b border-white/8"
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 h-16 flex items-center justify-between gap-4">
          <Link
            href="/#experience"
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to portfolio
          </Link>
          <span className="text-[10px] font-black tracking-widest uppercase text-gray-500 font-display hidden sm:inline">
            Case study · 01 · PsychUp
          </span>
          <button
            onClick={openPanel}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-500/20 transition-all active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </div>
      </motion.header>

      <main className="relative">
        <div className="mesh-gradient animate-pulse-slow" />
        <div className="noise-overlay" />

        {/* HERO */}
        <section className="relative pt-20 pb-16 px-5 md:px-10 max-w-[1200px] mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-display"
          >
            Production · Healthcare SaaS
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-white leading-[0.95] mt-4"
          >
            Psych<span className="text-gradient">Up.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-300 mt-5 max-w-3xl leading-relaxed"
          >
            Bringing modern product engineering to mental healthcare — a multi-tenant React 19 platform that unifies therapist, patient, and organization workflows on one product surface.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-5 hover:border-violet-500/30 transition-colors group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                    <s.icon className="w-4 h-4 text-violet-400" />
                  </div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-display">
                    {s.label}
                  </span>
                </div>
                <p className="text-white text-sm font-bold leading-snug">{s.value}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* OVERVIEW */}
        <section className="relative py-20 px-5 md:px-10 max-w-[1100px] mx-auto">
          <SectionHeader
            num="01"
            kicker="Overview"
            title={<>A platform that unifies <span className="text-gradient">three user worlds.</span></>}
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-5 text-gray-300 text-lg leading-relaxed"
          >
            <p>
              PsychUp is a production-grade mental health and psychology platform built from the ground up to digitize how therapists, patients, and organizations deliver and consume psychological care.
            </p>
            <p>
              The platform unifies three distinct user worlds into a single cohesive product: a <strong className="text-white">Therapist workspace</strong> for managing patients, sessions, test assignments, and clinical reports; a <strong className="text-white">Patient portal</strong> for booking sessions, taking standardized assessments, and accessing results; and an <strong className="text-white">Organization dashboard</strong> for bulk-managing employees, mass-assigning psychometric tests, and reviewing aggregate wellness reports.
            </p>
            <p>
              Designed and engineered end-to-end without external Figma references — every screen, interaction pattern, design token, animation system, and architectural decision was self-authored. The result is an enterprise-ready healthcare product with dynamic PDF report generation, role-based dashboards, payment flows, real-time polling, and a fully tokenized design system supporting light/dark themes across 100+ screens.
            </p>
          </motion.div>
        </section>

        {/* PROBLEM */}
        <section className="relative py-20 px-5 md:px-10 max-w-[1100px] mx-auto">
          <SectionHeader
            num="02"
            kicker="The problem"
            title={<>Mental health practice runs on <span className="text-gradient">paper and PDFs.</span></>}
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-300 text-lg leading-relaxed"
          >
            Mental health practice in most clinics is still run on paper assessments, scattered spreadsheets, and PDFs sent over email. Therapists lose time on administrative work, patients have no continuous view of their progress, and organizations running employee wellness programs have no way to assign tests at scale or read aggregate insights. PsychUp was conceived as a single platform that solves all three sides of this workflow.
          </motion.p>
        </section>

        {/* MY ROLE */}
        <section className="relative py-20 px-5 md:px-10 max-w-[1100px] mx-auto">
          <SectionHeader
            num="03"
            kicker="My role"
            title={<>Started with a blank <span className="text-gradient">vite create.</span></>}
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-300 text-lg leading-relaxed"
          >
            I owned the entire frontend — from product framing and information architecture to component design, animation language, data layer, and the report rendering pipeline. There were no Figma files, no design system handed down, and no prior frontend codebase. I started with a blank <code className="bg-white/5 border border-white/10 rounded px-2 py-0.5 text-[14px] font-mono text-violet-300">vite create</code> and made every UX, visual, and architectural decision the product runs on today.
          </motion.p>
        </section>

        {/* ARCHITECTURE */}
        <section className="relative py-20 px-5 md:px-10 max-w-[1200px] mx-auto">
          <SectionHeader
            num="04"
            kicker="Architecture & UX thinking"
            title={<>One foundation, <span className="text-gradient">three product surfaces.</span></>}
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-300 text-lg leading-relaxed mb-10 max-w-3xl"
          >
            The platform is organized around three role-based shells, each with its own navigation, layout, and feature surface, but all built on a shared foundation.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {architecturePillars.map((p, i) => (
              <motion.div
                key={p.head}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 hover:border-violet-500/30 transition-colors"
              >
                <h3 className="text-base font-display font-black text-white mb-2">{p.head}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* DESIGN DECISIONS */}
        <section className="relative py-20 px-5 md:px-10 max-w-[1200px] mx-auto">
          <SectionHeader
            num="05"
            kicker="Product design decisions"
            title={<>Things I&apos;m <span className="text-gradient">proud of.</span></>}
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-300 text-lg leading-relaxed mb-10 max-w-3xl"
          >
            Because I owned UX, I treated PsychUp like a product, not a deliverable.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {designDecisions.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 hover:border-cyan-500/30 transition-colors"
              >
                <h3 className="text-lg font-display font-black text-white mb-2">{d.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{d.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TECHNICAL CHALLENGES */}
        <section className="relative py-20 px-5 md:px-10 max-w-[1200px] mx-auto">
          <SectionHeader
            num="06"
            kicker="Technical challenges I solved"
            title={<>The hard problems, <span className="text-gradient">and how I cracked them.</span></>}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {technicalChallenges.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 hover:border-emerald-500/30 transition-colors"
              >
                <h3 className="text-lg font-display font-black text-white mb-2">{c.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* OUTCOME */}
        <section className="relative py-20 px-5 md:px-10 max-w-[1100px] mx-auto">
          <SectionHeader
            num="07"
            kicker="Outcome"
            title={<>A production application built and maintained <span className="text-gradient">primarily by one engineer.</span></>}
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8"
          >
            <p className="text-gray-200 text-lg leading-relaxed">
              A production application that looks and behaves like a senior-team product, built and maintained primarily by one frontend engineer — covering three role-based experiences, an end-to-end testing/reporting pipeline, and payment infrastructure, all on a single shared design and component foundation.
            </p>
          </motion.div>
        </section>

        {/* TECH STACK */}
        <section className="relative py-20 px-5 md:px-10 max-w-[1200px] mx-auto">
          <SectionHeader
            num="08"
            kicker="The stack"
            title={<>What it&apos;s built <span className="text-gradient">on.</span></>}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(techStack).map(([category, items], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-5"
              >
                <h4 className="text-[10px] font-black text-violet-400 uppercase tracking-widest mb-3 font-display">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/5 border border-white/10 text-gray-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* MOST COMPLEX */}
        <section className="relative py-20 px-5 md:px-10 max-w-[1100px] mx-auto">
          <SectionHeader
            num="09"
            kicker="What was most complex"
            title={<>The six hardest <span className="text-gradient">subsystems.</span></>}
          />
          <ol className="space-y-5">
            {complexParts.map((p, i) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 flex gap-5 items-start"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center font-display font-black text-violet-300 text-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-lg font-display font-black text-white mb-1.5">{p.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{p.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </section>

        {/* ENGINEERING PRACTICES */}
        <section className="relative py-20 px-5 md:px-10 max-w-[1200px] mx-auto">
          <SectionHeader
            num="10"
            kicker="Modern engineering practices"
            title={<>How it was <span className="text-gradient">built well.</span></>}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {engineeringPractices.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-white/3 border border-white/8"
              >
                <div className="shrink-0 w-5 h-5 rounded-md bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-gray-200 text-sm leading-snug">{p}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* OWNERSHIP */}
        <section className="relative py-20 px-5 md:px-10 max-w-[1100px] mx-auto">
          <SectionHeader
            num="11"
            kicker="Leadership & ownership"
            title={<>What it took to <span className="text-gradient">own this.</span></>}
          />
          <ul className="space-y-3">
            {ownershipHighlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 text-gray-200 text-base leading-relaxed"
              >
                <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-violet-400" />
                <span>{h}</span>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="relative py-24 px-5 md:px-10 max-w-[1100px] mx-auto">
          <div className="relative glass rounded-3xl p-10 md:p-16 overflow-hidden">
            <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-violet-600/15 blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />
            <div className="relative text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-display font-black tracking-tight text-white leading-tight"
              >
                Want to dig <span className="text-gradient">deeper?</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-300 text-base md:text-lg mt-5 leading-relaxed max-w-2xl mx-auto"
              >
                Ask my AI copilot anything about PsychUp — architecture trade-offs, what I&apos;d do differently, how I&apos;d scale a specific subsystem, anything.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center items-center gap-3 mt-10"
              >
                <button
                  onClick={askAboutPsychup}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-display font-black transition-all shadow-xl shadow-violet-500/20 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  Ask AI about this project
                </button>
                <Link
                  href="/#experience"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-display font-black transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to portfolio
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-display font-black transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  Get in touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        <footer className="relative w-full border-t border-white/8 py-6 px-5 md:px-10 text-center text-[11px] text-gray-500 font-semibold">
          © 2026 Chandrakant Nagwanshi · Case study · PsychUp ·{" "}
          <Link href="/" className="text-violet-300 hover:text-violet-200 transition-colors inline-flex items-center gap-1">
            chandrakantnagwanshi.dev <ExternalLink className="w-3 h-3" />
          </Link>
        </footer>
      </main>
    </>
  );
}
