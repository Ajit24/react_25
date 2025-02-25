import React, { useState, useRef, useEffect } from 'react';

const LinkPreviewer = ({ url, children }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const linkRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    const updatePosition = () => {
      if (linkRef.current && showPreview) {
        const rect = linkRef.current.getBoundingClientRect();
        const previewRect = previewRef.current?.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        
        let xPos = rect.left;
        // Adjust x position if preview would go off screen
        if (previewRect && xPos + previewRect.width > viewportWidth) {
          xPos = viewportWidth - previewRect.width - 20;
        }

        setPosition({
          x: xPos,
          y: rect.bottom + window.scrollY + 8
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [showPreview]);

  const handleMouseEnter = () => {
    setShowPreview(true);
  };

  const handleMouseLeave = (e) => {
    const previewElement = previewRef.current;
    const linkElement = linkRef.current;
    
    if (previewElement) {
      const previewRect = previewElement.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Check if mouse is within the preview area
      const isInPreview = 
        mouseX >= previewRect.left &&
        mouseX <= previewRect.right &&
        mouseY >= previewRect.top &&
        mouseY <= previewRect.bottom;

      // Only hide preview if mouse is not over preview or link
      if (!isInPreview && e.target === linkElement) {
        setShowPreview(false);
      }
    } else {
      setShowPreview(false);
    }
  };

  return (
    <div className="link-previewer-container">
      <a
        ref={linkRef}
        href={url}
        className="link-content"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
      {showPreview && (
        <div
          ref={previewRef}
          className="preview-overlay"
          style={{
            top: `${position.y}px`,
            left: `${position.x}px`
          }}
          onMouseLeave={() => setShowPreview(false)}
        >
          <div className="preview-content">
            <iframe
              src={url}
              title="Link Preview"
              className="preview-iframe"
            />
          </div>
          <div className="preview-url">{url}</div>
        </div>
      )}
    </div>
  );
};

// Example usage component
const LinkPreviewerExample = () => {
  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem'
  };

  const cardStyle = {
    background: 'white',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%'
  };

  const titleStyle = {
    marginBottom: '16px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333'
  };

  const linksContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Link Preview Examples</h2>
        <div style={linksContainerStyle}>
          <LinkPreviewer url="https://react.dev">
            React Documentation
          </LinkPreviewer>
          <LinkPreviewer url="https://github.com">
            GitHub
          </LinkPreviewer>
          <LinkPreviewer url="https://developer.mozilla.org">
            MDN Web Docs
          </LinkPreviewer>
        </div>
      </div>
    </div>
  );
};

export default LinkPreviewerExample;