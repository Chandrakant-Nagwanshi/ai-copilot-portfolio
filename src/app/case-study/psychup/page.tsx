import type { Metadata } from "next";
import PsychupCaseStudy from "./PsychupCaseStudy";

export const metadata: Metadata = {
  title: "Case study — PsychUp · Chandrakant Nagwanshi",
  description:
    "A deep-dive into PsychUp, a production-grade mental health & psychometric SaaS built end-to-end by Chandrakant Nagwanshi as Lead Frontend Engineer at Lincpay Solutions. React 19 + TanStack Query + Playwright headless PDF pipeline + tokenized design system.",
  openGraph: {
    title: "PsychUp — Case Study",
    description:
      "Three role-based dashboards, a Playwright-driven headless PDF pipeline, a registry-based report system covering 15+ psychometric tests, all built solo on React 19.",
    type: "article",
  },
};

export default function Page() {
  return <PsychupCaseStudy />;
}
