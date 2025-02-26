import React from 'react';
//import { useFetch } from '../hooks/useFetch';
//import { useTheme } from '../context/ThemeContext';
import { useFetch } from '../../hooks/useFetch';
const FetchDataHook = () => {
  //const { currentTheme } = useTheme();
  const { data: posts, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
    },
    header: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
     // color: currentTheme.text.primary,
      transition: 'color 0.2s ease',
    },
    loading: {
      textAlign: 'center',
      padding: '2rem',
     // color: currentTheme.text.secondary,
    },
    error: {
      padding: '1rem',
      backgroundColor: '#fee2e2',
      color: '#dc2626',
      borderRadius: '0.5rem',
      marginBottom: '1rem',
    },
    postList: {
      display: 'grid',
      gap: '1.5rem',
    },
    post: {
      padding: '1.5rem',
     // backgroundColor: currentTheme.surface,
      borderRadius: '0.5rem',
     // boxShadow: currentTheme.shadow,
      transition: 'all 0.2s ease',
    },
    postTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '0.75rem',
     // color: currentTheme.text.primary,
    },
    postBody: {
    //  color: currentTheme.text.secondary,
      lineHeight: '1.5',
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading posts...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Posts</h1>
      <div style={styles.postList}>
        {posts?.map(post => (
          <div key={post.id} style={styles.post}>
            <h2 style={styles.postTitle}>{post.id}. {post.title}</h2>
            <p style={styles.postBody}>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchDataHook;