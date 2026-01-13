import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Skills from './pages/Skills';
import Blog from './pages/Blog';
import Resume from './pages/Resume';
import AboutMe from './pages/AboutMe';
import Contact from './pages/Contact';

export default function App(){
  const [activePage, setActivePage] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const navStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(11, 11, 11, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(0, 255, 136, 0.1)',
    padding: isMobile ? '1rem' : '1.2rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    width: '100%',
    boxSizing: 'border-box'
  };
  
  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '0.3rem' : '0.6rem',
    fontSize: isMobile ? '1.2rem' : '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    cursor: 'pointer',
    flexShrink: 0
  };
  
  const logoInitialsStyle = {
    fontSize: isMobile ? '1.4rem' : '1.8rem',
    fontWeight: 'bold',
    color: 'white'
  };
  
  const logoNameStyle = {
    fontSize: isMobile ? '0.85rem' : '1.1rem',
    color: 'white',
    fontWeight: 'normal',
    display: isMobile ? 'none' : 'inline'
  };
  
  const logoTagsStyle = {
    fontSize: isMobile ? '0.7rem' : '0.9rem',
    color: '#888',
    fontWeight: 'normal',
    display: isMobile ? 'none' : 'inline'
  };
  
  const navLinksStyle = {
    display: isMobile && !isMobileMenuOpen ? 'none' : 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '1rem' : '2rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: isMobile ? 'absolute' : 'relative',
    top: isMobile ? '100%' : 'auto',
    left: isMobile ? 0 : 'auto',
    right: isMobile ? 0 : 'auto',
    background: isMobile ? 'rgba(11, 11, 11, 0.98)' : 'transparent',
    width: isMobile ? '100%' : 'auto',
    padding: isMobile ? '1.5rem' : 0,
    borderTop: isMobile ? '1px solid rgba(0, 255, 136, 0.1)' : 'none',
    boxShadow: isMobile ? '0 4px 20px rgba(0, 0, 0, 0.5)' : 'none'
  };
  
  const navLinkStyle = {
    color: '#ccc',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    borderBottom: '2px solid transparent',
    paddingBottom: '0.3rem',
    fontSize: isMobile ? '1rem' : '1.1rem',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    position: 'relative',
    width: isMobile ? '100%' : 'auto',
    textAlign: isMobile ? 'center' : 'left',
    padding: isMobile ? '0.5rem' : '0'
  };
  
  const activeLinkStyle = {
    ...navLinkStyle,
    color: '#00ff88',
    borderBottomColor: '#00ff88'
  };
  
  const getNavLinkStyle = (isActive) => ({
    ...(isActive ? activeLinkStyle : navLinkStyle)
  });
  
  const handleNavClick = (page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const NavLink = ({ page, label }) => (
    <li style={{ width: isMobile ? '100%' : 'auto' }}>
      <a 
        style={getNavLinkStyle(activePage === page)} 
        onClick={() => handleNavClick(page)}
        onMouseEnter={(e) => {
          if (activePage !== page) {
            e.currentTarget.style.color = '#00ff88';
            e.currentTarget.style.borderBottomColor = '#00ff88';
          }
        }}
        onMouseLeave={(e) => {
          if (activePage !== page) {
            e.currentTarget.style.color = '#ccc';
            e.currentTarget.style.borderBottomColor = 'transparent';
          }
        }}
      >
        {label}
      </a>
    </li>
  );
  
  const hamburgerStyle = {
    display: isMobile ? 'flex' : 'none',
    flexDirection: 'column',
    gap: '4px',
    cursor: 'pointer',
    padding: '0.5rem',
    background: 'transparent',
    border: 'none'
  };
  
  const hamburgerLineStyle = {
    width: '25px',
    height: '3px',
    background: isMobileMenuOpen ? '#00ff88' : '#ccc',
    transition: 'all 0.3s ease',
    borderRadius: '2px'
  };
  
  const PlaceholderPage = ({ title }) => (
    <div style={{
      padding: isMobile ? '2rem 1rem' : '4rem 2rem',
      textAlign: 'center',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: isMobile ? '2rem' : '2.5rem', color: '#00ff88', marginBottom: '1rem' }}>{title}</h1>
      <p style={{ color: '#ccc', fontSize: isMobile ? '1rem' : '1.1rem' }}>This section is coming soon...</p>
    </div>
  );
  
  const pages = {
    'Home': <Home />,
    'Skills': <Skills />,
    'Blog': <Blog />,
    'Resume': <Resume />,
    'About me': <AboutMe />,
    'Contact': <Contact />
  };
  
  return (
    <div style={{background:'#0b0b0b',color:'white',minHeight:'100vh'}}>
      <nav style={navStyle}>
        <div style={logoStyle} onClick={() => handleNavClick('Home')}>
          <span style={logoInitialsStyle}>SSM</span>
          <span style={logoNameStyle}>Shailesh S Malkar</span>
          <span style={logoTagsStyle}>• Python • FastAPI • Backend</span>
        </div>
        <button
          style={hamburgerStyle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span style={{...hamburgerLineStyle, transform: isMobileMenuOpen ? 'rotate(45deg) translate(8px, 8px)' : 'none'}}></span>
          <span style={{...hamburgerLineStyle, opacity: isMobileMenuOpen ? 0 : 1}}></span>
          <span style={{...hamburgerLineStyle, transform: isMobileMenuOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none'}}></span>
        </button>
        <ul style={navLinksStyle}>
          <NavLink page="Home" label="Home" />
          <NavLink page="Skills" label="Skills" />
          <NavLink page="Blog" label="Blog" />
          <NavLink page="Resume" label="Resume" />
          <NavLink page="About me" label="About me" />
          <NavLink page="Contact" label="Contact" />
        </ul>
      </nav>
      {pages[activePage]}
    </div>
  );
}
