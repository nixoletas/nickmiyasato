import type { Lang } from "@/i18n/ui";

export interface Service {
  title: string;
  /** One or two sentences, written as the outcome the client gets. */
  pitch: string;
  includes: string[];
  stack: string[];
  /** Project slugs (src/content/projects/<lang>/<slug>.mdx) shown as proof. */
  proof: string[];
}

export interface ServicesCopy {
  eyebrow: string;
  title: string;
  lead: string;
  servicesHeading: string;
  includesLabel: string;
  proofLabel: string;
  services: Service[];
  processHeading: string;
  process: { title: string; text: string }[];
  faqHeading: string;
  faq: { q: string; a: string }[];
  cta: { title: string; text: string; button: string; subject: string; body: string };
}

/**
 * Copy for /services. Kept as data rather than MDX so both locales share one
 * layout and a new service is a single object, not a new section of markup.
 * Prices are deliberately absent: every engagement is quoted after a call.
 */
export const services: Record<Lang, ServicesCopy> = {
  "pt-br": {
    eyebrow: "Serviços",
    title: "Sites, sistemas e dados para o seu negócio",
    lead: "Desenvolvedor full stack freelancer em São Paulo, atendendo todo o Brasil. Trabalho por projeto ou por contrato, sozinho ou junto do seu time. Você fala direto com quem escreve o código, do primeiro contato à entrega.",
    servicesHeading: "O que eu faço",
    includesLabel: "Inclui",
    proofLabel: "Já fiz",
    services: [
      {
        title: "Sites e landing pages",
        pitch: "Site institucional ou página de vendas que carrega rápido, aparece no Google e é fácil de atualizar.",
        includes: [
          "Layout responsivo, pensado para o celular",
          "SEO técnico e performance",
          "Domínio, hospedagem e e-mail configurados",
          "Formulário de contato ou botão de WhatsApp",
        ],
        stack: ["Astro", "Next.js", "Tailwind"],
        proof: [],
      },
      {
        title: "Sistemas web e apps",
        pitch: "Do MVP ao produto em produção: área de membros, painel administrativo, pagamentos e app para Android e iOS.",
        includes: [
          "Login, perfis e permissões",
          "Pagamentos e assinaturas",
          "Painel administrativo",
          "App mobile em Flutter ou React Native",
        ],
        stack: ["Next.js", "Supabase", "Flutter", "Stripe"],
        proof: ["nekoreader"],
      },
      {
        title: "Dados e dashboards",
        pitch: "Junto os dados espalhados em planilhas e sistemas e transformo em painéis em que dá para confiar na hora de decidir.",
        includes: [
          "Pipelines e integração entre sistemas",
          "Modelagem em SQL e BigQuery",
          "Dashboards em Looker Studio ou Power BI",
          "Relatórios automáticos",
        ],
        stack: ["Python", "BigQuery", "SQL", "Dataform"],
        proof: [],
      },
      {
        title: "Infraestrutura e manutenção",
        pitch: "Servidor, deploy, backup e monitoramento, para o sistema que você já tem continuar no ar sem sustos.",
        includes: [
          "Servidores Linux e Docker",
          "Deploy automático (CI/CD)",
          "Backup e monitoramento que alguém confere",
          "Plano mensal de suporte",
        ],
        stack: ["Docker", "Linux", "AWS", "GCP"],
        proof: [],
      },
    ],
    processHeading: "Como funciona",
    process: [
      {
        title: "Conversa",
        text: "Você conta o problema e eu pergunto até entender. Uma chamada curta, sem custo.",
      },
      {
        title: "Proposta",
        text: "Escopo, prazo e preço fechados por escrito, antes de qualquer pagamento.",
      },
      {
        title: "Construção",
        text: "Entregas parciais toda semana, num link que você mesmo pode abrir e testar.",
      },
      {
        title: "Entrega",
        text: "Código, acessos e documentação ficam com você. Nada preso a mim.",
      },
    ],
    faqHeading: "Perguntas frequentes",
    faq: [
      {
        q: "Quanto custa?",
        a: "Depende do escopo. Depois da conversa você recebe uma proposta com preço fechado, sem cobrança por hora surpresa.",
      },
      {
        q: "Você atende fora de São Paulo?",
        a: "Sim. O trabalho é remoto, com clientes em qualquer lugar do Brasil e do exterior.",
      },
      {
        q: "E depois da entrega?",
        a: "Posso seguir com manutenção num plano mensal, ou passar tudo documentado para o seu time continuar.",
      },
      {
        q: "Já tenho um sistema. Você mexe nele?",
        a: "Sim. Começo lendo o que existe e digo com franqueza se vale corrigir, evoluir ou refazer.",
      },
    ],
    cta: {
      title: "Tem um projeto em mente?",
      text: "Me conte o que você precisa. Respondo em até um dia útil com os próximos passos.",
      button: "Pedir orçamento",
      subject: "Orçamento de projeto",
      body: "Oi, Nicholas!\n\nO que preciso:\n\nPrazo ideal:\n\nSite ou sistema atual (se houver):\n",
    },
  },
  en: {
    eyebrow: "Services",
    title: "Websites, software and data for your business",
    lead: "Freelance full stack developer based in São Paulo, Brazil, working remotely with clients anywhere. I work per project or on contract, on my own or alongside your team. You talk directly to the person writing the code, from the first call to delivery.",
    servicesHeading: "What I do",
    includesLabel: "Includes",
    proofLabel: "Done before",
    services: [
      {
        title: "Websites and landing pages",
        pitch: "A company site or sales page that loads fast, shows up on Google and is easy to update.",
        includes: [
          "Responsive, mobile-first layout",
          "Technical SEO and performance",
          "Domain, hosting and email set up",
          "Contact form or WhatsApp button",
        ],
        stack: ["Astro", "Next.js", "Tailwind"],
        proof: [],
      },
      {
        title: "Web apps and mobile",
        pitch: "From MVP to a product in production: member areas, admin dashboards, payments and apps for Android and iOS.",
        includes: [
          "Login, profiles and permissions",
          "Payments and subscriptions",
          "Admin dashboard",
          "Mobile app in Flutter or React Native",
        ],
        stack: ["Next.js", "Supabase", "Flutter", "Stripe"],
        proof: ["nekoreader"],
      },
      {
        title: "Data and dashboards",
        pitch: "I pull together data scattered across spreadsheets and systems and turn it into dashboards you can trust when deciding.",
        includes: [
          "Pipelines and system integrations",
          "Modelling in SQL and BigQuery",
          "Dashboards in Looker Studio or Power BI",
          "Automated reports",
        ],
        stack: ["Python", "BigQuery", "SQL", "Dataform"],
        proof: [],
      },
      {
        title: "Infrastructure and upkeep",
        pitch: "Servers, deploys, backups and monitoring, so the system you already have stays up without surprises.",
        includes: [
          "Linux servers and Docker",
          "Automated deploys (CI/CD)",
          "Backups and monitoring someone actually checks",
          "Monthly support plan",
        ],
        stack: ["Docker", "Linux", "AWS", "GCP"],
        proof: [],
      },
    ],
    processHeading: "How it works",
    process: [
      {
        title: "Call",
        text: "You describe the problem and I ask until I understand it. A short call, free of charge.",
      },
      {
        title: "Proposal",
        text: "Scope, timeline and a fixed price in writing, before any payment.",
      },
      {
        title: "Build",
        text: "Working increments every week, on a link you can open and test yourself.",
      },
      {
        title: "Handover",
        text: "Code, access and documentation stay with you. Nothing locked to me.",
      },
    ],
    faqHeading: "Common questions",
    faq: [
      {
        q: "How much does it cost?",
        a: "It depends on scope. After the call you get a proposal with a fixed price — no surprise hourly billing.",
      },
      {
        q: "Do you work with clients outside Brazil?",
        a: "Yes. I work remotely, in English or Portuguese, with clients anywhere.",
      },
      {
        q: "What happens after delivery?",
        a: "I can stay on for maintenance on a monthly plan, or hand everything over, documented, for your team to carry on.",
      },
      {
        q: "I already have a system. Can you work on it?",
        a: "Yes. I start by reading what exists and tell you honestly whether it is worth fixing, extending or rebuilding.",
      },
    ],
    cta: {
      title: "Have a project in mind?",
      text: "Tell me what you need. I reply within one business day with next steps.",
      button: "Request a quote",
      subject: "Project enquiry",
      body: "Hi Nick,\n\nWhat I need:\n\nIdeal timeline:\n\nCurrent site or system (if any):\n",
    },
  },
};
