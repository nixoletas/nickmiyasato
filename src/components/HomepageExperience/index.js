import React from "react";
import Heading from "@theme/Heading";
import TechTags from "../TechTags";
import Translate from "@docusaurus/Translate";
import styles from "./styles.module.css";

const experiences = [
  {
    title: <Translate>Zukk - Freelance</Translate>,
    role: <Translate>Software Developer .NET, Angular</Translate>,
    period: <Translate>(Jul 2025 - Present)</Translate>,
    description: (
      <Translate>
        Consulting on the development and implementation of the compliance index system, WebAPI development, messaging with RabbitMQ and applications in C# .NET and Angular. I supported the team on an extensive high-complexity project for Neoenergia, a Brazilian electricity sector group.
      </Translate>
    ),
    tags: ["C#", ".NET", "Angular", "WebAPI", "RabbitMQ"],
  },
  {
    title: <Translate>A Divisão - Freelance</Translate>,
    role: <Translate>Software Developer NextJs</Translate>,
    period: <Translate>(June 2025 - Present)</Translate>,
    description: (
      <Translate>
        Worked on the development of platforms connecting Companies and Military Veterans using Next.js, Supabase, payment integration and subscription management with Stripe, platform monetization and plan control, DynamoDB database optimization.
      </Translate>
    ),
    tags: ["Next.js", "Supabase", "Stripe", "DynamoDB", "TypeScript"],
  },
  {
    title: <Translate>Picmoney - Freelance</Translate>,
    role: <Translate>Software Developer Flutter</Translate>,
    period: <Translate>(May 2025 - Present)</Translate>,
    description: (
      <Translate>
        Developed the first MVP in Flutter using design patterns and modern interfaces with API integration. Created documentation for the entire technology stack, including API, process flows and diagrams, accelerating and facilitating the integration of new team members and promoting knowledge transfer.
      </Translate>
    ),
    tags: ["Flutter", "Dart", "API", "Documentation", "MVP"],
  },
  {
    title: <Translate>Exército Brasileiro - Período Integral</Translate>,
    role: <Translate>IT Section Chief</Translate>,
    period: <Translate>(Mar 2023 - Jul 2025)</Translate>,
    description: (
      <Translate>
        Managed the team responsible for maintaining and supporting all unit equipment and services. Implemented the new intranet page using the GovBr government standard in Angular and Strapi, serving as a model for other units in Brazil. Worked on security and availability improvements for Linux systems and Docker applications, managing backups and monitoring and observability tools.
      </Translate>
    ),
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
