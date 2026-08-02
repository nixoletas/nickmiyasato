import type { Lang } from "@/i18n/ui";

export const site = {
  name: "Nick Miyasato",
  legalName: "Nicholas Miyasato",
  url: "https://nickmiyasato.com.br",
  email: "nick.miyasato.dev@gmail.com",
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
      "Full-stack engineer, 3+ years. From data pipelines on GCP and BigQuery to the on-premise stack of a Brazilian Army battalion — with enterprise .NET and Angular, and product work in Next.js, in between.",
    bio: [
      "Software engineer with 3+ years across the full stack — C#/.NET and Angular on the enterprise side, Next.js and Supabase on the product side. For two years I led the IT section of a Brazilian Army battalion, responsible for every system the unit ran on.",
      "Building and operating the same systems changed how I build them: hardened Linux hosts and Docker services, backups and monitoring that get checked, and documentation good enough that the next person doesn't need me.",
    ],
    focus: [".NET", "Angular", "Next.js", "TypeScript", "Docker", "DevSecOps"],
  },
  "pt-br": {
    headline: "Prazer, Nicholas.",
    tagline:
      "Engenheiro full-stack, 3+ anos. De pipelines de dados no GCP e BigQuery ao ambiente on-premise de um batalhão do Exército Brasileiro — com .NET e Angular no corporativo, e produto em Next.js, no meio do caminho.",
    bio: [
      "Engenheiro de software com 3+ anos de full-stack — C#/.NET e Angular no lado corporativo, Next.js e Supabase no lado de produto. Por dois anos chefiei a seção de TI de um batalhão do Exército Brasileiro, responsável por todos os sistemas em que a unidade rodava.",
      "Construir e operar os mesmos sistemas mudou como eu os construo: hosts Linux e serviços Docker endurecidos, backup e monitoramento que alguém de fato confere, e documentação boa o bastante para a próxima pessoa não precisar de mim.",
    ],
    focus: [".NET", "Angular", "Next.js", "TypeScript", "Docker", "DevSecOps"],
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
        org: "Faculdade Descomplica Digital",
        period: "2021 — 2024",
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
        org: "Faculdade Descomplica Digital",
        period: "2021 — 2024",
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
