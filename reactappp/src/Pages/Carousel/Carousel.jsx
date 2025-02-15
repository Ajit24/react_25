import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80&w=1200&h=600',
      title: 'Nature Landscape',
      description: 'Beautiful mountain scenery'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1682687221073-53ad74c15bb9?auto=format&fit=crop&q=80&w=1200&h=600',
      title: 'City Life',
      description: 'Urban architecture and lifestyle'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1682687220795-796d3f6f7000?auto=format&fit=crop&q=80&w=1200&h=600',
      title: 'Ocean View',
      description: 'Serene beach sunset'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const goToNext = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const carouselStyles = {
    container: {
      position: 'relative',
      width: '100%',
      maxWidth: '1200px',
      height: '600px',
      margin: '0 auto',
      overflow: 'hidden',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    slideContainer: {
      display: 'flex',
      transition: 'transform 0.5s ease-in-out',
      transform: `translateX(-${currentSlide * 100}%)`
    },
    slide: {
      minWidth: '100%',
      position: 'relative'
    },
    image: {
      width: '100%',
      height: '600px',
      objectFit: 'cover'
    },
    content: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      padding: '20px',
      background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
      color: 'white'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    description: {
      fontSize: '16px',
      opacity: '0.9'
    },
    button: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'rgba(255, 255, 255, 0.8)',
      border: 'none',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      color: '#333',
      transition: 'background-color 0.3s ease',
      zIndex: '1'
    },
    prevButton: {
      left: '20px'
    },
    nextButton: {
      right: '20px'
    },
    indicators: {
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '8px',
      zIndex: '1'
    },
    indicator: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <div style={carouselStyles.container}>
      <div style={carouselStyles.slideContainer}>
        {slides.map((slide, index) => (
          <div key={slide.id} style={carouselStyles.slide}>
            <img
              src={slide.image}
              alt={slide.title}
              style={carouselStyles.image}
            />
            <div style={carouselStyles.content}>
              <h2 style={carouselStyles.title}>{slide.title}</h2>
              <p style={carouselStyles.description}>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevious}
        style={{ ...carouselStyles.button, ...carouselStyles.prevButton }}
      >
        ‹
      </button>
      <button
        onClick={goToNext}
        style={{ ...carouselStyles.button, ...carouselStyles.nextButton }}
      >
        ›
      </button>

      <div style={carouselStyles.indicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              ...carouselStyles.indicator,
              backgroundColor: currentSlide === index ? '#fff' : 'rgba(255, 255, 255, 0.5)'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;