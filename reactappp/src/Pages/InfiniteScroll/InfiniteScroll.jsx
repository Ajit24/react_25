//  by using api 
import React, { useState, useEffect, useRef } from 'react';
import '../InfiniteScroll/InfiniteScroll.css';

const InfiniteScroll = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);
  
  // Configuration
  const itemHeight = 200; // Height of each image item in pixels
  const viewportHeight = 600; // Height of the visible area
  const bufferItems = 3; // Extra items to render above and below viewport
  const itemsPerPage = 10; // Number of items to fetch in each batch
  
  // Calculate visible items range
  const visibleItemsCount = Math.ceil(viewportHeight / itemHeight) + 2 * bufferItems;
  
  // Fetch images from API
  const fetchImages = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      // Using a placeholder API for demo purposes
      // In a real app, you would use something like:
      // `https://api.unsplash.com/photos/random?count=${itemsPerPage}&client_id=YOUR_API_KEY`
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${itemsPerPage}`);
      const data = await response.json();
      
      // Transform the data to match our needs
      const newImages = data.map(item => ({
        id: item.id,
        url: item.url,
        title: item.title,
        thumbnailUrl: item.thumbnailUrl
      }));
      
      setImages(prevImages => [...prevImages, ...newImages]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle scroll events
  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const scrollTop = containerRef.current.scrollTop;
    const newStartIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - bufferItems);
    
    setStartIndex(newStartIndex);
    
    // Load more if nearing the end of loaded images
    const endIndex = newStartIndex + visibleItemsCount;
    if (endIndex >= images.length - 5 && !isLoading) {
      fetchImages();
    }
  };
  
  // Reset scroll position
  const handleReset = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
      setStartIndex(0);
    }
  };
  
  // Initial load
  useEffect(() => {
    fetchImages();
  }, []);
  
  // Calculate which items to render
  const visibleImages = images.slice(startIndex, startIndex + visibleItemsCount);
  
  // Calculate container style to create scrollable space
  const containerHeight = images.length * itemHeight;
  
  return (
    <div className="infinite-scroll-wrapper">
      <button className="reset-button" onClick={handleReset}>
        Back to Top
      </button>
      <div className="infinite-scroll-container" ref={containerRef} onScroll={handleScroll}>
        <div className="scroll-content" style={{ height: `${containerHeight}px` }}>
          {visibleImages.map((image, index) => (
            <div 
              key={image.id} 
              className="image-item"
              style={{ 
                transform: `translateY(${(startIndex + index) * itemHeight}px)`,
                height: `${itemHeight}px`
              }}
            >
              <img 
                src={image.thumbnailUrl} 
                alt={image.title} 
                className="image-thumbnail"
              />
              <div className="image-info">
                <p className="image-title">{image.title}</p>
                <span className="image-id">ID: {image.id}</span>
              </div>
            </div>
          ))}
        </div>
        {isLoading && <div className="loading-indicator">Loading more images...</div>}
      </div>
    </div>
  );
};

export default InfiniteScroll;