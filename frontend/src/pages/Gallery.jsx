import {useEffect,useState} from 'react';
import api from '../api/client';

export default function Gallery(){
  const [images,setImages]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  const [selectedImage,setSelectedImage]=useState(null);
  
  useEffect(()=>{
    api.get('/gallery')
      .then(r=>{
        setImages(r.data);
        setLoading(false);
      })
      .catch(err=>{
        console.error('Error fetching gallery:', err);
        setError('Failed to load gallery images');
        setLoading(false);
      });
  },[]);
  
  const containerStyle = {
    minHeight: '100vh',
    background: '#0b0b0b',
    color: 'white',
    padding: '4rem 2rem',
    position: 'relative'
  };
  
  const titleStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#00ff88',
    textAlign: 'center',
    marginBottom: '3rem',
    textShadow: '0 0 20px rgba(0, 255, 136, 0.5)'
  };
  
  const galleryGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
    maxWidth: '1400px',
    margin: '0 auto'
  };
  
  const imageCardStyle = {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(255, 255, 255, 0.05)'
  };
  
  const imageStyle = {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.3s ease'
  };
  
  const imageOverlayStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
    padding: '1rem',
    transform: 'translateY(100%)',
    transition: 'transform 0.3s ease'
  };
  
  const imageTitleStyle = {
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  };
  
  const imageDescriptionStyle = {
    color: '#ccc',
    fontSize: '0.9rem'
  };
  
  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '2rem'
  };
  
  const modalImageStyle = {
    maxWidth: '90%',
    maxHeight: '90%',
    objectFit: 'contain',
    borderRadius: '8px'
  };
  
  const closeButtonStyle = {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    background: 'rgba(0, 255, 136, 0.2)',
    border: '2px solid #00ff88',
    color: '#00ff88',
    fontSize: '1.5rem',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  };
  
  if(loading) return <div style={containerStyle}><div style={{textAlign:'center',color:'#ccc'}}>Loading gallery...</div></div>;
  if(error) return <div style={containerStyle}><div style={{textAlign:'center',color:'#ff4444'}}>Error: {error}</div></div>;
  
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Gallery</h1>
      
      {images.length === 0 ? (
        <div style={{textAlign:'center',color:'#888',fontSize:'1.2rem',padding:'4rem'}}>
          No images in gallery yet. Add images to the backend API to see them here.
        </div>
      ) : (
        <div style={galleryGridStyle}>
          {images.map((img, idx) => (
            <div
              key={idx}
              style={imageCardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = '#00ff88';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.3)';
                const overlay = e.currentTarget.querySelector('.overlay');
                if(overlay) overlay.style.transform = 'translateY(0)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
                const overlay = e.currentTarget.querySelector('.overlay');
                if(overlay) overlay.style.transform = 'translateY(100%)';
              }}
              onClick={() => setSelectedImage(img)}
            >
              <img 
                src={img.url} 
                alt={img.title || `Gallery image ${idx + 1}`}
                style={imageStyle}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x250/0b0b0b/00ff88?text=Image+Not+Found';
                }}
              />
              {(img.title || img.description) && (
                <div className="overlay" style={imageOverlayStyle}>
                  {img.title && <div style={imageTitleStyle}>{img.title}</div>}
                  {img.description && <div style={imageDescriptionStyle}>{img.description}</div>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {selectedImage && (
        <div style={modalStyle} onClick={() => setSelectedImage(null)}>
          <button 
            style={closeButtonStyle}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 255, 136, 0.4)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 255, 136, 0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ×
          </button>
          <img 
            src={selectedImage.url} 
            alt={selectedImage.title || 'Gallery image'}
            style={modalImageStyle}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

