import { useEffect, useState } from "react";
import api from "../api/client";

export default function Blog() {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    api.get("/blog")
      .then(res => {
        setBlogData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog posts");
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
        <div style={responsiveStyles.loading}>Loading blog posts...</div>
      </div>
    );
  }

  if (error || !blogData) {
    return (
      <div style={responsiveStyles.page}>
        <div style={responsiveStyles.error}>Error: {error || "Failed to load blog"}</div>
      </div>
    );
  }

  return (
    <section style={responsiveStyles.page}>
      <div style={responsiveStyles.header}>
        <h1 style={responsiveStyles.heading}>My Blog</h1>
        <p style={responsiveStyles.subtitle}>
          Sharing insights on backend development, FastAPI, and software engineering
        </p>
        <a
          href={blogData.linkedinProfile}
          target="_blank"
          rel="noopener noreferrer"
          style={responsiveStyles.linkedinButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 119, 181, 0.2)';
            e.currentTarget.style.borderColor = '#0077b5';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 119, 181, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(0, 119, 181, 0.5)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span style={responsiveStyles.linkedinIcon}>💼</span>
          Follow me on LinkedIn
        </a>
      </div>

      <div style={responsiveStyles.postsContainer}>
        {blogData.posts && blogData.posts.length > 0 ? (
          blogData.posts.map((post, index) => (
            <div key={index} style={responsiveStyles.postCard}>
              <div style={responsiveStyles.postHeader}>
                <span style={responsiveStyles.postType}>{post.type === "article" ? "📝 Article" : "💬 Post"}</span>
                <span style={responsiveStyles.postDate}>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <h3 style={responsiveStyles.postTitle}>{post.title}</h3>
              <p style={responsiveStyles.postDescription}>{post.description}</p>
              <a
                href={post.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={responsiveStyles.readMoreButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#00ff88';
                  e.currentTarget.style.color = '#0b0b0b';
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#00ff88';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                Read on LinkedIn →
              </a>
            </div>
          ))
        ) : (
          <div style={responsiveStyles.noPosts}>
            <p>No blog posts available yet. Check back soon!</p>
            <a
              href={blogData.linkedinProfile}
              target="_blank"
              rel="noopener noreferrer"
              style={responsiveStyles.linkedinButton}
            >
              Visit my LinkedIn
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

const getResponsiveStyles = (isMobile) => ({
  page: {
    padding: isMobile ? "2rem 1rem" : "4rem 2rem",
    background: "#0b0b0b",
    minHeight: "100vh",
    color: "white",
    maxWidth: "1200px",
    margin: "0 auto"
  },
  header: {
    textAlign: "center",
    marginBottom: isMobile ? "2rem" : "4rem"
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
  linkedinButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: isMobile ? "0.7rem 1.5rem" : "0.8rem 2rem",
    background: "rgba(0, 119, 181, 0.1)",
    border: "2px solid rgba(0, 119, 181, 0.5)",
    borderRadius: "8px",
    color: "#0077b5",
    textDecoration: "none",
    fontSize: isMobile ? "0.9rem" : "1rem",
    fontWeight: "500",
    transition: "all 0.3s ease",
    cursor: "pointer"
  },
  linkedinIcon: {
    fontSize: isMobile ? "1rem" : "1.2rem"
  },
  postsContainer: {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(350px, 1fr))",
    gap: isMobile ? "1.5rem" : "2rem"
  },
  postCard: {
    background: "#121212",
    padding: isMobile ? "1.5rem" : "2rem",
    borderRadius: "12px",
    border: "1px solid rgba(0, 255, 136, 0.1)",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  },
  postHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
    flexWrap: isMobile ? "wrap" : "nowrap",
    gap: isMobile ? "0.5rem" : "0"
  },
  postType: {
    fontSize: isMobile ? "0.75rem" : "0.85rem",
    color: "#00ff88",
    fontWeight: "500"
  },
  postDate: {
    fontSize: isMobile ? "0.75rem" : "0.85rem",
    color: "#888"
  },
  postTitle: {
    fontSize: isMobile ? "1.2rem" : "1.5rem",
    fontWeight: "bold",
    color: "white",
    margin: "0.5rem 0"
  },
  postDescription: {
    fontSize: isMobile ? "0.9rem" : "1rem",
    color: "#ccc",
    lineHeight: "1.6",
    flex: 1
  },
  readMoreButton: {
    display: "inline-block",
    padding: isMobile ? "0.5rem 1.2rem" : "0.6rem 1.5rem",
    background: "transparent",
    border: "2px solid #00ff88",
    borderRadius: "6px",
    color: "#00ff88",
    textDecoration: "none",
    fontSize: isMobile ? "0.85rem" : "0.9rem",
    fontWeight: "500",
    transition: "all 0.3s ease",
    width: "fit-content",
    marginTop: "auto"
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
  noPosts: {
    textAlign: "center",
    color: "#888",
    padding: isMobile ? "2rem" : "4rem",
    gridColumn: "1 / -1"
  }
});

