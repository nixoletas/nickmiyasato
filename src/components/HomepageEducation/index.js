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
                <h3 className={styles.sectionTitle}>
                  <Translate>Academic Background</Translate>
                </h3>
                <div className={styles.item}>
                  <h4 className={styles.itemTitle}>
                    <Translate>Systems Analysis and Development</Translate>
                  </h4>
                  <p className={styles.itemSubtitle}>
                    <Translate>Faculdade Descomplica Digital (2021 - 2024)</Translate>
                  </p>
                </div>
                <div className={styles.item}>
                  <h4 className={styles.itemTitle}>
                    <Translate>Information Security</Translate>
                  </h4>
                  <p className={styles.itemSubtitle}>
                    <Translate>Faculdade Descomplica Digital (2024 - Momento)</Translate>
                  </p>
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <Translate>Courses</Translate>
                </h3>
                <div className={styles.item}>
                  <h4 className={styles.itemTitle}>
                    <Translate>AWS Academy Introduction to Cloud Semester 1</Translate>
                  </h4>
                  <p className={styles.itemSubtitle}>
                    <Translate>AWS</Translate>
                  </p>
                </div>
                <div className={styles.item}>
                  <h4 className={styles.itemTitle}>
                    <Translate>Business Intelligence with Power BI</Translate>
                  </h4>
                  <p className={styles.itemSubtitle}>
                    <Translate>SENAC/MS</Translate>
                  </p>
                </div>
                <div className={styles.item}>
                  <h4 className={styles.itemTitle}>
                    <Translate>IT Infrastructure Management</Translate>
                  </h4>
                  <p className={styles.itemSubtitle}>
                    <Translate>FIAP</Translate>
                  </p>
                </div>
                <div className={styles.item}>
                  <h4 className={styles.itemTitle}>
                    <Translate>Cybersecurity</Translate>
                  </h4>
                  <p className={styles.itemSubtitle}>
                    <Translate>FIAP</Translate>
                  </p>
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <Translate>Languages</Translate>
                </h3>
                <div className={styles.item}>
                  <h4 className={styles.itemTitleHighlight}>
                    <Translate>🇬🇧 Fluent English</Translate>
                  </h4>
                  <p className={styles.itemDescription}>
                    <Translate>
                      Fluent in English, with effective communication skills in international professional environments, technical reading, writing and presentations.
                    </Translate>
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
