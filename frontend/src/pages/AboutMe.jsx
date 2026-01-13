import { useEffect, useState } from "react";
import api from "../api/client";

const getResponsiveStyles = (isMobile) => ({
  page: {
    minHeight: "100vh",
    background: "#0b0b0b",
    color: "white",
    padding: isMobile ? "2rem 1rem" : "4rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    maxWidth: "900px",
    width: "100%",
    textAlign: "center"
  },
  heading: {
    fontSize: isMobile ? "2.5rem" : "3.5rem",
    fontWeight: "bold",
    color: "#00ff88",
    marginBottom: isMobile ? "2rem" : "3rem",
    textShadow: "0 0 20px rgba(0, 255, 136, 0.5)"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "2rem" : "2.5rem"
  },
  section: {
    textAlign: "center"
  },
  sectionTitle: {
    fontSize: isMobile ? "1.5rem" : "2rem",
    fontWeight: "bold",
    color: "#00ff88",
    marginBottom: "1.5rem",
    textShadow: "0 0 10px rgba(0, 255, 136, 0.3)"
  },
  text: {
    fontSize: isMobile ? "1rem" : "1.2rem",
    color: "#e0e0e0",
    lineHeight: "1.8",
    marginBottom: "1rem",
    padding: isMobile ? "0 0.5rem" : "0"
  },
  bold: {
    fontWeight: "bold",
    color: "white"
  },
  experienceItem: {
    marginBottom: "2rem",
    padding: isMobile ? "1rem" : "1.5rem",
    background: "rgba(0, 255, 136, 0.05)",
    borderRadius: "8px",
    border: "1px solid rgba(0, 255, 136, 0.2)"
  },
  loading: {
    textAlign: "center",
    color: "#ccc",
    fontSize: isMobile ? "1rem" : "1.2rem",
    padding: isMobile ? "2rem" : "4rem"
  },
  error: {
    textAlign: "center",
    color: "#ff4444",
    fontSize: isMobile ? "1rem" : "1.2rem",
    padding: isMobile ? "2rem" : "4rem"
  }
});

export default function AboutMe() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    api.get("/profile")
      .then(res => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile information");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const responsiveStyles = getResponsiveStyles(isMobile);

  if (loading) {
    return (
      <div style={responsiveStyles.page}>
        <div style={responsiveStyles.loading}>Loading...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div style={responsiveStyles.page}>
        <div style={responsiveStyles.error}>Error: {error || "Failed to load information"}</div>
      </div>
    );
  }

  return (
    <section style={responsiveStyles.page}>
      <div style={responsiveStyles.container}>
        <h1 style={responsiveStyles.heading}>About Me</h1>
        
        <div style={responsiveStyles.content}>
          <div style={responsiveStyles.section}>
            <h2 style={responsiveStyles.sectionTitle}>Professional Summary</h2>
            <p style={responsiveStyles.text}>
              <strong style={responsiveStyles.bold}>{profile.professionalSummary}</strong>
            </p>
          </div>

          <div style={responsiveStyles.section}>
            <h2 style={responsiveStyles.sectionTitle}>Experience</h2>
            {profile.experience && profile.experience.map((exp, idx) => (
              <div key={idx} style={responsiveStyles.experienceItem}>
                <p style={responsiveStyles.text}>
                  <strong style={responsiveStyles.bold}>{exp.title}</strong> at <strong style={responsiveStyles.bold}>{exp.company}</strong>
                  {exp.location && <span> - <strong style={responsiveStyles.bold}>{exp.location}</strong></span>}
                </p>
                <p style={responsiveStyles.text}>
                  <strong style={responsiveStyles.bold}>{exp.period}</strong>
                </p>
              </div>
            ))}
          </div>

          <div style={responsiveStyles.section}>
            <h2 style={responsiveStyles.sectionTitle}>Achievements</h2>
            {profile.achievements && profile.achievements.map((ach, idx) => (
              <p key={idx} style={responsiveStyles.text}>
                <strong style={responsiveStyles.bold}>• {ach}</strong>
              </p>
            ))}
          </div>

          <div style={responsiveStyles.section}>
            <h2 style={responsiveStyles.sectionTitle}>Education</h2>
            {profile.education && profile.education.map((edu, idx) => (
              <p key={idx} style={responsiveStyles.text}>
                <strong style={responsiveStyles.bold}>{edu}</strong>
              </p>
            ))}
          </div>

          
        </div>
      </div>
    </section>
  );
}

