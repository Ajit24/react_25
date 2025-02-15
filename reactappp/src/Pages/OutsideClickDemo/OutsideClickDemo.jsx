import React from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import toast, { Toaster } from 'react-hot-toast';

const OutsideClickDemo = () => {
  const handleOutsideClick = () => {
    toast.success('Clicked outside the box!', {
      duration: 2000,
      position: 'top-center',
    });
  };

  const boxRef = useOutsideClick(handleOutsideClick);

  const styles = {
    container: {
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f2f5',
      padding: '2rem',
    },
    box: {
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      maxWidth: '400px',
      width: '100%',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#333',
    },
    description: {
      color: '#666',
      lineHeight: '1.5',
    },
  };

  return (
    <div style={styles.container}>
      <Toaster />
      <div ref={boxRef} style={styles.box}>
        <h2 style={styles.title}>Click Outside Demo</h2>
        <p style={styles.description}>
          Click anywhere outside this box to trigger a toast notification.
          This demonstrates the useOutsideClick custom hook.
        </p>
      </div>
    </div>
  );
};

export default OutsideClickDemo;