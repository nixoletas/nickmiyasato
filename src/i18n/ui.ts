export const languages = {
  en: "English",
  "pt-br": "Português",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "en";

/** Short label used in the header language switcher. */
export const langShort: Record<Lang, string> = {
  en: "EN",
  "pt-br": "PT",
};

/** BCP 47 tags for <html lang> and hreflang. */
export const htmlLang: Record<Lang, string> = {
  en: "en",
  "pt-br": "pt-BR",
};

export const ui = {
  en: {
    "nav.work": "Work",
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.blog": "Writing",
    "nav.resume": "Résumé",
    "nav.contact": "Contact",
    "nav.menu": "Menu",
    "nav.close": "Close menu",
    "nav.theme": "Toggle colour theme",
    "nav.lang": "Switch language",
    "nav.skip": "Skip to content",

    "hero.role": "Full Stack Software Engineer",
    "hero.available": "Open to new opportunities",

    "work.title": "Selected work",
    "work.more": "More projects",
    "work.all": "All projects",
    "work.demo": "Live demo",
    "work.repo": "Source",
    "work.case": "Read the case study",
    "work.view": "View project",
    "work.back": "Back to all projects",
    "work.stack": "Stack",
    "work.year": "Year",
    "work.role": "Role",

    "exp.title": "Experience",
    "exp.present": "Present",
    "exp.case": "Case study",

    "edu.title": "Education",
    "edu.degrees": "Degrees",
    "edu.courses": "Certifications",
    "edu.languages": "Languages",

    "about.title": "About",

    "contact.title": "Get in touch",
    "contact.lead":
      "Best reached by email. I read everything and reply within a day.",
    "contact.email": "Email",
    "contact.copy": "Copy",
    "contact.copied": "Copied",

    "footer.built": "Built with Astro. No trackers, no cookies.",
    "footer.source": "Source",

    "404.title": "Page not found",
    "404.lead": "That page moved or never existed.",
    "404.home": "Go home",

    "resume.title": "Résumé",
    "resume.lead":
      "One page, kept in sync with this site. The PDF below is generated from the same source.",
    "resume.download": "Download PDF",
    "resume.print": "Print",
    "resume.summary": "Professional summary",
    "resume.projects": "Selected projects",
    "resume.skills": "Technical skills",
    "resume.titles": "Equivalent role titles",
    "resume.languages": "Spoken languages",
    "resume.back": "Back to site",
    "resume.generated": "Generated from nickmiyasato.dev",

    "blog.title": "Writing",
    "blog.lead":
      "Notes on systems I've built and run — infrastructure, data, and the parts that only show up once something is in production.",
    "blog.empty": "Nothing published yet.",
    "blog.back": "All writing",
    "blog.readingTime": "min read",
    "blog.draft": "Draft",
    "blog.feed": "RSS",
    "blog.published": "Published",
  },
  "pt-br": {
    "nav.work": "Trabalho",
    "nav.projects": "Projetos",
    "nav.about": "Sobre",
    "nav.blog": "Escrita",
    "nav.resume": "Currículo",
    "nav.contact": "Contato",
    "nav.menu": "Menu",
    "nav.close": "Fechar menu",
    "nav.theme": "Alternar tema de cores",
    "nav.lang": "Trocar idioma",
    "nav.skip": "Pular para o conteúdo",

    "hero.role": "Engenheiro de Software Full Stack",
    "hero.available": "Aberto a novas oportunidades",

    "work.title": "Trabalhos selecionados",
    "work.more": "Outros projetos",
    "work.all": "Todos os projetos",
    "work.demo": "Ver no ar",
    "work.repo": "Código",
    "work.case": "Ler o estudo de caso",
    "work.view": "Ver projeto",
    "work.back": "Voltar para todos os projetos",
    "work.stack": "Stack",
    "work.year": "Ano",
    "work.role": "Função",

    "exp.title": "Experiência",
    "exp.present": "Atual",
    "exp.case": "Estudo de caso",

    "edu.title": "Formação",
    "edu.degrees": "Graduação",
    "edu.courses": "Certificações",
    "edu.languages": "Idiomas",

    "about.title": "Sobre",

    "contact.title": "Vamos conversar",
    "contact.lead":
      "O caminho mais rápido é e-mail. Leio tudo e respondo em até um dia.",
    "contact.email": "E-mail",
    "contact.copy": "Copiar",
    "contact.copied": "Copiado",

    "footer.built": "Feito com Astro. Sem rastreadores, sem cookies.",
    "footer.source": "Código",

    "404.title": "Página não encontrada",
    "404.lead": "Essa página mudou de lugar ou nunca existiu.",
    "404.home": "Ir para o início",

    "resume.title": "Currículo",
    "resume.lead":
      "Uma página, sempre em dia com este site. O PDF abaixo sai da mesma fonte.",
    "resume.download": "Baixar PDF",
    "resume.print": "Imprimir",
    "resume.summary": "Resumo profissional",
    "resume.projects": "Projetos selecionados",
    "resume.skills": "Competências técnicas",
    "resume.titles": "Títulos equivalentes",
    "resume.languages": "Idiomas",
    "resume.back": "Voltar ao site",
    "resume.generated": "Gerado a partir de nickmiyasato.dev",

    "blog.title": "Escrita",
    "blog.lead":
      "Notas sobre sistemas que construí e operei — infraestrutura, dados e as partes que só aparecem quando a coisa está em produção.",
    "blog.empty": "Nada publicado ainda.",
    "blog.back": "Todos os textos",
    "blog.readingTime": "min de leitura",
    "blog.draft": "Rascunho",
    "blog.feed": "RSS",
    "blog.published": "Publicado em",
  },
} as const;

export type UIKey = keyof (typeof ui)["en"];
