// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: `Nick Miyasato`,
  tagline:
    "Software Engineer with 4+ years of experience in team leadership, project management, and full-stack development.",
  favicon: "img/nick-logo.png",

  // Set the production url of your site here
  url: "https://nickmiyasato.com.br",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "nixoletas", // Usually your GitHub org/user name.
  projectName: "me", // Usually your repo name.
  deploymentBranch: "gh-pages",

  onBrokenLinks: "throw",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "pt-br",
    locales: ["en", "pt-br"],
    localeConfigs: {
      "pt-br": {
        label: "Português (Brasil)",
        direction: "ltr", // Sentido da escrita (esquerda para direita)
      },
      en: {
        label: "English",
        direction: "ltr",
      },
    },
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: 'G-KFEZ9GVF4W',
          anonymizeIP: true,
        },
        docs: {
          sidebarPath: "./sidebars.js",
          routeBasePath: "portfolio",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
          blogTitle: "Nick Miyasato's Blog",
          blogDescription: "A collection of my thoughts and experiences in software development",
          postsPerPage: 10,
          blogSidebarTitle: "Recent Posts",
          blogSidebarCount: 5,
          archiveBasePath: "archive",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        // Options for the search plugin
        indexDocs: true,
        indexPages: true,
        indexBlog: true,
        docsRouteBasePath: 'portfolio',
        blogRouteBasePath: 'blog',
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: false,
        explicitSearchResultPath: false,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          name: "keywords",
          content:
            "software engineer, developer, portfolio, web development, frontend, backend, devsecops",
        },
        { name: "author", content: "Nick Miyasato" },
        {
          name: "description",
          content:
            "Portfolio and blog of Nick Miyasato, a Software Engineer specializing in web development, DevSecOps, and backend technologies.",
        },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Nick Miyasato" },
        { property: "og:locale", content: "en_US" },
        { property: "og:locale:alternate", content: "pt_BR" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:creator", content: "@nickmiyasato" },
      ],
      image: "img/nick-logo.png",
      navbar: {
        title: "Nick Miyasato",
        logo: {
          alt: "Nick Miyasato Logo",
          src: "img/nick-logo.png",
        },
        items: [
          { to: "/blog", label: "Blog", position: "left" },
          {
            to: "/contact",
            label: "Contact",
            position: "right",
          },
          {
            type: "localeDropdown",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",

        copyright: `${new Date().getFullYear()} Nick Miyasato Portfolio. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
    }),
};

export default config;
