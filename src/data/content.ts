/**
 * ============================================================
 * ALL SITE CONTENT LIVES HERE.
 * Edit this one file and the whole site updates.
 * ============================================================
 *
 * Typed so components never drift from copy. No placeholders,
 * no lorem ipsum, no fake stats.
 */

export type AccentSegment = {
  text: string;
  /** Renders in amber when true (key words). */
  accent?: boolean;
};

export type Role = {
  year: string;
  title: string;
  org?: string;
  note?: string;
};

export type Service = {
  title: string;
  description: string;
};

export type LabItem = {
  title: string;
  caption: string;
  href?: string;
  external?: boolean;
  isDevelopment?: boolean;
};

export type Social = {
  email: string;
  whatsapp: string;
  github: string;
  linkedin: string;
};

export type Project = {
  /** Mono index label, e.g. "01". */
  index: string;
  title: string;
  initial: string;
  status: string;
  description: string;
  stack: string;
  year: string;
  /** Hex colour used for the project plate + title tint. */
  color: string;
  /** External link. Omit when the project has no public URL. */
  href?: string;
  /** Label shown when there is no link (disabled). */
  disabledLabel?: string;
  external?: boolean;
};

export type Content = {
  person: {
    name: string;
    firstName: string;
    role: string;
    location: string;
    headline: { name: string; tagline: AccentSegment[]; location: string };
    /**
     * SWAP POINT — real portrait drop-in.
     * Drop a portrait at the project root (e.g. /public/portrait.jpg) and set
     * this to "/portrait.jpg". Until then the plate is built in code.
     */
    heroImage: string | null;
  };
  specSheet: { label: string; value: string; accent?: boolean }[];
  availability: { label: string; dot: string };
  statement: AccentSegment[];
  projects: Project[];
  services: Service[];
  lab: LabItem[];
  recordLog: Role[];
  education: Role[];
  odometer: { label: string; value: string }[];
  about: string;
  aboutLocation: string;
  contactSheet: { frame: string; code: string; title: string; note: string }[];
  socials: Social;
  metadata: {
    title: string;
    description: string;
  };
};

export const content: Content = {
  person: {
    name: "Muhammad Hashir",
    firstName: "Hashir",
    role: "Full-Stack Developer",
    location: "Muscat, Oman",
    headline: {
      name: "Muhammad Hashir",
      tagline: [
        { text: "Full-Stack Developer — I build and ship products " },
        { text: "solo", accent: true },
        { text: "." },
      ],
      location: "Muscat, Oman",
    },
    heroImage: null,
  },

  specSheet: [
    { label: "NAME", value: "Muhammad Hashir" },
    { label: "DISCIPLINE", value: "Full-Stack Development + Design" },
    { label: "BASE", value: "Muscat, Oman" },
    { label: "STACK", value: "Next.js · TypeScript · Supabase" },
    { label: "STATUS", value: "Available — client builds + remote roles" },
    { label: "RESPONSE", value: "WhatsApp + email, same day" },
  ],

  availability: { label: "Open for client builds + remote roles", dot: "Live" },

  statement: [
    { text: "I don't hand off and hope. If it's live on the internet — the " },
    { text: "brand", accent: true },
    { text: ", the " },
    { text: "design", accent: true },
    { text: ", the " },
    { text: "code", accent: true },
    { text: ", the " },
    { text: "deployment", accent: true },
    { text: " — I made it. " },
    { text: "One person", accent: true },
    { text: ", end to end, products shipped and running." },
  ],

  projects: [
    {
      index: "01",
      title: "GrantQuest",
      initial: "GQ",
      status: "LIVE",
      description:
        "Scholarship hunting, turned into an RPG quest board. 73 verified scholarships with eligibility gates, document checklists and live deadline chronometers.",
      stack: "Next.js · Supabase · Sanity",
      year: "2026",
      color: "#B45309",
      href: "https://grantquest.tech",
      external: true,
    },
    {
      index: "02",
      title: "Unified Business Platform",
      initial: "UP",
      status: "BUILDING · 90% DONE",
      description:
        "CMS, CRM, project management and ERP in one platform. Bilingual English/Arabic, RTL-ready, multi-workspace.",
      stack: "Next.js · TypeScript · Supabase",
      year: "2026",
      color: "#0F766E",
      disabledLabel: "Private build",
    },
    {
      index: "03",
      title: "Leadforge",
      initial: "LF",
      status: "LIVE",
      description:
        "Outreach pipeline for small businesses in Oman: lead generation, personalised demo sites, scheduling and a REST API with key auth. Fully bilingual EN/AR.",
      stack: "Next.js 15 · Supabase · Python",
      year: "2026",
      color: "#15803D",
      href: "https://leadforge-app.duckdns.org",
      external: true,
    },
    {
      index: "04",
      title: "Knell",
      initial: "KN",
      status: "LIVE",
      description:
        "Idea validation, live: Knell checks whether your idea already exists, kills the ones already built, and ranks the survivors.",
      stack: "Next.js · Tailwind",
      year: "2026",
      color: "#6D28D9",
      href: "https://knellai.tech",
      external: true,
    },
    {
      index: "05",
      title: "SHOW ONCE",
      initial: "SO",
      status: "IN DEVELOPMENT",
      description:
        "Show it once, check it forever: learn a physical skill from one demonstration, checked from photos of the finished result.",
      stack: "Next.js · Meta AI models",
      year: "2026",
      color: "#E5484D",
      disabledLabel: "In development",
    },
  ],

  services: [
    {
      title: "Websites & web apps",
      description:
        "Business sites, booking systems, full platforms. Built, designed and deployed end to end.",
    },
    {
      title: "Bilingual EN/AR builds",
      description: "RTL done properly, not bolted on.",
    },
    {
      title: "Brand + site together",
      description:
        "Identity and website from one person, so they actually match.",
    },
  ],

  lab: [
    {
      title: "NEVERTWICE",
      caption: "Mistake-graph exam prep engine — GitHub",
      href: "https://github.com/mateir0/nevertwice",
      external: true,
    },
    {
      title: "Remontada",
      caption: "Letterboxd for football — in development",
      isDevelopment: true,
    },
    {
      title: "Doomsday Fund",
      caption: "Android savings app",
    },
    {
      title: "Hadir FC",
      caption: "Football stats tracker for a young player",
    },
  ],

  recordLog: [
    {
      year: "2026",
      title: "Full-Stack Developer",
      org: "Freelance & contract builds",
    },
    {
      year: "2026",
      title: "Chief Growth Officer",
      org: "Triofy Agency",
    },
    {
      year: "—",
      title: "Graphics Director",
      org: "Pakistan Youth Foundation",
    },
  ],

  education: [
    { year: "ICS", title: "Forman Christian College", org: "Lahore" },
    {
      year: "Matric",
      title: "Computer Science",
      org: "Ratwal Cadet College",
    },
  ],

  odometer: [
    { label: "Products live", value: "3" },
    { label: "Quests published", value: "73" },
    { label: "Platforms built end-to-end", value: "5+" },
  ],

  about:
    "Full-stack developer based in Muscat, Oman, previously Lahore. I ship full products solo — design, code, deployment, and the growth to get people to them. Open to remote full-stack roles (freelance, contract or full-time) and to client builds worldwide.",

  aboutLocation: "Muscat, Oman — previously Lahore",

  contactSheet: [
    { frame: "06A", code: "MH 400 VOID 26", title: "GrantQuest", note: "Live" },
    { frame: "07A", code: "MH 400 VOID 26", title: "Leadforge", note: "Live" },
    { frame: "08A", code: "MH 400 VOID 26", title: "Knell", note: "Live" },
    { frame: "09A", code: "MH 400 VOID 26", title: "UBP", note: "Private" },
    { frame: "10A", code: "MH 400 VOID 26", title: "SHOW ONCE", note: "Dev" },
  ],

  socials: {
    email: "offxhashir@gmail.com",
    whatsapp: "https://wa.me/96877361999",
    github: "https://github.com/mateir0",
    linkedin: "https://www.linkedin.com/in/muhammad-hashir-b1b07a3b4/",
  },

  metadata: {
    title: "Muhammad Hashir — Full-Stack Developer",
    description:
      "Full-stack developer in Muscat, Oman. I build and ship products solo — design, code, deployment. Open to remote full-stack roles and client builds worldwide.",
  },
};