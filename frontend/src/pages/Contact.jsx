import { useState, useEffect } from "react";

export default function Contact() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const contactInfo = [
    {
      icon: "✉️",
      label: "Email",
      value: "shaileshmalkar557@gmail.com",
      link: "mailto:shaileshmalkar557@gmail.com",
      color: "#00ff88"
    },
    {
      icon: "📱",
      label: "Phone",
      value: "+91-9372805789",
      link: "tel:+919372805789",
      color: "#00ff88"
    },
    {
      icon: "📍",
      label: "Location",
      value: "Mumbai, India",
      link: "https://maps.google.com/?q=Mumbai,India",
      color: "#00ff88"
    }
  ];

  const responsiveStyles = getResponsiveStyles(isMobile);

  return (
    <section style={responsiveStyles.page}>
      <div style={responsiveStyles.container}>
        <h1 style={responsiveStyles.heading}>Get In Touch</h1>
        <p style={responsiveStyles.subtitle}>
          Let's connect and discuss opportunities
        </p>

        <div style={responsiveStyles.contactGrid}>
          {contactInfo.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target={item.link.startsWith('http') ? '_blank' : '_self'}
              rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
              style={{
                ...responsiveStyles.contactCard,
                borderColor: hoveredItem === index ? item.color : 'rgba(0, 255, 136, 0.2)',
                transform: hoveredItem === index ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: hoveredItem === index 
                  ? `0 10px 40px rgba(0, 255, 136, 0.3)` 
                  : '0 5px 20px rgba(0, 255, 136, 0.1)'
              }}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div style={{
                ...responsiveStyles.iconContainer,
                background: hoveredItem === index 
                  ? `linear-gradient(135deg, ${item.color}20, ${item.color}10)` 
                  : `rgba(0, 255, 136, 0.05)`
              }}>
                <span style={responsiveStyles.icon}>{item.icon}</span>
              </div>
              <h3 style={responsiveStyles.label}>{item.label}</h3>
              <p style={responsiveStyles.value}>{item.value}</p>
              <div style={{
                ...responsiveStyles.hoverIndicator,
                width: hoveredItem === index ? '60px' : '0px',
                opacity: hoveredItem === index ? 1 : 0
              }} />
            </a>
          ))}
        </div>

        <div style={responsiveStyles.socialSection}>
          <p style={responsiveStyles.socialText}>Connect with me on</p>
          <div style={responsiveStyles.socialLinks}>
            <a
              href="https://www.linkedin.com/in/shailesh-malkar"
              target="_blank"
              rel="noopener noreferrer"
              style={responsiveStyles.socialButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 119, 181, 0.2)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 119, 181, 0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              💼 LinkedIn
            </a>
            <a
              href="mailto:shaileshmalkar557@gmail.com"
              style={responsiveStyles.socialButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 255, 136, 0.2)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 255, 136, 0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ✉️ Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const getResponsiveStyles = (isMobile) => ({
  page: {
    minHeight: "100vh",
    background: "#0b0b0b",
    color: "white",
    padding: isMobile ? "2rem 1rem" : "4rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden"
  },
  container: {
    maxWidth: "1200px",
    width: "100%",
    textAlign: "center",
    position: "relative",
    zIndex: 1
  },
  heading: {
    fontSize: isMobile ? "2.5rem" : "4rem",
    fontWeight: "bold",
    color: "#00ff88",
    marginBottom: "1rem",
    textShadow: "0 0 30px rgba(0, 255, 136, 0.5)",
    background: "linear-gradient(135deg, #00ff88, #00cc6a)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  },
  subtitle: {
    fontSize: isMobile ? "1rem" : "1.3rem",
    color: "#888",
    marginBottom: isMobile ? "2rem" : "4rem"
  },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
    gap: isMobile ? "1.5rem" : "2rem",
    marginBottom: isMobile ? "2rem" : "4rem"
  },
  contactCard: {
    background: "rgba(18, 18, 18, 0.8)",
    padding: isMobile ? "1.5rem" : "2.5rem",
    borderRadius: "20px",
    border: "2px solid rgba(0, 255, 136, 0.2)",
    textDecoration: "none",
    color: "white",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
    backdropFilter: "blur(10px)"
  },
  iconContainer: {
    width: isMobile ? "60px" : "100px",
    height: isMobile ? "60px" : "100px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.5rem auto",
    transition: "all 0.3s ease",
    border: "2px solid rgba(0, 255, 136, 0.3)"
  },
  icon: {
    fontSize: isMobile ? "2rem" : "3rem",
    filter: "drop-shadow(0 0 10px rgba(0, 255, 136, 0.5))"
  },
  label: {
    fontSize: isMobile ? "1rem" : "1.3rem",
    fontWeight: "600",
    color: "#00ff88",
    marginBottom: "1rem",
    textTransform: "uppercase",
    letterSpacing: "2px"
  },
  value: {
    fontSize: isMobile ? "0.9rem" : "1.1rem",
    color: "#e0e0e0",
    margin: 0,
    wordBreak: "break-word"
  },
  hoverIndicator: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    height: "3px",
    background: "linear-gradient(90deg, transparent, #00ff88, transparent)",
    borderRadius: "2px",
    transition: "all 0.3s ease"
  },
  socialSection: {
    marginTop: isMobile ? "2rem" : "4rem",
    padding: isMobile ? "1.5rem" : "2rem",
    background: "rgba(0, 255, 136, 0.05)",
    borderRadius: "15px",
    border: "1px solid rgba(0, 255, 136, 0.2)"
  },
  socialText: {
    fontSize: isMobile ? "0.95rem" : "1.1rem",
    color: "#888",
    marginBottom: "1.5rem"
  },
  socialLinks: {
    display: "flex",
    gap: isMobile ? "1rem" : "1.5rem",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  socialButton: {
    padding: isMobile ? "0.7rem 1.5rem" : "0.8rem 2rem",
    background: "rgba(0, 255, 136, 0.1)",
    border: "2px solid rgba(0, 255, 136, 0.3)",
    borderRadius: "10px",
    color: "#00ff88",
    textDecoration: "none",
    fontSize: isMobile ? "0.9rem" : "1rem",
    fontWeight: "500",
    transition: "all 0.3s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem"
  }
});

