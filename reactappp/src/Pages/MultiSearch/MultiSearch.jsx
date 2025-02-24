import React, { useState, useMemo } from 'react';
import '../MultiSearch/MultiSearch.css';


export const items = [
  { name: 'Prada', category: 'Bags' },
  { name: 'Gucci', category: 'Bags' },
  { name: 'Guess', category: 'Bags' },
  { name: 'Rolex', category: 'Watches' },
  { name: 'Timex', category: 'Watches' },
  { name: 'Nike', category: 'Sports' },
  { name: 'Adidas', category: 'Sports' },
  { name: 'Fila', category: 'Sports' },
  { name: 'Ray Ban', category: 'Sunglasses' },
  { name: 'Aldo', category: 'Sunglasses' },
  { name: 'Polaroid', category: 'Sunglasses' },
];

const MultiSearch = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const categories = useMemo(() => {
    return [...new Set(items.map(item => item.category))];
  }, []);

  const filteredItems = useMemo(() => {
    if (selectedFilters.length === 0) return items;
    return items.filter(item => selectedFilters.includes(item.category));
  }, [selectedFilters]);

  const handleFilterClick = (category) => {
    setSelectedFilters(prev => {
      if (prev.includes(category)) {
        return prev.filter(filter => filter !== category);
      }
      return [...prev, category];
    });
  };

  return (
    <div className="container">
      <h1 className="title">Product Filter</h1>
      
      <div className="filter-container">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleFilterClick(category)}
            className={`filter-button ${selectedFilters.includes(category) ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredItems.map(item => (
          <div key={item.name} className="product-card">
            <h3 className="product-name">{item.name}</h3>
            <p className="product-category">{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSearch;