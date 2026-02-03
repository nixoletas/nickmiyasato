import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import HomepageExperience from "@site/src/components/HomepageExperience";
import HomepageEducation from "@site/src/components/HomepageEducation";

import Heading from "@theme/Heading";
import styles from "./index.module.css";
import Translate from "@docusaurus/Translate";
import SocialIcons from "../components/SocialIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

function HomepageHeader() {
  return (
    <>
      <header className={clsx("hero", styles.heroBanner)} style={{ backgroundColor: "white" }}>
        <div className="container">
          <Heading
            as="h1"
            className="hero__title"
            style={{ paddingTop: "0rem", color: "#333" }}
          >
            <Translate>Hi, I'm Nick.</Translate>
          </Heading>
          <img
            src="/img/nick.jpeg"
            alt="GitHub"
            style={{
              width: "120px",
              height: "120px",
              marginLeft: "10px",
              borderRadius: "50%",
            }}
          />
          <p className="hero__subtitle" style={{ paddingTop: "1rem", color: "#666" }}>
            <Translate>
              Software Engineer with 4+ years of experience in team leadership, project management, and full-stack development.
            </Translate>
          </p>
          <div
            className={styles.buttons}
            style={{ display: "flex", gap: "10px", flexDirection: "column" }}
          >

            <Link
              className="button button--secondary button--lg"
              href="/Nick_Miyasato.pdf"
              target="_blank"
              style={{
                border: "none",
                background: "transparent",
                position: "relative",
                padding: "0",
                color: "#333",
                paddingTop: "1rem",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.setProperty("--underline-width", "100%");
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.setProperty("--underline-width", "0%");
              }}
            >
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <Translate>Resume (PDF)</Translate>
                <FontAwesomeIcon icon={faFilePdf} width={15} />
                <span
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    left: "0",
                    width: "var(--underline-width, 0%)",
                    height: "2px",
                    backgroundColor: "var(--ifm-color-primary)",
                    transition: "width 0.3s ease",
                  }}
                />
              </span>
            </Link>
          </div>
          <SocialIcons />
        </div>
      </header>
    </>
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
