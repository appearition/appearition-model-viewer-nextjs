// LoadingComponent.js
import React from 'react';
import styles from './LoadingComponent.module.css';

const LoadingComponent = ({ message }) => {
  return (
    <div className={`${styles.container} min-h-screen`}>
      <div
        className={`${styles.loader} ${styles.animateSpin} w-16 h-16 border-t-4 border-blue-500 rounded-full`}
      ></div>
      <p className={styles.text}>{message}</p>
    </div>
  );
};

export default LoadingComponent;
