import { useEffect, useState } from "react";
import api from "../api/client";

const getResponsiveStyles = (isMobile) => ({
  page: {
    padding: isMobile ? "2rem 1rem" : "4rem 2rem",
    background: "#0b0b0b",
    minHeight: "100vh",
    color: "white"
  },
  header: {
    textAlign: "center",
    marginBottom: "3rem",
    maxWidth: "1200px",
    margin: "0 auto 3rem auto"
  },
  heading: {
    fontSize: isMobile ? "2rem" : "3rem",
    fontWeight: "bold",
    color: "white",
    marginBottom: "1rem"
  },
  subtitle: {
    fontSize: isMobile ? "1rem" : "1.2rem",
    color: "#888",
    marginBottom: "2rem"
  },
  downloadButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: isMobile ? "0.8rem 2rem" : "1rem 2.5rem",
    background: "transparent",
    border: "2px solid #00ff88",
    borderRadius: "8px",
    color: "#00ff88",
    fontSize: isMobile ? "1rem" : "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textDecoration: "none"
  },
  downloadIcon: {
    fontSize: isMobile ? "1.1rem" : "1.3rem"
  },
  resumeContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    background: "#121212",
    borderRadius: "12px",
    padding: isMobile ? "1rem" : "2rem",
    border: "1px solid rgba(0, 255, 136, 0.1)",
    boxShadow: "0 0 30px rgba(0, 255, 136, 0.05)"
  },
  resumeWrapper: {
    width: "100%",
    height: isMobile ? "60vh" : "80vh",
    minHeight: isMobile ? "400px" : "600px",
    borderRadius: "8px",
    overflow: "hidden",
    background: "#1a1a1a",
    border: "1px solid rgba(255, 255, 255, 0.1)"
  },
  resumeFrame: {
    width: "100%",
    height: "100%",
    border: "none",
    background: "white"
  },
  fallbackMessage: {
    marginTop: "1.5rem",
    textAlign: "center"
  },
  fallbackText: {
    color: "#888",
    fontSize: isMobile ? "0.8rem" : "0.9rem"
  },
  downloadLink: {
    color: "#00ff88",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.3s ease"
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
  },
  errorText: {
    textAlign: "center",
    color: "#888",
    fontSize: isMobile ? "0.9rem" : "1rem",
    padding: isMobile ? "0 1rem" : "0 2rem",
    marginTop: "1rem"
  }
});

export default function Resume() {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    api.get("/resume")
      .then(res => {
        console.log("Resume data received:", res.data);
        setResumeData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching resume data:", err);
        setError(`Failed to load resume information: ${err.message || 'Unknown error'}`);
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

  const handleDownload = () => {
    if (resumeData) {
      const link = document.createElement('a');
      link.href = resumeData.downloadUrl;
      link.download = resumeData.filename || 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const responsiveStyles = getResponsiveStyles(isMobile);

  if (loading) {
    return (
      <div style={responsiveStyles.page}>
        <div style={responsiveStyles.loading}>Loading resume...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={responsiveStyles.page}>
        <div style={responsiveStyles.error}>Error: {error}</div>
        <p style={responsiveStyles.errorText}>
          Please make sure your resume PDF is placed in the <code>frontend/public/resume/</code> folder
        </p>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div style={responsiveStyles.page}>
        <div style={responsiveStyles.loading}>Loading resume...</div>
      </div>
    );
  }

  const pdfUrl = resumeData.downloadUrl;

  return (
    <section style={responsiveStyles.page}>
      <div style={responsiveStyles.header}>
        <h1 style={responsiveStyles.heading}>My Resume</h1>
        <p style={responsiveStyles.subtitle}>
          Download or view my resume below
        </p>
        <button
          onClick={handleDownload}
          style={responsiveStyles.downloadButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#00ff88';
            e.currentTarget.style.color = '#0b0b0b';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 5px 20px rgba(0, 255, 136, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#00ff88';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <span style={responsiveStyles.downloadIcon}>📥</span>
          Download Resume
        </button>
      </div>

      <div style={responsiveStyles.resumeContainer}>
        <div style={responsiveStyles.resumeWrapper}>
          <iframe
            src={`${pdfUrl}#view=FitH`}
            style={responsiveStyles.resumeFrame}
            title="Resume PDF Viewer"
            type="application/pdf"
            onLoad={() => console.log("PDF iframe loaded")}
            onError={(e) => {
              console.error("Error loading PDF in iframe:", e);
            }}
          />
        </div>
        <div style={responsiveStyles.fallbackMessage}>
          <p style={responsiveStyles.fallbackText}>
            Having trouble viewing?{" "}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={responsiveStyles.downloadLink}
            >
              Open in new tab
            </a>
            {" or "}
            <a
              href={pdfUrl}
              download={resumeData.filename}
              style={responsiveStyles.downloadLink}
            >
              download directly
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
