import type { Lang } from "@/i18n/ui";

export const site = {
  name: "Nick Miyasato",
  legalName: "Nicholas Miyasato",
  url: "https://nickmiyasato.dev",
  // Same Umbler inbox either way — contato@ is an alias of hey@, shown on the
  // Portuguese pages because the English address reads as a typo in PT-BR.
  email: { en: "hey@nickmiyasato.dev", "pt-br": "contato@nickmiyasato.dev" },
  github: "https://github.com/nixoletas",
  linkedin: "https://linkedin.com/in/nixoletas",
  repo: "https://github.com/nixoletas/nickmiyasato",
  location: { en: "São Paulo, Brazil", "pt-br": "São Paulo, Brasil" },
} as const;

/** Headline + bio shown in the hero, per locale. */
export const intro: Record<
  Lang,
  { headline: string; tagline: string; bio: string[]; focus: string[] }
> = {
  en: {
    headline: "Hi, I'm Nick.",
    /** One line under the headline. The full bio belongs to the About section. */
    tagline:
      "3+ years designing data-driven applications that serve 10,000+ daily active users, managing infrastructure and maintaining reliable software across many different tech stacks.",
    bio: [
      "Software engineer with 3+ years across the full stack, now mostly on the data side: healthcare analytics pipelines on BigQuery, Dataform and Python, and the dashboards clinical and business teams actually decide on. Product work continues on contract — Next.js on the web, Flutter on mobile.",
      "Before that I spent two years leading the IT section of a Brazilian Army battalion, responsible for every system the unit ran on. Building and operating the same systems changed how I build them: hardened Linux hosts and Docker services, backups and monitoring that get checked, and documentation good enough that the next person doesn't need me.",
    ],
    focus: ["TypeScript", "Node.js", "Python", "GCP", "AWS", "Docker", "SQL", "NoSQL", "BigQuery"],
  },
  "pt-br": {
    headline: "Prazer, Nicholas.",
    tagline:
      "3+ anos projetando aplicações orientadas a dados que atendem mais de 10.000 usuários ativos por dia, cuidando de infraestrutura e mantendo software confiável em stacks bem diferentes entre si.",
    bio: [
      "Engenheiro de software com 3+ anos de full-stack, hoje mais voltado a dados: pipelines de analytics em saúde com BigQuery, Dataform e Python, e os dashboards em que times clínicos e de negócio de fato se apoiam para decidir. O trabalho de produto segue por contrato — Next.js na web, Flutter no mobile.",
      "Antes disso, passei dois anos chefiando a seção de TI de um batalhão do Exército Brasileiro, responsável por todos os sistemas em que a unidade rodava. Construir e operar os mesmos sistemas mudou como eu os construo: hosts Linux e serviços Docker endurecidos, backup e monitoramento que alguém de fato confere, e documentação boa o bastante para a próxima pessoa não precisar de mim.",
    ],
    focus: ["TypeScript", "Node.js", "Python", "GCP", "AWS", "Docker", "SQL", "NoSQL", "BigQuery"],
  },
};

export const education: Record<
  Lang,
  {
    degrees: { title: string; org: string; period: string }[];
    courses: { title: string; org: string }[];
    languages: { name: string; level: string }[];
  }
> = {
  en: {
    degrees: [
      {
        title: "Associate Degree, Systems Analysis and Development",
        org: "Descomplica Faculdade Digital",
        period: "2022 — 2024",
      },
    ],
    courses: [
      { title: "Introduction to Cloud, Semester 1", org: "AWS Academy" },
      { title: "Business Intelligence with Power BI", org: "SENAC/MS" },
      { title: "IT Infrastructure Management", org: "FIAP" },
      { title: "Cybersecurity", org: "FIAP" },
    ],
    languages: [
      { name: "Portuguese", level: "Native" },
      { name: "English", level: "Fluent" },
    ],
  },
  "pt-br": {
    degrees: [
      {
        title: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
        org: "Descomplica Faculdade Digital",
        period: "2022 — 2024",
      },
    ],
    courses: [
      { title: "Introduction to Cloud, Semester 1", org: "AWS Academy" },
      { title: "Business Intelligence com Power BI", org: "SENAC/MS" },
      { title: "Gestão de Infraestruturas de TI", org: "FIAP" },
      { title: "Cybersecurity", org: "FIAP" },
    ],
    languages: [
      { name: "Português", level: "Nativo" },
      { name: "Inglês", level: "Fluente" },
    ],
  },
};
