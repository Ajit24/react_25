
// without using api , showing as items.....

import React, { useState, useEffect, useRef } from 'react';
import '../InfiniteScroll/InfiniteScroll.css';

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef(null);
  
  // Configuration
  const itemHeight = 50; // Height of each item in pixels
  const viewportHeight = 400; // Height of the visible area
  const bufferItems = 5; // Extra items to render above and below viewport
  const totalItems = 1000; // Total number of items in the dataset
  const itemsPerPage = 20; // Number of items to fetch in each batch
  
  // Calculate visible items range
  const visibleItemsCount = Math.ceil(viewportHeight / itemHeight) + 2 * bufferItems;
  
  // Simulate data fetching
  const fetchItems = (start, limit) => {
    setIsLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const newItems = Array.from({ length: limit }, (_, i) => ({
        id: start + i,
        text: `Item ${start + i}`
      })).filter(item => item.id < totalItems);
      
      setItems(prevItems => {
        // Create a map of existing items for quick lookup
        const itemMap = new Map(prevItems.map(item => [item.id, item]));
        
        // Add new items to the map
        newItems.forEach(item => {
          itemMap.set(item.id, item);
        });
        
        // Convert map back to array and sort by id
        return Array.from(itemMap.values()).sort((a, b) => a.id - b.id);
      });
      
      setIsLoading(false);
    }, 300); // Simulate network delay
  };
  
  // Handle scroll events
  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const scrollTop = containerRef.current.scrollTop;
    const newStartIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - bufferItems);
    
    setStartIndex(newStartIndex);
    
    // Load more if nearing the end of loaded items
    const endIndex = newStartIndex + visibleItemsCount;
    if (endIndex >= items.length && !isLoading && items.length < totalItems) {
      fetchItems(items.length, itemsPerPage);
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
    fetchItems(0, itemsPerPage);
  }, []);
  
  // Calculate which items to render
  const visibleItems = items.slice(startIndex, startIndex + visibleItemsCount);
  
  // Calculate container style to create scrollable space
  const containerHeight = totalItems * itemHeight;
  
  return (
    <div className="infinite-scroll-wrapper">
      <button className="reset-button" onClick={handleReset}>
        Back to Top
      </button>
      <div className="infinite-scroll-container" ref={containerRef} onScroll={handleScroll}>
        <div className="scroll-content" style={{ height: `${containerHeight}px` }}>
          {visibleItems.map(item => (
            <div 
              key={item.id} 
              className="scroll-item"
              style={{ 
                transform: `translateY(${item.id * itemHeight}px)`,
                height: `${itemHeight}px`
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
        {isLoading && <div className="loading-indicator">Loading more items...</div>}
      </div>
    </div>
  );
};

export default InfiniteScroll;