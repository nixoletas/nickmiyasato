import type { Lang } from "@/i18n/ui";

export interface Role {
  company: string;
  /** Freelance, full-time, etc. */
  kind: string;
  title: string;
  /** Displayed as-is; `end: null` renders the localised "Present". */
  start: string;
  end: string | null;
  summary: string;
  stack: string[];
  /** Locale-agnostic path to related work, e.g. "/projects/a-divisao". */
  link?: { href: string; label: string };
}

/**
 * docs/resume.tex is the source of truth for roles, dates, and stacks — it is
 * untracked (see .gitignore), so this file is the public mirror. Keep both in
 * sync when either changes, and check GITHUB-README.md too: the GitHub profile
 * lists the same roles and drifts out of date on its own.
 */
export const experience: Record<Lang, Role[]> = {
  en: [
    {
      company: "Informar Saúde",
      kind: "Full-time",
      title: "Software Engineer",
      start: "Oct 2025",
      end: null,
      summary:
        "Designing healthcare analytics pipelines across on-premise and cloud environments with BigQuery, Dataform, Python, PostgreSQL and MySQL, plus the operational dashboards and reporting that clinical and business teams decide on. Also contributing to GCP and Microsoft cloud migration work, and writing the documentation that keeps the systems usable without me.",
      stack: ["Python", "BigQuery", "Dataform", "PostgreSQL", "MySQL", "GCP"],
    },
    {
      company: "Zukk",
      kind: "Freelance",
      title: "Software Engineer",
      start: "Jul 2025",
      end: "Jan 2026",
      summary:
        "Consulted on a compliance-index system for Neoenergia, one of Brazil's largest electricity groups. Built C#/.NET Web APIs and Angular front ends, with RabbitMQ handling messaging between services on a large, high-complexity project.",
      stack: ["C#", ".NET", "Angular", "Web API", "RabbitMQ"],
    },
    {
      company: "A Divisão",
      kind: "Contract",
      title: "Product Engineer",
      start: "Jun 2025",
      end: null,
      summary:
        "Architecting the platform that connects companies with military veterans, built to hold up under concurrent load. Built the monetisation side on Stripe — payments, plans, subscription management — automated the test and deploy pipelines, cutting release cycle time, and built the real-time metrics and audit dashboards the team runs on.",
      stack: [
        "Next.js",
        "React",
        "Supabase",
        "DynamoDB",
        "Stripe",
        "Docker",
        "CI/CD",
      ],
      link: { href: "/projects/a-divisao", label: "A Divisão" },
    },
    {
      company: "PIC Money",
      kind: "Contract",
      title: "Product Engineer",
      start: "May 2025",
      end: null,
      summary:
        "Designed the database architecture and backend infrastructure, then built mobile and web features on top — authentication, API integrations, geolocation, and augmented reality. I own QA on what I ship and sit in on product planning and go-to-market scoping. Documented the APIs, business flows, and architectural decisions so the product could keep moving without me in the room.",
      stack: [
        "Flutter",
        "React",
        "Node.js",
        "PostgreSQL",
        "API Design",
        "Cloud Infrastructure",
      ],
      link: { href: "/projects/picmoney", label: "PIC Money" },
    },
    {
      company: "Brazilian Army",
      kind: "Full-time",
      title: "Head of Information Technology Section",
      start: "Jan 2023",
      end: "Jun 2025",
      summary:
        "Led the IT section supporting infrastructure, automation, and internal systems for over 300 users. Built reusable intranet templates that other military organisations adopted nationwide, automated operational workflows in Python, and introduced agile practice and technical standards across internal development.",
      stack: [
        "Python",
        "System Administration",
        "Automation",
        "Infrastructure",
        "Agile",
      ],
    },
  ],
  "pt-br": [
    {
      company: "Informar Saúde",
      kind: "Tempo integral",
      title: "Engenheiro de Software",
      start: "Out 2025",
      end: null,
      summary:
        "Desenvolvimento de pipelines de analytics em saúde entre ambientes on-premise e nuvem com BigQuery, Dataform, Python, PostgreSQL e MySQL, além dos dashboards operacionais e relatórios em que times clínicos e de negócio se apoiam para decidir. Também contribuo nas migrações para GCP e ecossistema Microsoft, e escrevo a documentação que mantém os sistemas utilizáveis sem depender de mim.",
      stack: ["Python", "BigQuery", "Dataform", "PostgreSQL", "MySQL", "GCP"],
    },
    {
      company: "Zukk",
      kind: "Freelance",
      title: "Engenheiro de Software",
      start: "Jul 2025",
      end: "Jan 2026",
      summary:
        "Consultoria no sistema de índices de conformidade da Neoenergia, um dos maiores grupos do setor elétrico brasileiro. Desenvolvi Web APIs em C#/.NET e front-ends Angular, com RabbitMQ na mensageria entre serviços, num projeto extenso e de alta complexidade.",
      stack: ["C#", ".NET", "Angular", "Web API", "RabbitMQ"],
    },
    {
      company: "A Divisão",
      kind: "Contrato",
      title: "Engenheiro de Produto",
      start: "Jun 2025",
      end: null,
      summary:
        "Arquitetura da plataforma que conecta empresas a veteranos militares, construída para aguentar tráfego concorrente. Construí a monetização em cima do Stripe — pagamentos, planos, gestão de assinatura —, automatizei os pipelines de teste e deploy, reduzindo o tempo de ciclo de release, e construí os dashboards de métricas em tempo real e auditoria em que o time se apoia.",
      stack: [
        "Next.js",
        "React",
        "Supabase",
        "DynamoDB",
        "Stripe",
        "Docker",
        "CI/CD",
      ],
      link: { href: "/projects/a-divisao", label: "A Divisão" },
    },
    {
      company: "PIC Money",
      kind: "Contrato",
      title: "Engenheiro de Produto",
      start: "Mai 2025",
      end: null,
      summary:
        "Projetei a arquitetura de banco e a infraestrutura de backend, e desenvolvi as funcionalidades mobile e web em cima disso — autenticação, integrações de API, geolocalização e realidade aumentada. Cuido do QA do que entrego e participo do planejamento de produto e da definição do que vai ao mercado. Documentei APIs, fluxos de negócio e decisões de arquitetura para o produto seguir andando sem eu estar na sala.",
      stack: [
        "Flutter",
        "React",
        "Node.js",
        "PostgreSQL",
        "Design de API",
        "Infraestrutura em nuvem",
      ],
      link: { href: "/projects/picmoney", label: "PIC Money" },
    },
    {
      company: "Exército Brasileiro",
      kind: "Tempo integral",
      title: "Chefe da Seção de Tecnologia da Informação",
      start: "Jan 2023",
      end: "Jun 2025",
      summary:
        "Chefiei a seção de TI responsável por infraestrutura, automação e sistemas internos para mais de 300 usuários. Construí templates de intranet reaproveitáveis que outras organizações militares adotaram país afora, automatizei fluxos operacionais em Python e introduzi prática ágil e padronização técnica no desenvolvimento interno.",
      stack: [
        "Python",
        "Administração de sistemas",
        "Automação",
        "Infraestrutura",
        "Agile",
      ],
    },
  ],
};
