import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import HomepageExperience from "@site/src/components/HomepageExperience";
import HomepageEducation from "@site/src/components/HomepageEducation";
import DotPattern from "@site/src/components/DotPattern";

import Heading from "@theme/Heading";
import styles from "./index.module.css";
import Translate from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import SocialIcons from "../components/SocialIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const RESUME_LINKS = {
  pt: "https://github.com/nixoletas/resume/raw/refs/heads/main/resumes/pt-br/CV_Nicholas_Miyasato.pdf",
  en: "https://github.com/nixoletas/resume/raw/refs/heads/main/resumes/en/Resume_Nicholas_Miyasato.pdf",
};

function HomepageHeader() {
  const { i18n } = useDocusaurusContext();
  const isPtBr = i18n.currentLocale === "pt-br";
  const isEn = i18n.currentLocale === "en";

  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1.2}
        className={styles.dotPatternColor}
      />
      <div className={clsx("container", styles.heroContent)}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img
            src="/img/nick.jpeg"
            alt="Nicholas Miyasato"
            className={styles.profileImage}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <Heading as="h1" className={styles.heroTitle}>
            <Translate>Hi, I'm Nick.</Translate>
          </Heading>
        </motion.div>

        <motion.p
          className={styles.heroSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          <Translate>
            Software Engineer with 4+ years of experience in team leadership,
            project management, and full-stack development.
          </Translate>
        </motion.p>

        <motion.div
          className={styles.resumeButtons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
        >
          {isPtBr ? (
            <Link
              className={styles.resumeBtn}
              href={RESUME_LINKS.pt}
              target="_blank"
            >
              <span className={styles.resumeBtnFlag}>🇧🇷</span>
              <Translate>Currículo (PT-BR)</Translate>
              <FontAwesomeIcon icon={faFilePdf} width={14} />
            </Link>
          ) : (
            <Link
              className={styles.resumeBtn}
              href={RESUME_LINKS.en}
              target="_blank"
            >
              <span className={styles.resumeBtnFlag}>🇺🇸</span>
              <Translate>Resume (EN)</Translate>
              <FontAwesomeIcon icon={faFilePdf} width={14} />
            </Link>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
        >
          <SocialIcons />
        </motion.div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout title={`Welcome`} description="Nicholas Miyasato Portfolio & Blog">
      <HomepageHeader />
      <main>
        <HomepageExperience />
        <HomepageEducation />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
