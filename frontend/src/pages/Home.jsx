import {useEffect,useState} from 'react';
import api from '../api/client';

export default function Home(){
  const [p,setP]=useState(null);
  const [error,setError]=useState(null);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(()=>{
    api.get('/profile')
      .then(r=>{
        console.log('Profile data received:', r.data);
        setP(r.data);
      })
      .catch(err=>{
        console.error('Error fetching profile:', err);
        setError(`Failed to load profile data: ${err.message || 'Unknown error'}`);
      });
  },[]);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if(error) return <div style={{padding:'2rem',textAlign:'center',color:'#ff4444'}}>Error: {error}</div>;
  if(!p) return <div style={{padding:'2rem',textAlign:'center',color:'#ccc'}}>Loading...</div>;
  
  const containerStyle = {
    minHeight: '100vh',
    background: '#0b0b0b',
    color: 'white',
    position: 'relative',
    overflow: 'hidden'
  };
  
  const backgroundGlowStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    height: '800px',
    background: 'radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, rgba(0, 100, 200, 0.05) 50%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    zIndex: 0,
    pointerEvents: 'none'
  };

  const techIcons = ['🐍', '⚡', '🍃', '🐘', '🔴', '⚛️', '🔧', '💻', '🚀', '📊'];
  const codeSnippets = [
    'from fastapi import FastAPI',
    'app = FastAPI()',
    'def get_data():',
    'return {"status": "ok"}',
    'import pymongo',
    'db = client.database',
    'redis.set("key", "value")',
    'async def main():',
    'await process()',
    'class Microservice:'
  ];

  const techKeywords = ['Python', 'FastAPI', 'MongoDB', 'PostgreSQL', 'Redis', 'React', 'Docker', 'Git', 'Celery', 'Microservices', 'API', 'Backend', 'async', 'await', 'def', 'class', 'import', 'return'];
  
  const floatingKeywords = techKeywords.map((keyword, index) => ({
    text: keyword,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${index * 0.5}s`,
    fontSize: `${0.8 + Math.random() * 0.4}rem`,
    opacity: 0.1 + Math.random() * 0.2
  }));
  
  const contentStyle = {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: isMobile ? '1.5rem 1rem' : '2rem'
  };
  
  const heroSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '2rem' : '4rem',
    marginTop: isMobile ? '2rem' : '4rem',
    flexWrap: 'wrap',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'center'
  };
  
  const profilePicStyle = {
    width: isMobile ? '180px' : '250px',
    height: isMobile ? '180px' : '250px',
    borderRadius: '50%',
    border: '4px solid #00ff88',
    boxShadow: '0 0 40px rgba(0, 255, 136, 0.6)',
    objectFit: 'cover',
    flexShrink: 0,
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };
  
  const heroContentStyle = {
    flex: 1,
    minWidth: isMobile ? '100%' : '300px',
    textAlign: isMobile ? 'center' : 'left'
  };
  
  const greetingStyle = {
    fontSize: isMobile ? '1.3rem' : '1.8rem',
    color: '#888',
    marginBottom: '0.8rem',
    fontWeight: '300'
  };
  
  const nameStyle = {
    fontSize: isMobile ? '2.5rem' : '4rem',
    fontWeight: 'bold',
    color: '#00ff88',
    marginBottom: '1rem',
    textShadow: '0 0 30px rgba(0, 255, 136, 0.6)',
    background: 'linear-gradient(135deg, #00ff88, #00cc6a)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: '1.2'
  };
  
  const roleStyle = {
    fontSize: '1.5rem',
    color: '#ccc',
    marginBottom: '2rem',
    fontWeight: '400'
  };
  
  const tagsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: isMobile ? '0.6rem' : '0.8rem',
    marginBottom: '2rem',
    justifyContent: isMobile ? 'center' : 'flex-start'
  };
  
  const tagStyle = {
    padding: isMobile ? '0.4rem 0.8rem' : '0.5rem 1rem',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '20px',
    fontSize: isMobile ? '0.8rem' : '0.9rem',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'white'
  };
  
  const infoBlocksStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '3rem',
    alignItems: isMobile ? 'center' : 'flex-start'
  };
  
  const infoBlockStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: isMobile ? '0.6rem 1rem' : '0.8rem 1.2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.03)',
    width: isMobile ? '100%' : 'fit-content',
    maxWidth: isMobile ? '300px' : 'none'
  };
  
  const iconStyle = {
    fontSize: isMobile ? '1.2rem' : '1.5rem',
    color: '#ff4444',
    flexShrink: 0
  };
  
  const connectSectionStyle = {
    textAlign: 'center',
    marginTop: isMobile ? '2rem' : '3rem',
    padding: isMobile ? '0 1rem' : '0'
  };
  
  const connectTitleStyle = {
    fontSize: isMobile ? '1.2rem' : '1.5rem',
    marginBottom: '1.5rem',
    color: 'white'
  };
  
  const socialLinksStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: isMobile ? '0.8rem' : '1rem',
    flexWrap: 'wrap'
  };
  
  const getSocialIconStyle = (isHovered) => ({
    width: isMobile ? '45px' : '50px',
    height: isMobile ? '45px' : '50px',
    borderRadius: '50%',
    border: isHovered ? '1px solid #00ff88' : '1px solid rgba(255, 255, 255, 0.3)',
    background: isHovered ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 255, 255, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: isMobile ? '1.3rem' : '1.5rem',
    color: isHovered ? '#00ff88' : 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    transform: isHovered ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
    boxShadow: isHovered ? '0 0 20px rgba(0, 255, 136, 0.5)' : 'none'
  });
  
  const tagHoverStyle = {
    transition: 'all 0.3s ease'
  };
  
  const infoBlockHoverStyle = {
    transition: 'all 0.3s ease'
  };
  
  return (
    <div style={containerStyle}>
      <div style={backgroundGlowStyle}></div>
      
      {/* Grid Pattern Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
          linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      {/* Floating Tech Keywords */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.4
      }}>
        {techKeywords.map((keyword, idx) => (
          <div
            key={`keyword-${idx}`}
            style={{
              position: 'absolute',
              fontSize: `${0.8 + Math.random() * 0.4}rem`,
              color: '#00ff88',
              fontFamily: 'monospace',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatKeyword ${15 + idx * 2}s infinite ease-in-out`,
              animationDelay: `${idx * 0.5}s`,
              opacity: 0.1 + Math.random() * 0.2,
              textShadow: '0 0 10px rgba(0, 255, 136, 0.3)',
              whiteSpace: 'nowrap',
              transform: 'translate(-50%, -50%)'
            }}
          >
            {keyword}
          </div>
        ))}
      </div>

      {/* Tech Icons Floating */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        {techIcons.map((icon, idx) => (
          <div
            key={`icon-${idx}`}
            style={{
              position: 'absolute',
              fontSize: `${25 + Math.random() * 20}px`,
              color: `rgba(0, 255, 136, ${0.15 + Math.random() * 0.2})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatIcon ${20 + Math.random() * 15}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
              filter: 'blur(0.5px)',
              transform: 'translate(-50%, -50%)'
            }}
          >
            {icon}
          </div>
        ))}
      </div>

      {/* Code Snippets Floating */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.2
      }}>
        {codeSnippets.map((code, idx) => (
          <div
            key={`code-${idx}`}
            style={{
              position: 'absolute',
              fontSize: '0.85rem',
              color: '#00ff88',
              fontFamily: 'monospace',
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animation: `${idx % 2 === 0 ? 'driftCode' : 'driftCodeReverse'} ${25 + Math.random() * 15}s infinite linear`,
              animationDelay: `${Math.random() * 10}s`,
              whiteSpace: 'nowrap',
              transform: 'translate(-50%, -50%)',
              textShadow: '0 0 8px rgba(0, 255, 136, 0.4)'
            }}
          >
            {code}
          </div>
        ))}
      </div>

      <div style={contentStyle}>
        <div style={heroSectionStyle}>
          <div
            style={{
              position: 'relative',
              flexShrink: 0,
              width: '250px',
              height: '250px'
            }}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector('img');
              const fallback = e.currentTarget.querySelector('.profile-fallback');
              const element = img && img.style.display !== 'none' ? img : fallback;
              if(element) {
                element.style.transform = 'scale(1.05)';
                element.style.boxShadow = '0 0 50px rgba(0, 255, 136, 0.8)';
              }
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector('img');
              const fallback = e.currentTarget.querySelector('.profile-fallback');
              const element = img && img.style.display !== 'none' ? img : fallback;
              if(element) {
                element.style.transform = 'scale(1)';
                element.style.boxShadow = '0 0 40px rgba(0, 255, 136, 0.6)';
              }
            }}
          >
            <img
              src="/images/profile/profile.jpg.jpeg"
              alt={p.name}
              style={{
                ...profilePicStyle,
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 2
              }}
              onError={(e) => {
                console.error('Profile image not found, trying alternative formats...');
                const img = e.target;
                const formats = ['profile.jpg', 'profile.png', 'profile.jpeg', 'profile.webp', 'profile.JPG', 'profile.PNG'];
                const currentSrc = img.src.split('/').pop();
                const currentIndex = formats.findIndex(f => currentSrc.toLowerCase().includes(f.split('.').pop().toLowerCase()));
                
                if (currentIndex < formats.length - 1) {
                  const nextFormat = formats[currentIndex + 1];
                  img.src = `/images/profile/${nextFormat}`;
                } else {
                  console.error('No profile image found, using fallback');
                  img.style.display = 'none';
                  const fallback = img.parentElement.querySelector('.profile-fallback');
                  if(fallback) {
                    fallback.style.display = 'flex';
                    fallback.style.zIndex = 2;
                  }
                }
              }}
              onLoad={(e) => {
                const fallback = e.target.parentElement.querySelector('.profile-fallback');
                if(fallback) {
                  fallback.style.display = 'none';
                }
                console.log('Profile image loaded successfully');
              }}
            />
            <div
              className="profile-fallback"
              style={{
                ...profilePicStyle,
                display: 'none',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
                fontWeight: 'bold',
                color: 'white',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1
              }}
            >
              {p.initials || p.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <div style={heroContentStyle}>
            <div style={greetingStyle}>Hi, I'm</div>
            <h1 style={nameStyle}>{p.name}</h1>
            
            <div style={tagsContainerStyle}>
              {(p.skillTags || []).map((tag, idx) => (
                <span 
                  key={idx} 
                  style={{
                    ...tagStyle,
                    ...tagHoverStyle,
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#00ff88';
                    e.currentTarget.style.background = 'rgba(0, 255, 136, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div style={infoBlocksStyle}>
              <div 
                style={{
                  ...infoBlockStyle,
                  ...infoBlockHoverStyle,
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#00ff88';
                  e.currentTarget.style.background = 'rgba(0, 255, 136, 0.1)';
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <span style={iconStyle}>📍</span>
                <span>{p.location}</span>
              </div>
              <div 
                style={{
                  ...infoBlockStyle,
                  ...infoBlockHoverStyle,
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#00ff88';
                  e.currentTarget.style.background = 'rgba(0, 255, 136, 0.1)';
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <span style={iconStyle}>💼</span>
                <span>{p.expertise || p.role}</span>
              </div>
              <div 
                style={{
                  ...infoBlockStyle,
                  ...infoBlockHoverStyle,
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#00ff88';
                  e.currentTarget.style.background = 'rgba(0, 255, 136, 0.1)';
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <span style={iconStyle}>✉️</span>
                <span>{p.email}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div style={connectSectionStyle}>
          <h2 style={connectTitleStyle}>Connect</h2>
          <div style={socialLinksStyle}>
            {p.socialLinks?.github && (
              <a 
                href={p.socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={getSocialIconStyle(hoveredIcon === 'github')} 
                title="GitHub"
                onMouseEnter={() => setHoveredIcon('github')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                🔗
              </a>
            )}
            {p.socialLinks?.linkedin && (
              <a 
                href={p.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={getSocialIconStyle(hoveredIcon === 'linkedin')} 
                title="LinkedIn"
                onMouseEnter={() => setHoveredIcon('linkedin')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                💼
              </a>
            )}
            {p.socialLinks?.email && (
              <a 
                href={`mailto:${p.socialLinks.email}`} 
                style={getSocialIconStyle(hoveredIcon === 'email')} 
                title="Email"
                onMouseEnter={() => setHoveredIcon('email')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                ✉️
              </a>
            )}
            {p.socialLinks?.whatsapp && (
              <a 
                href={`https://wa.me/${p.socialLinks.whatsapp.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={getSocialIconStyle(hoveredIcon === 'whatsapp')} 
                title="WhatsApp"
                onMouseEnter={() => setHoveredIcon('whatsapp')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                💬
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Add CSS animations for developer background effects
if (typeof document !== 'undefined' && !document.getElementById('home-dev-animations')) {
  const styleSheet = document.createElement("style");
  styleSheet.id = 'home-dev-animations';
  styleSheet.textContent = `
    @keyframes floatKeyword {
      0%, 100% {
        transform: translateY(0px) translateX(0px);
        opacity: 0.3;
      }
      25% {
        transform: translateY(-20px) translateX(10px);
        opacity: 0.5;
      }
      50% {
        transform: translateY(-40px) translateX(-10px);
        opacity: 0.4;
      }
      75% {
        transform: translateY(-20px) translateX(5px);
        opacity: 0.5;
      }
    }
    
    @keyframes floatIcon {
      0%, 100% {
        transform: translate(-50%, -50%) translateY(0px) rotate(0deg);
        opacity: 0.2;
      }
      50% {
        transform: translate(-50%, -50%) translateY(-50px) rotate(180deg);
        opacity: 0.4;
      }
    }
    
    @keyframes driftCode {
      0% {
        transform: translate(-50%, -50%) translate(0px, 0px);
        opacity: 0;
      }
      10% {
        opacity: 0.3;
      }
      90% {
        opacity: 0.3;
      }
      100% {
        transform: translate(-50%, -50%) translate(200px, 100px);
        opacity: 0;
      }
    }
    
    @keyframes driftCodeReverse {
      0% {
        transform: translate(-50%, -50%) translate(0px, 0px);
        opacity: 0;
      }
      10% {
        opacity: 0.3;
      }
      90% {
        opacity: 0.3;
      }
      100% {
        transform: translate(-50%, -50%) translate(-200px, -100px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(styleSheet);
}
