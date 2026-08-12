import type { Lang } from "@/i18n/ui";

/**
 * The parts of the résumé that have no home anywhere else on the site.
 *
 * Roles and education already live in src/data/experience.ts and src/data/site.ts
 * and are read straight from there by /resume — this file only carries what the
 * marketing pages never show: the summary paragraph, the skills matrix, the
 * ATS title line, and the two projects the résumé calls out by name.
 *
 * docs/resume.tex stays the human-facing source of truth (it is gitignored
 * because it carries a phone number). Nothing here may repeat that number: this
 * file is public and feeds the PDF served at /resume.pdf.
 */

export interface ResumeProject {
  name: string;
  /** Locale-agnostic path into the site's own case study, when there is one. */
  href?: string;
  /** Public URL, shown next to the name the way the LaTeX résumé shows it. */
  site: string;
  siteLabel: string;
  period: string;
  role: string;
  highlights: string[];
  stack: string[];
}

export interface ResumeContent {
  summary: string;
  skills: { label: string; items: string[] }[];
  /**
   * Pure ATS keywords. Brazilian enterprise postings advertise this work under
   * several different names and Nick gets interviews under "Systems Analyst &
   * Developer" — the line exists so a keyword filter does not drop him.
   */
  equivalentTitles: string[];
  projects: ResumeProject[];
}

export const resume: Record<Lang, ResumeContent> = {
  en: {
    summary:
      "Full Stack Software Engineer with 3+ years designing and delivering scalable web and mobile applications serving 10,000+ daily active users, data pipelines, and cloud-native systems. Product engineering, modern frontend and backend architecture, data engineering, and infrastructure automation — with a track record of building end-to-end systems.",
    skills: [
      { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "C#", "SQL"] },
      { label: "Frontend", items: ["React", "Next.js", "Angular", "Flutter", "HTML", "CSS"] },
      { label: "Backend", items: ["Node.js", "Express", ".NET"] },
      {
        label: "Databases",
        items: ["PostgreSQL", "MySQL", "DynamoDB", "OracleDB", "BigQuery"],
      },
      {
        label: "Cloud & DevOps",
        items: ["AWS", "GCP", "Docker", "CI/CD", "GitHub Actions"],
      },
      {
        label: "Data engineering",
        items: ["ETL pipelines", "Dataform", "Analytics engineering"],
      },
      { label: "Methodologies", items: ["Agile", "Scrum", "Kanban"] },
    ],
    equivalentTitles: [
      "Full Stack Software Engineer",
      "Software Engineer",
      "Full Stack Developer",
      "Systems Analyst & Developer",
    ],
    projects: [
      {
        name: "Meus Gastos",
        href: "/projects/meus-gastos",
        site: "https://www.meusgastos.dev.br",
        siteLabel: "meusgastos.dev.br",
        period: "2026",
        role: "Solo — product, engineering, operations",
        highlights: [
          "Built and shipped a personal finance tracker as an Android app and a web app sharing a single Supabase backend, with Google OAuth and row-level security isolating each user's data at the database layer.",
          "Designed the expense-entry flow around a five-second interaction, on the premise that an expense log with gaps in it is worse than none.",
          "Implemented spending analytics and per-category limits that surface overspending before the fact rather than after.",
        ],
        stack: ["React Native", "Expo", "TypeScript", "Supabase", "PostgreSQL", "Next.js"],
      },
      {
        name: "FAM Security",
        href: "/projects/fam-security",
        site: "https://www.famsecurity.com.br",
        siteLabel: "famsecurity.com.br",
        period: "2023 — Present",
        role: "Solo",
        highlights: [
          "Designed and built the web presence for a São Paulo security and facilities company, now serving on the client's own domain.",
          "Structured the site around the three lines of business — guarding and escort, security technology (CCTV, monitored alarms, access control), and facilities — with server-side rendering for first-response indexability.",
        ],
        stack: ["Next.js", "React", "Tailwind CSS"],
      },
    ],
  },
  "pt-br": {
    summary:
      "Engenheiro de Software Full Stack com 3+ anos projetando e entregando aplicações web e mobile escaláveis, pipelines de dados e sistemas cloud-native. Engenharia de produto, arquitetura moderna de frontend e backend, engenharia de dados e automação de infraestrutura — com histórico de construir sistemas de ponta a ponta.",
    skills: [
      { label: "Linguagens", items: ["TypeScript", "JavaScript", "Python", "C#", "SQL"] },
      { label: "Frontend", items: ["React", "Next.js", "Angular", "Flutter", "HTML", "CSS"] },
      { label: "Backend", items: ["Node.js", "Express", ".NET"] },
      {
        label: "Bancos de dados",
        items: ["PostgreSQL", "MySQL", "DynamoDB", "OracleDB", "BigQuery"],
      },
      {
        label: "Cloud & DevOps",
        items: ["AWS", "GCP", "Docker", "CI/CD", "GitHub Actions"],
      },
      {
        label: "Engenharia de dados",
        items: ["Pipelines ETL", "Dataform", "Analytics engineering"],
      },
      { label: "Metodologias", items: ["Agile", "Scrum", "Kanban"] },
    ],
    equivalentTitles: [
      "Engenheiro de Software Full Stack",
      "Desenvolvedor Full Stack",
      "Analista de Sistemas",
      "Analista Desenvolvedor",
    ],
    projects: [
      {
        name: "Meus Gastos",
        href: "/projects/meus-gastos",
        site: "https://www.meusgastos.dev.br",
        siteLabel: "meusgastos.dev.br",
        period: "2026",
        role: "Solo — produto, engenharia, operação",
        highlights: [
          "Construí e publiquei um controle de gastos pessoais como app Android e app web sobre um único backend Supabase, com Google OAuth e row-level security isolando os dados de cada usuário na camada de banco.",
          "Desenhei o fluxo de lançamento em torno de uma interação de cinco segundos, partindo da premissa de que um registro de gastos com buracos é pior do que nenhum.",
          "Implementei análise de gastos e limites por categoria que mostram o estouro antes de ele acontecer, não depois.",
        ],
        stack: ["React Native", "Expo", "TypeScript", "Supabase", "PostgreSQL", "Next.js"],
      },
      {
        name: "FAM Security",
        href: "/projects/fam-security",
        site: "https://www.famsecurity.com.br",
        siteLabel: "famsecurity.com.br",
        period: "2023 — Atual",
        role: "Solo",
        highlights: [
          "Projetei e construí a presença web de uma empresa paulistana de segurança e facilities, hoje no domínio próprio do cliente.",
          "Estruturei o site nas três linhas de negócio — vigilância e escolta, tecnologia de segurança (CFTV, alarmes monitorados, controle de acesso) e facilities — com renderização no servidor para indexação já na primeira resposta.",
        ],
        stack: ["Next.js", "React", "Tailwind CSS"],
      },
    ],
  },
};
