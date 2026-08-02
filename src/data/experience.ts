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
  /** Locale-agnostic path to related work, e.g. "/projects/intranet-govbr". */
  link?: { href: string; label: string };
}

export const experience: Record<Lang, Role[]> = {
  en: [
    {
      company: "Zukk",
      kind: "Freelance",
      title: "Software Engineer — .NET, Angular",
      start: "Jul 2025",
      end: null,
      summary:
        "Consulting on a compliance-index system for Neoenergia, one of Brazil's largest electricity groups. Building C#/.NET Web APIs and Angular front ends, with RabbitMQ handling messaging between services on a large, high-complexity project.",
      stack: ["C#", ".NET", "Angular", "Web API", "RabbitMQ"],
    },
    {
      company: "A Divisão",
      kind: "Freelance",
      title: "Software Engineer — Next.js",
      start: "Jun 2025",
      end: null,
      summary:
        "Building the platform that connects companies with military veterans. Next.js and Supabase, Stripe for payments and subscription management, plus plan gating and DynamoDB query optimisation.",
      stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "DynamoDB"],
    },
    {
      company: "Picmoney",
      kind: "Freelance",
      title: "Software Engineer — Flutter",
      start: "May 2025",
      end: null,
      summary:
        "Built the first Flutter MVP, with API integration and a modern interface layer. Wrote the documentation for the whole stack — API reference, process flows, architecture diagrams — which cut how long it took new developers to become productive.",
      stack: ["Flutter", "Dart", "REST APIs", "Technical writing"],
    },
    {
      company: "Brazilian Army",
      kind: "Full-time",
      title: "Head of IT Section",
      start: "Mar 2023",
      end: "Jul 2025",
      summary:
        "Led the team responsible for every piece of equipment and every service the unit ran on. Replaced the Joomla intranet with an Angular and Strapi application on the gov.br design system, which was adopted as a model by other units. Hardened and improved availability across Linux hosts and Docker services, and ran backups, monitoring, and observability.",
      stack: [
        "Angular",
        "Strapi",
        "Linux",
        "Docker",
        "Nginx",
        "PostgreSQL",
        "MySQL",
        "LDAP",
        "Grafana",
      ],
      link: { href: "/projects/intranet-govbr", label: "GovBR Intranet" },
    },
  ],
  "pt-br": [
    {
      company: "Zukk",
      kind: "Freelance",
      title: "Engenheiro de Software — .NET, Angular",
      start: "Jul 2025",
      end: null,
      summary:
        "Consultoria no sistema de índices de conformidade da Neoenergia, um dos maiores grupos do setor elétrico brasileiro. Desenvolvimento de Web APIs em C#/.NET e front-ends Angular, com RabbitMQ na mensageria entre serviços, num projeto extenso e de alta complexidade.",
      stack: ["C#", ".NET", "Angular", "Web API", "RabbitMQ"],
    },
    {
      company: "A Divisão",
      kind: "Freelance",
      title: "Engenheiro de Software — Next.js",
      start: "Jun 2025",
      end: null,
      summary:
        "Desenvolvimento da plataforma que conecta empresas a veteranos militares. Next.js e Supabase, Stripe para pagamentos e gestão de assinaturas, além de controle de planos e otimização de consultas no DynamoDB.",
      stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "DynamoDB"],
    },
    {
      company: "Picmoney",
      kind: "Freelance",
      title: "Engenheiro de Software — Flutter",
      start: "Mai 2025",
      end: null,
      summary:
        "Construí o primeiro MVP em Flutter, com integração de APIs e uma camada de interface moderna. Escrevi a documentação de toda a stack — referência de API, fluxos de processo, diagramas de arquitetura — o que reduziu o tempo até novos desenvolvedores se tornarem produtivos.",
      stack: ["Flutter", "Dart", "APIs REST", "Documentação técnica"],
    },
    {
      company: "Exército Brasileiro",
      kind: "Tempo integral",
      title: "Chefe da Seção de TI",
      start: "Mar 2023",
      end: "Jul 2025",
      summary:
        "Chefiei a equipe responsável por todos os equipamentos e serviços em que a unidade rodava. Substituí a intranet Joomla por uma aplicação Angular e Strapi sobre o design system gov.br, adotada como modelo por outras unidades. Endureci e melhorei a disponibilidade de hosts Linux e serviços Docker, e mantive backups, monitoramento e observabilidade.",
      stack: [
        "Angular",
        "Strapi",
        "Linux",
        "Docker",
        "Nginx",
        "PostgreSQL",
        "MySQL",
        "LDAP",
        "Grafana",
      ],
      link: { href: "/projects/intranet-govbr", label: "Intranet GovBR" },
    },
  ],
};
