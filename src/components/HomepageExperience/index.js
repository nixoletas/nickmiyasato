import React from "react";
import Heading from "@theme/Heading";
import Experience from "../Experience";
import TechTags from "../TechTags";
import Translate from "@docusaurus/Translate";
import styles from "./styles.module.css";

const experiences = [
  {
    title: "Zukk - Freelance",
    role: "Desenvolvedor de Software .NET, Angular",
    period: "(Jul 2025 - Momento)",
    description:
      "Consultoria no desenvolvimento e implantação do sistema de índices de conformidade, desenvolvimento de WebAPIs, mensageria com RabbitMQ e aplicações em C# .NET e Angular. Apoiei o time em um projeto extenso de alta complexidade para a Neoenergia, grupo do setor elétrico brasileiro.",
    tags: ["C#", ".NET", "Angular", "WebAPI", "RabbitMQ"],
  },
  {
    title: "A Divisão - Freelance",
    role: "Desenvolvedor de Software NextJs",
    period: "(Junho 2025 - Momento)",
    description:
      "Atuei no desenvolvimento das plataformas de Conexão entre Empresas e Veteranos militares com tecnologias Next.js, Supabase, integração de pagamentos e gestão de assinaturas com Stripe, monetização da plataforma e controle de planos, otimização de banco de dados DynamoDB.",
    tags: ["Next.js", "Supabase", "Stripe", "DynamoDB", "TypeScript"],
  },
  {
    title: "Picmoney - Freelance",
    role: "Desenvolvedor de Software Flutter",
    period: "(Maio 2025 - Momento)",
    description:
      "Desenvolvi o primeiro MVP em Flutter utilizando padrões de design e interfaces modernas com integração de APIs. Criei documentação para toda a pilha tecnológica, incluindo API, fluxos de processos e diagramas, acelerando e facilitando a integração de novos membros da equipe e promovendo a transferência de conhecimento.",
    tags: ["Flutter", "Dart", "API", "Documentation", "MVP"],
  },
  {
    title: "Exército Brasileiro - Período Integral",
    role: "Chefe da Seção de TI",
    period: "(Mar 2023 - Jul 2025)",
    description:
      "Gerenciei a equipe responsável pela manutenção e suporte de todos os equipamentos e serviços da unidade. Implementei a nova página da intranet utilizando o padrão governamental GovBr em Angular e Strapi, servindo de modelo para outras unidades do Brasil. Atuei em melhorias de segurança e disponibilidade dos sistemas linux e aplicações Docker, gerenciando backups e ferramentas de monitoramento e observabilidade.",
    tags: [
      "Angular",
      "Strapi",
      "Nginx",
      "Linux",
      "Docker",
      "PostgreSQL",
      "MySQL",
      "LDAP",
      "Grafana",
      "Leadership",
      "IT Management",
    ],
  },
];

export default function HomepageExperience() {
  return (
    <section className={styles.experienceSection}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <Heading as="h2" className={styles.title}>
              <Translate>Experience</Translate>
            </Heading>
            <div className={styles.experiencesContainer}>
              {experiences.map((exp, idx) => (
                <div key={idx} className={styles.experienceItem}>
                  <h3 className={styles.companyTitle}>{exp.title}</h3>
                  <p className={styles.role}>
                    <strong>{exp.role}</strong>
                  </p>
                  <p className={styles.period}>{exp.period}</p>
                  <p className={styles.description}>{exp.description}</p>
                  <TechTags tags={exp.tags} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
