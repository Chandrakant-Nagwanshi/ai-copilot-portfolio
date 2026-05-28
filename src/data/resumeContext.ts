export interface Project {
  name: string;
  role: string;
  description: string;
  details: string[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  duration: string;
  projects?: Project[];
  highlights?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  skills: {
    languagesAndFrontend: string[];
    stateManagement: string[];
    stylingAndComponents: string[];
    realTimeAndApis: string[];
    formsAndValidation: string[];
    performanceOptimization: string[];
    backendAndTools: string[];
  };
  experience: Experience[];
  education: Education[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const resumeData: ResumeData = {
  personalInfo: {
    name: "Chandrakant Nagwanshi",
    location: "Bhopal, Madhya Pradesh, India",
    email: "chandrakantnagwanshi97@gmail.com",
    phone: "+91 8839862902",
    linkedin: "linkedin.com/in/chandrakant-nagwanshi",
    github: "github.com/Chandrakant-Nagwanshi",
  },
  summary: `Results-oriented Frontend React Developer with 2+ years of experience building secure, high-performance fintech, e-procurement, and healthcare web applications. Strong expertise in building modular, reusable UI components using React, TypeScript, and Tailwind CSS. Proven track record of designing scalable state management using Redux Toolkit and React Query, optimizing application loading speeds, and implementing real-time WebSockets. Expert in Git collaboration, browser debugging, and leading small feature teams to deliver clean, production-ready code.`,
  skills: {
    languagesAndFrontend: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3"],
    stateManagement: ["Redux Toolkit", "React Query (TanStack Query)", "Context API", "Axios"],
    stylingAndComponents: ["Tailwind CSS", "Material UI (MUI)", "shadcn/ui", "Bootstrap"],
    realTimeAndApis: ["WebSockets", "Stomp.js", "REST APIs integration", "JSON Schema validation"],
    formsAndValidation: ["React Hook Form", "Zod schema validation"],
    performanceOptimization: ["Code Splitting", "Lazy Loading", "React.memo", "virtualization", "rendering cycle management"],
    backendAndTools: ["Node.js", "Express.js", "MongoDB", "Postman", "Git", "GitHub"],
  },
  experience: [
    {
      role: "React JS Developer",
      company: "Lincpay Solutions Pvt. Ltd",
      location: "Bhopal, India",
      duration: "Oct 2024 -- Present",
      projects: [
        {
          name: "PsychUp – Mental Health Assessment Platform",
          role: "Lead Frontend Engineer",
          description: "A production-grade healthcare SaaS built from a blank repo — three role-based dashboards (therapist, patient, organization) with online psychometric testing, dynamic PDF reporting, and integrated payments.",
          details: [
            "Architected a multi-tenant React 19 + TypeScript platform from scratch as the sole frontend owner — three role-based shells (Therapist, Patient, Organization) sharing one design system across 100+ screens and 200+ components.",
            "Owned UI/UX end-to-end with no external design references — authored every screen, interaction pattern, design token, motion system, and component API, treating design as engineering.",
            "Engineered a Playwright-driven headless-browser PDF pipeline producing print-quality clinical reports — the same React component renders across in-app preview, public share page, and PDF print via one shared CSS contract.",
            "Built a registry-based report system covering 15+ standardized psychometric assessments (BDI, Big Five, and more) — adding a new test is a single folder drop, no cross-cutting changes.",
            "Designed client-server state architecture combining TanStack Query (server cache) and Redux Toolkit + redux-persist (auth/UI), with Axios interceptors for token refresh, error normalization, and request deduplication — cut redundant API calls by ~40%.",
            "Cut initial page load by 30% via route-level code splitting, list virtualization for 1000+ row tables, memoized chart subtrees, and skeleton-driven loading on every async surface.",
            "Built a fully tokenized design system on Radix UI + Tailwind 4 with theme-aware Recharts/Nivo palettes — consistent typography, motion, and spacing across the entire platform with light/dark mode support."
          ]
        },
        {
          name: "E-Procurement & Live Auction Engine",
          role: "Frontend Developer",
          description: "A secure e-procurement suite facilitating tender lifecycles, bidding mechanisms, and high-concurrency real-time auctions.",
          details: [
            "Developed scalable modules for bidding lifecycles, including multi-step vendor registration, live bid displays, and tender document upload workflows.",
            "Architected a real-time live bidding dashboard using WebSockets (Stomp.js) combined with optimized custom React hooks, reducing rendering delays and ensuring sync under high-concurrency peak traffic."
          ]
        },
        {
          name: "Merchant Payment Panel",
          role: "Frontend Developer",
          description: "An analytics-driven merchant panel for transactional management, pay-in/payout tracking, and onboarding.",
          details: [
            "Built an interactive merchant panel for Pay-in/Payout tracking, featuring live financial analytics, transaction status tables, and dynamic CSV/PDF reconciliation reports.",
            "Implemented a secure, responsive merchant KYC onboarding flow utilizing React Hook Form and Zod validation, boosting successfully completed onboarding registrations by 25%."
          ]
        }
      ]
    },
    {
      role: "Freelance Web Developer",
      company: "Remote",
      location: "Bhopal, India (Remote)",
      duration: "Oct 2023 -- July 2024",
      highlights: [
        "Developed responsive, SEO-optimized landing pages and customized React.js web applications for local and small businesses.",
        "Created high-quality, reusable component libraries tailored for mobile-first layouts, improving site loading speed and layout responsiveness across devices."
      ]
    }
  ],
  education: [
    {
      degree: "MCA (Master of Computer Applications)",
      institution: "SGSITS, Indore",
      duration: "2021 -- 2023"
    },
    {
      degree: "BCA (Bachelor of Computer Applications)",
      institution: "NRI Institute of Technology, Bhopal",
      duration: "2016 -- 2019"
    }
  ],
  faqs: [
    {
      question: "Are you open to relocation?",
      answer: "Yes, I am open to relocating to major tech hubs in India (such as Bangalore, Pune, Noida, Gurgaon, Mumbai, or Hyderabad) for exciting product development opportunities."
    },
    {
      question: "What is your notice period?",
      answer: "My notice period is negotiable. I am currently working at Lincpay Solutions, but depending on the opportunity, I can align with a 30 to 45 days timeline or request an early buyout."
    },
    {
      question: "Why should we hire you over other 2 YOE developers?",
      answer: "I bring production-tested experience in two extremely complex domains: Fintech (payment panels, KYC, transactions) and Real-Time systems (WebSocket-driven auction engines). I don't just write basic React components; I understand state synchronization, caching layers, and how to optimize bundle sizes to make apps faster."
    },
    {
      question: "What are your preferred communication methods?",
      answer: "You can reach me directly via email at chandrakantnagwanshi97@gmail.com, call me at +91 8839862902, or connect with me on LinkedIn at linkedin.com/in/chandrakant-nagwanshi."
    }
  ]
};
