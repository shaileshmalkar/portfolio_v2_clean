import { useEffect, useState } from "react";
import api from "../api/client";

// Icon mapping for skills
const skillIcons = {
  "Python": "🐍",
  "C": "C",
  "C++": "C++",
  "Java": "☕",
  "HTML": "🌐",
  "CSS": "🎨",
  "JavaScript": "📜",
  "React": "⚛️",
  "MongoDB": "🍃",
  "PostgreSQL": "🐘",
  "MySQL": "🗄️",
  "Git": "🔀",
  "Redis": "🔴",
  "FastAPI": "⚡",
  "Django": "🐍",
  "Celery": "🌿",
  "Microservices": "🔧",
  "Data Structures & Algorithms": "📊",
  "System Design": "🏗️",
  "API Design": "🔌",
  "Scalable Backend Systems": "⚙️",
  "Teamwork": "👥",
  "Problem Solving": "🧩",
  "Communication": "💬",
  "Adaptability": "🔄"
};

// Icon URLs for skills (using devicons)
const skillIconUrls = {
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "C": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "Redis": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  "FastAPI": "https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png",
  "Django": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  "Celery": "https://docs.celeryproject.org/en/stable/_static/celery_512.png"
};

export default function Skills() {
  const [skills, setSkills] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    api.get("/skills").then(res => setSkills(res.data));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get all skills as a flat array for the original animation
  const allSkills = Object.values(skills).flat();

  const styles = getResponsiveStyles(isMobile);

  return (
    <section style={styles.page}>
      <h1 style={styles.heading}>My Skills</h1>
      <p style={styles.description}>
        Technical expertise blended with creativity — explore my core competencies below.
      </p>

      {/* Original Animation Section - Scattered Circular Icons */}
      <div style={styles.originalSection}>
        <h2 style={styles.sectionTitle}>Skills Overview</h2>
        <div style={styles.originalContainer}>
          {allSkills.map((skill, idx) => {
            const iconUrl = skillIconUrls[skill];
            const emojiIcon = skillIcons[skill] || "💻";
            
            return (
              <div
                key={`original-${skill}-${idx}`}
                style={{
                  ...styles.originalSkillItem,
                  animationDelay: `${idx * 0.1}s`
                }}
                onMouseEnter={(e) => {
                  const circle = e.currentTarget.querySelector('.icon-circle');
                  if(circle) {
                    circle.style.borderColor = '#00ff88';
                    circle.style.background = 'rgba(0, 255, 136, 0.15)';
                    circle.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.6)';
                    circle.style.transform = 'scale(1.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  const circle = e.currentTarget.querySelector('.icon-circle');
                  if(circle) {
                    circle.style.borderColor = 'rgba(0, 255, 136, 0.3)';
                    circle.style.background = 'rgba(0, 255, 136, 0.05)';
                    circle.style.boxShadow = '0 0 0 rgba(0, 255, 136, 0)';
                    circle.style.transform = 'scale(1)';
                  }
                }}
              >
                <div className="icon-circle" style={styles.originalIconCircle}>
                  {iconUrl ? (
                    <img 
                      src={iconUrl} 
                      alt={skill}
                      style={styles.originalIconImage}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = e.target.parentElement.querySelector('.icon-fallback');
                        if(fallback) fallback.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <span 
                    className="icon-fallback"
                    style={{
                      display: iconUrl ? 'none' : 'block',
                      fontSize: '2.5rem'
                    }}
                  >
                    {emojiIcon}
                  </span>
                </div>
                <div style={styles.originalSkillName}>{skill}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Categorized Cards Section */}
      <div style={styles.categorizedSection}>
        <h2 style={styles.sectionTitle}>Skills by Category</h2>
        <div style={styles.grid}>
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} style={styles.card}>
              <h3 style={styles.cardTitle}>{category}</h3>
              <div style={styles.skillsContainer}>
                {items.map(skill => {
                  const iconUrl = skillIconUrls[skill];
                  const emojiIcon = skillIcons[skill] || "💻";
                  
                  return (
                    <div key={skill} style={styles.skillItem}>
                      <div 
                        className="icon-circle"
                        style={styles.iconCircle}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#00ff88';
                          e.currentTarget.style.background = 'rgba(0, 255, 136, 0.15)';
                          e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.6)';
                          e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)';
                          e.currentTarget.style.background = 'rgba(0, 255, 136, 0.05)';
                          e.currentTarget.style.boxShadow = '0 0 0 rgba(0, 255, 136, 0)';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        {iconUrl ? (
                          <img 
                            src={iconUrl} 
                            alt={skill}
                            style={styles.iconImage}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              const fallback = e.target.parentElement.querySelector('.icon-fallback');
                              if(fallback) fallback.style.display = 'block';
                            }}
                          />
                        ) : null}
                        <span 
                          className="icon-fallback"
                          style={{
                            display: iconUrl ? 'none' : 'block',
                            fontSize: '2rem'
                          }}
                        >
                          {emojiIcon}
                        </span>
                      </div>
                      <div style={styles.skillName}>{skill}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const getResponsiveStyles = (isMobile) => {
  return {
    page: {
      padding: isMobile ? "40px 20px" : "80px 40px",
      background: "#0b0b0b",
      minHeight: "100vh",
      color: "white"
    },
    heading: {
      fontSize: isMobile ? "2rem" : "3rem",
      marginBottom: "1rem",
      textAlign: "center",
      color: "white",
      fontWeight: "bold"
    },
    description: {
      fontSize: isMobile ? "0.95rem" : "1.1rem",
      color: "#888",
      textAlign: "center",
      marginBottom: "4rem",
      maxWidth: "600px",
      margin: "0 auto 4rem auto",
      padding: isMobile ? "0 1rem" : "0"
    },
    sectionTitle: {
      fontSize: isMobile ? "1.4rem" : "1.8rem",
      marginBottom: "1.5rem",
      textAlign: "center",
      color: "#00ff88",
      fontWeight: "bold"
    },
    // Original Animation Styles
    originalSection: {
      marginBottom: "4rem",
      padding: "1.5rem 0"
    },
    originalContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: isMobile ? "1rem" : "2rem",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isMobile ? "1rem" : "1.5rem"
    },
    originalSkillItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.6rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      animation: "fadeInUp 0.6s ease forwards",
      opacity: 0
    },
    originalIconCircle: {
      width: isMobile ? "70px" : "90px",
      height: isMobile ? "70px" : "90px",
      borderRadius: "50%",
      border: "2px solid rgba(0, 255, 136, 0.3)",
      background: "rgba(0, 255, 136, 0.05)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      transition: "all 0.3s ease",
      boxShadow: "0 0 0 rgba(0, 255, 136, 0)",
      overflow: "hidden"
    },
    originalIconImage: {
      width: isMobile ? "40px" : "50px",
      height: isMobile ? "40px" : "50px",
      objectFit: "contain"
    },
    originalSkillName: {
      fontSize: isMobile ? "0.75rem" : "0.85rem",
      color: "#ccc",
      fontWeight: "400",
      textAlign: "center",
      maxWidth: "100px"
    },
    // Categorized Cards Styles
    categorizedSection: {
      marginTop: "4rem"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
      gap: isMobile ? "20px" : "30px",
      maxWidth: "1400px",
      margin: "0 auto"
    },
    card: {
      background: "#121212",
      padding: isMobile ? "20px" : "24px",
      borderRadius: "12px",
      boxShadow: "0 0 20px rgba(0,255,136,0.05)",
      border: "1px solid rgba(0, 255, 136, 0.1)"
    },
    cardTitle: {
      marginBottom: "20px",
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: "bold",
      color: "#00ff88",
      borderBottom: "2px solid rgba(0, 255, 136, 0.3)",
      paddingBottom: "10px"
    },
    skillsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: isMobile ? "15px" : "20px",
      justifyContent: "flex-start"
    },
    skillItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.5rem",
      minWidth: isMobile ? "70px" : "80px"
    },
    iconCircle: {
      width: isMobile ? "60px" : "80px",
      height: isMobile ? "60px" : "80px",
      borderRadius: "50%",
      border: "3px solid rgba(0, 255, 136, 0.3)",
      background: "rgba(0, 255, 136, 0.05)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      transition: "all 0.3s ease",
      boxShadow: "0 0 0 rgba(0, 255, 136, 0)",
      overflow: "hidden",
      cursor: "pointer"
    },
    iconImage: {
      width: isMobile ? "35px" : "50px",
      height: isMobile ? "35px" : "50px",
      objectFit: "contain"
    },
    skillName: {
      fontSize: isMobile ? "10px" : "12px",
      color: "#ccc",
      textAlign: "center",
      maxWidth: "100px",
      wordBreak: "break-word"
    }
  };
};

// Add CSS animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(styleSheet);
