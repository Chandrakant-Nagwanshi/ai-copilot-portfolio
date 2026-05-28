"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
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

const ToCSections = [
  { id: "overview", label: "01 · Overview" },
  { id: "problem", label: "02 · The Problem" },
  { id: "role", label: "03 · Lead Role" },
  { id: "architecture", label: "04 · Architecture" },
  { id: "design", label: "05 · Proud UX" },
  { id: "challenges", label: "06 · Challenges" },
  { id: "outcome", label: "07 · Business Impact" },
  { id: "stack", label: "08 · Interactive Stack" },
  { id: "complex", label: "09 · Subsystems" },
  { id: "practices", label: "10 · Standards" },
  { id: "ownership", label: "11 · Hard Ownership" },
];

const groupedTechStack = {
  core: {
    label: "Core Web App",
    categories: ["Frontend core", "Routing", "Styling & UI", "Theming"],
  },
  state: {
    label: "State & Data Flow",
    categories: ["State management", "API & data", "Forms & inputs"],
  },
  pipeline: {
    label: "Pipelines & Viz",
    categories: ["PDF pipeline", "Charts & viz", "Drag & drop", "Motion"],
  },
  tooling: {
    label: "Dev & Performance",
    categories: ["Tooling", "Performance"],
  },
};

interface PlaywrightPDFSimulatorProps {
  view: "app" | "public" | "print";
  setView: React.Dispatch<React.SetStateAction<"app" | "public" | "print">>;
}

function PlaywrightPDFSimulator({ view, setView }: PlaywrightPDFSimulatorProps) {
  return (
    <div className="panel rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden mt-8 shadow-2xl">
      {/* Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/5 pb-4 mb-6 gap-4">
        <div>
          <h4 className="text-sm font-display font-black text-white">Interactive Render Pipeline Simulator</h4>
          <p className="text-[11px] text-gray-400 mt-0.5">Click views to see how the same React component adapts seamlessly</p>
        </div>
        <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl">
          {(["app", "public", "print"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-display font-bold transition-all relative cursor-pointer capitalize ${
                view === v ? "bg-violet-600 text-white shadow-md shadow-violet-500/20" : "text-gray-400 hover:text-white"
              }`}
            >
              {v === "app" ? "App Workspace" : v === "public" ? "Public Share" : "Playwright PDF"}
            </button>
          ))}
        </div>
      </div>

      {/* Frame Container */}
      <div className="bg-[#0c0c0e] rounded-2xl border border-white/5 p-4 md:p-6 transition-all duration-500 relative min-h-[300px] flex flex-col justify-between">
        {/* Render Viewport */}
        <div>
          {/* App Shell Chrome (If App View) */}
          {view === "app" && (
            <div className="border-b border-white/5 pb-3 mb-4 flex items-center justify-between text-xs text-gray-500 font-display">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                <span className="text-[10px] ml-2 text-gray-600">psychup.com/workspace/therapist/patients/p-928/report</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-black uppercase tracking-wider">
                Therapist View
              </span>
            </div>
          )}

          {/* Public Share Chrome (If Public View) */}
          {view === "public" && (
            <div className="border-b border-white/5 pb-3 mb-4 flex items-center justify-between text-xs text-gray-500 font-display">
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-gray-600">psychup.com/share/r-87df92a</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[9px] font-black uppercase tracking-wider">
                  Public Link · Read Only
                </span>
              </div>
            </div>
          )}

          {/* PDF Page Border Outline (If Print View) */}
          {view === "print" && (
            <div className="border-b border-dashed border-white/10 pb-3 mb-4 flex items-center justify-between text-xs text-gray-500 font-display">
              <span className="text-[9px] font-mono text-gray-600">PLAYWRIGHT HEADLESS PDF PIPELINE (LETTER-SIZE PARITY)</span>
              <span className="px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20 text-[9px] font-black uppercase tracking-wider font-mono">
                8.5&quot; x 11&quot; PRINT BOUNDS
              </span>
            </div>
          )}

          {/* Content Document */}
          <div
            className={`transition-all duration-500 ${
              view === "print" ? "bg-white text-gray-900 p-6 md:p-8 rounded-xl shadow-inner max-w-2xl mx-auto" : "text-gray-300"
            }`}
          >
            {/* Clinical Report Header */}
            <div className={`flex justify-between items-start border-b ${view === "print" ? "border-gray-200 pb-4 mb-4" : "border-white/5 pb-4 mb-4"}`}>
              <div>
                <h5 className={`font-display font-black text-sm ${view === "print" ? "text-gray-900" : "text-white"}`}>
                  Beck Depression Inventory (BDI-II)
                </h5>
                <p className={`text-[10px] mt-0.5 ${view === "print" ? "text-gray-500" : "text-gray-400"}`}>
                  Patient: John Doe · ID: #879201 · Date: 2026-05-28
                </p>
              </div>
              <div className="text-right">
                <span className={`text-xl font-display font-black ${view === "print" ? "text-gray-900" : "text-white"}`}>29</span>
                <span className={`text-[10px] block font-bold uppercase tracking-wider ${view === "print" ? "text-red-600" : "text-red-400"}`}>
                  Severe
                </span>
              </div>
            </div>

            {/* Test Results Charts / Visualization Mock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div className={`p-4 rounded-xl border ${view === "print" ? "bg-gray-50 border-gray-200" : "bg-white/3 border-white/5"}`}>
                <span className={`text-[9px] font-black uppercase tracking-wider ${view === "print" ? "text-gray-500" : "text-gray-400"}`}>
                  Cognitive-Affective Subscale
                </span>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[70%]" />
                  </div>
                  <span className={`text-xs font-bold ${view === "print" ? "text-gray-900" : "text-white"}`}>70%</span>
                </div>
              </div>
              <div className={`p-4 rounded-xl border ${view === "print" ? "bg-gray-50 border-gray-200" : "bg-white/3 border-white/5"}`}>
                <span className={`text-[9px] font-black uppercase tracking-wider ${view === "print" ? "text-gray-500" : "text-gray-400"}`}>
                  Somatic-Performance Subscale
                </span>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full w-[85%]" />
                  </div>
                  <span className={`text-xs font-bold ${view === "print" ? "text-gray-900" : "text-white"}`}>85%</span>
                </div>
              </div>
            </div>

            {/* Clinical Interpretation Notes */}
            <div className="mt-4">
              <h6 className={`text-[10px] font-black uppercase tracking-wider mb-1 ${view === "print" ? "text-gray-500" : "text-gray-400"}`}>
                Clinical Interpretation
              </h6>
              <p className={`text-xs leading-relaxed ${view === "print" ? "text-gray-700" : "text-gray-300"}`}>
                Patient scores indicate a severe depressive episode. Somatic symptoms (sleep loss, fatigue) dominate the profile, supported by cognitive indicators of pessimism and self-criticism. Immediate clinical follow-up is highly advised.
              </p>
            </div>

            {/* Print Parity Footer Indicator */}
            {view === "print" && (
              <div className="border-t border-gray-200 mt-6 pt-3 flex justify-between items-center text-[8px] text-gray-400 font-mono">
                <span>PSYCHUP MEDICAL REPORT SYSTEM v2.1</span>
                <span>PAGE 1 OF 2</span>
              </div>
            )}
          </div>
        </div>

        {/* Status / Log overlays showing what Chandrakant solved */}
        <div className="mt-6 border-t border-white/5 pt-4 text-[10px] font-mono text-gray-500 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {view === "app" && <span>Rendering inside full authenticated React state machine</span>}
            {view === "public" && <span>Rendering in read-only public share view (token verified)</span>}
            {view === "print" && <span>Playwright loaded headless chrome: printed margins, 0px border accuracy</span>}
          </div>
          <span className="text-gray-600 uppercase tracking-widest text-[8px] font-black font-display">
            Shared React Component Contract
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PsychupCaseStudy() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.4 });
  const { openPanel, sendMessage } = useChat();

  const [activeSection, setActiveSection] = React.useState("overview");
  const [activeTab, setActiveTab] = React.useState<"core" | "state" | "pipeline" | "tooling">("core");
  const [openChallenge, setOpenChallenge] = React.useState<number | null>(0);
  const [simulatorView, setSimulatorView] = React.useState<"app" | "public" | "print">("app");

  const askAboutPsychup = () => {
    openPanel();
    sendMessage("Tell me more about the PsychUp project — what was the hardest engineering decision, and what would you do differently next time?");
  };

  // Scroll spy effect
  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Trigger when section occupies the upper-middle region
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    ToCSections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => {
      ToCSections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 via-emerald-500 to-cyan-500 z-50 origin-left"
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
        {/* Static gradient background */}
        <div className="absolute inset-x-0 top-0 h-[80vh] pointer-events-none bg-[radial-gradient(at_20%_15%,rgba(16,185,129,0.14)_0px,transparent_50%),radial-gradient(at_80%_5%,rgba(100,116,139,0.08)_0px,transparent_50%)]" />

        {/* HERO SECTION */}
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
              <div key={s.label} className="panel rounded-2xl p-5 hover:border-violet-500/30 transition-colors group">
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

        {/* 2-COLUMN SPLIT SECTION */}
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-16 grid grid-cols-1 lg:grid-cols-4 gap-12 relative">
          
          {/* Left Column: Sticky ToC Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 pl-4 border-l border-white/5 space-y-2 relative">
              {ToCSections.map((s) => {
                const isActive = activeSection === s.id;
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`block text-[11px] font-black uppercase tracking-wider py-1.5 transition-all relative ${
                      isActive ? "text-violet-400 pl-2 font-display font-black" : "text-gray-500 hover:text-gray-300 font-semibold"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="toc-marker"
                        className="absolute left-[-21px] top-[11.5px] w-2 h-2 rounded-full bg-violet-400 shadow-md shadow-violet-500/50"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {s.label}
                  </a>
                );
              })}
            </div>
          </aside>

          {/* Right Column: Case Study Sections */}
          <div className="lg:col-span-3 space-y-28">

            {/* 01 · OVERVIEW */}
            <section id="overview" className="scroll-mt-24">
              <SectionHeader
                num="01"
                kicker="Overview"
                title={<>A platform that unifies <span className="text-gradient">three user worlds.</span></>}
              />
              <div className="space-y-5 text-gray-300 text-base md:text-lg leading-relaxed">
                <p>
                  PsychUp is a production-grade mental health and psychology platform built from the ground up to digitize how therapists, patients, and organizations deliver and consume psychological care.
                </p>
                <p>
                  The platform unifies three distinct user worlds into a single cohesive product: a <strong className="text-white font-bold">Therapist workspace</strong> for managing patients, sessions, test assignments, and clinical reports; a <strong className="text-white font-bold">Patient portal</strong> for booking sessions, taking standardized assessments, and accessing results; and an <strong className="text-white font-bold">Organization dashboard</strong> for bulk-managing employees, mass-assigning psychometric tests, and reviewing aggregate wellness reports.
                </p>
                <p>
                  Designed and engineered end-to-end without external Figma references — every screen, interaction pattern, design token, animation system, and architectural decision was self-authored. The result is an enterprise-ready healthcare product with dynamic PDF report generation, role-based dashboards, payment flows, real-time polling, and a fully tokenized design system supporting light/dark themes across 100+ screens.
                </p>
              </div>
            </section>

            {/* 02 · THE PROBLEM */}
            <section id="problem" className="scroll-mt-24">
              <SectionHeader
                num="02"
                kicker="The problem"
                title={<>Mental health practice runs on <span className="text-gradient">paper and PDFs.</span></>}
              />
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                Mental health practice in most clinics is still run on paper assessments, scattered spreadsheets, and PDFs sent over email. Therapists lose time on administrative work, patients have no continuous view of their progress, and organizations running employee wellness programs have no way to assign tests at scale or read aggregate insights. PsychUp was conceived as a single platform that solves all three sides of this workflow.
              </p>
            </section>

            {/* 03 · MY ROLE */}
            <section id="role" className="scroll-mt-24">
              <SectionHeader
                num="03"
                kicker="My role"
                title={<>Started with a blank <span className="text-gradient">vite create.</span></>}
              />
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                I owned the entire frontend — from product framing and information architecture to component design, animation language, data layer, and the report rendering pipeline. There were no Figma files, no design system handed down, and no prior frontend codebase. I started with a blank <code className="bg-white/5 border border-white/10 rounded px-2 py-0.5 text-[14px] font-mono text-violet-300">vite create</code> and made every UX, visual, and architectural decision the product runs on today.
              </p>
            </section>

            {/* 04 · ARCHITECTURE */}
            <section id="architecture" className="scroll-mt-24">
              <SectionHeader
                num="04"
                kicker="Architecture & UX thinking"
                title={<>One foundation, <span className="text-gradient">three product surfaces.</span></>}
              />
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
                The platform is organized around three role-based shells, each with its own navigation, layout, and feature surface, but all built on a shared foundation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {architecturePillars.map((p) => (
                  <div
                    key={p.head}
                    className="panel rounded-2xl p-6 hover:border-violet-500/30 transition-colors"
                  >
                    <h3 className="text-base font-display font-black text-white mb-2">{p.head}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{p.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 05 · DESIGN DECISIONS */}
            <section id="design" className="scroll-mt-24">
              <SectionHeader
                num="05"
                kicker="Product design decisions"
                title={<>Things I&apos;m <span className="text-gradient">proud of.</span></>}
              />
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
                Because I owned UX, I treated PsychUp like a product, not a deliverable.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {designDecisions.map((d) => (
                  <div
                    key={d.title}
                    className="panel rounded-2xl p-6 hover:border-cyan-500/30 transition-colors"
                  >
                    <h3 className="text-lg font-display font-black text-white mb-2">{d.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{d.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 06 · TECHNICAL CHALLENGES */}
            <section id="challenges" className="scroll-mt-24">
              <SectionHeader
                num="06"
                kicker="Technical challenges I solved"
                title={<>The hard problems, <span className="text-gradient">and how I cracked them.</span></>}
              />
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
                Click a technical challenge to expand and view how I engineered solutions for the clinical requirements:
              </p>

              {/* Accordion view */}
              <div className="space-y-4">
                {technicalChallenges.map((c, i) => {
                  const isOpen = openChallenge === i;
                  return (
                    <div
                      key={c.title}
                      className={`panel rounded-2xl border transition-all duration-300 ${
                        isOpen ? "border-emerald-500/40 bg-emerald-500/3" : "border-white/5 hover:border-white/10"
                      }`}
                    >
                      <button
                        onClick={() => setOpenChallenge(isOpen ? null : i)}
                        className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer"
                      >
                        <h3 className="text-base md:text-lg font-display font-black text-white pr-4">{c.title}</h3>
                        <span className="shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400 hover:text-white transition-colors">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      <motion.div
                        initial={false}
                        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-6 border-t border-white/5 pt-4 text-gray-300 text-sm leading-relaxed">
                          {c.body}
                          
                          {/* Inject visual preview context depending on index */}
                          {i === 0 && (
                            <div className="mt-4 p-4 bg-[#0a0a0c] border border-white/5 rounded-xl text-xs font-mono text-gray-400">
                              <span className="text-violet-400">Registry Pattern Contract:</span>
                              <pre className="mt-2 overflow-x-auto text-[10px]">
                                {`export const ReportRegistry = {\n  'bdi-ii': {\n    component: BDIReportComponent,\n    calculator: calculateBDIScores,\n    meta: { name: 'Beck Depression Inventory', type: 'clinical' }\n  }\n};`}
                              </pre>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 07 · OUTCOME */}
            <section id="outcome" className="scroll-mt-24">
              <SectionHeader
                num="07"
                kicker="Outcome"
                title={<>A production application built and maintained <span className="text-gradient">primarily by one engineer.</span></>}
              />
              <div className="panel rounded-3xl p-6 md:p-8">
                <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                  A production application that looks and behaves like a senior-team product, built and maintained primarily by one frontend engineer — covering three role-based experiences, an end-to-end testing/reporting pipeline, and payment infrastructure, all on a single shared design and component foundation.
                </p>

                {/* Render the immersive Playwright PDF Render Pipeline Simulator here */}
                <div className="mt-8">
                  <PlaywrightPDFSimulator view={simulatorView} setView={setSimulatorView} />
                </div>
              </div>
            </section>

            {/* 08 · TECH STACK */}
            <section id="stack" className="scroll-mt-24">
              <SectionHeader
                num="08"
                kicker="The stack"
                title={<>What it&apos;s built <span className="text-gradient">on.</span></>}
              />
              
              {/* Interactive Tabs for Technology Categories */}
              <div className="flex bg-white/3 border border-white/8 p-1.5 rounded-xl max-w-lg mb-8">
                {(Object.keys(groupedTechStack) as Array<keyof typeof groupedTechStack>).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs md:text-sm font-display font-black transition-all relative cursor-pointer ${
                      activeTab === key ? "bg-violet-600 text-white shadow-md shadow-violet-500/20" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {groupedTechStack[key].label}
                  </button>
                ))}
              </div>

              {/* Display Active Stack Categories */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {groupedTechStack[activeTab].categories.map((category) => {
                    const items = techStack[category];
                    if (!items) return null;
                    return (
                      <div key={category} className="panel rounded-2xl p-5 hover:border-violet-500/20 transition-colors">
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
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </section>

            {/* 09 · MOST COMPLEX */}
            <section id="complex" className="scroll-mt-24">
              <SectionHeader
                num="09"
                kicker="What was most complex"
                title={<>The six hardest <span className="text-gradient">subsystems.</span></>}
              />
              <ol className="space-y-5">
                {complexParts.map((p, i) => (
                  <li
                    key={p.title}
                    className="panel rounded-2xl p-6 flex gap-5 items-start hover:border-violet-500/20 transition-colors"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center font-display font-black text-violet-300 text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-black text-white mb-1.5">{p.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* 10 · ENGINEERING PRACTICES */}
            <section id="practices" className="scroll-mt-24">
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
                    transition={{ delay: i * 0.02 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white/3 border border-white/8 hover:border-emerald-500/20 transition-colors"
                  >
                    <div className="shrink-0 w-5 h-5 rounded-md bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-gray-200 text-sm leading-snug">{p}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 11 · OWNERSHIP */}
            <section id="ownership" className="scroll-mt-24">
              <SectionHeader
                num="11"
                kicker="Leadership & ownership"
                title={<>What it took to <span className="text-gradient">own this.</span></>}
              />
              <ul className="space-y-4">
                {ownershipHighlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-gray-200 text-base leading-relaxed hover:text-white transition-colors"
                  >
                    <span className="shrink-0 mt-2.5 w-1.5 h-1.5 rounded-full bg-violet-400" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>

          </div>
        </div>

        {/* CTA */}
        <section className="relative py-24 px-5 md:px-10 max-w-[1100px] mx-auto">
          <div className="relative panel rounded-3xl p-10 md:p-16 overflow-hidden">
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
