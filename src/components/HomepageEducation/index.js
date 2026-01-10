import React from "react";
import Heading from "@theme/Heading";
import Translate from "@docusaurus/Translate";
import styles from "./styles.module.css";

export default function HomepageEducation() {
  return (
    <section className={styles.educationSection}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <Heading as="h2" className={styles.title}>
              <Translate>Education</Translate>
            </Heading>
            <div className={styles.educationContent}>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Formação</h3>
                <div className={styles.item}>
                  <h4 className={styles.itemTitle}>
                    Análise e Desenvolvimento de Sistemas
                  </h4>
                  <p className={styles.itemSubtitle}>
                    Faculdade Descomplica Digital (2021 - 2024)
                  </p>
                </div>
                <div className={styles.item}>
                  <h4 className={styles.itemTitle}>Segurança da Informação</h4>
                  <p className={styles.itemSubtitle}>
                    Faculdade Descomplica Digital (2024 - Momento)
                  </p>
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Cursos</h3>
                <div className={styles.item}>
                  <h4 className={styles.itemTitle}>
                    AWS Academy Introduction to Cloud Semester 1
                  </h4>
                  <p className={styles.itemSubtitle}>AWS</p>
                </div>
                <div className={styles.item}>
                  <h4 className={styles.itemTitle}>
                    Business Intelligence com Power BI
                  </h4>
                  <p className={styles.itemSubtitle}>SENAC/MS</p>
                </div>
                <div className={styles.item}>
                  <h4 className={styles.itemTitle}>
                    Gestão de Infraestruturas de TI
                  </h4>
                  <p className={styles.itemSubtitle}>FIAP</p>
                </div>
                <div className={styles.item}>
                  <h4 className={styles.itemTitle}>Cybersecurity</h4>
                  <p className={styles.itemSubtitle}>FIAP</p>
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Idiomas</h3>
                <div className={styles.item}>
                  <h4 className={styles.itemTitleHighlight}>
                    🇬🇧 Inglês Fluente
                  </h4>
                  <p className={styles.itemDescription}>
                    Fluente em inglês, com capacidade de comunicação eficaz em
                    ambientes profissionais internacionais, leitura técnica,
                    escrita e apresentações.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
