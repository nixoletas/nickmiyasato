import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const SocialIcons = () => {
  const [copied, setCopied] = useState(false);

  const email = "contact@nickmiyasato.com.br";

  const handleEmailClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/nixoletas", icon: faGithub },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/nixoletas",
      icon: faLinkedin,
    },
    {
      name: "Gmail",
      url: "#",
      icon: faEnvelope,
      isEmail: true,
    },
  ];

  return (
    <div style={{ textAlign: "center", padding: "20px", position: "relative" }}>
      {copied && (
        <div
          style={{
            position: "absolute",
            top: "-30px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(255, 255, 255, 0.95)",
            color: "#667eea",
            padding: "8px 16px",
            borderRadius: "8px",
            fontSize: "0.9rem",
            fontWeight: "600",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            animation: "fadeIn 0.3s ease",
          }}
        >
          Email copied!
        </div>
      )}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "1.5rem",
        }}
      >
        {socialLinks.map((link, index) => (
          <li key={index} style={{ margin: "10px 0" }}>
            <a
              className="social-icon"
              href={link.url}
              target={link.isEmail ? undefined : "_blank"}
              rel={link.isEmail ? undefined : "noopener noreferrer"}
              onClick={link.isEmail ? handleEmailClick : undefined}
              style={{
                textDecoration: "none",
                color: "var(--ifm-color-primary)",
                fontSize: "2rem",
                transition: "transform 310ms ease, color 310ms ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color =
                  "var(--ifm-color-primary-darkest)";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--ifm-color-primary)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <FontAwesomeIcon icon={link.icon} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialIcons;
