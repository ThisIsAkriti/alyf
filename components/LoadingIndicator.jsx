import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/_scss/pages/_loadingIndicator.module.scss'

const LoadingIndicator = ({ totalDuration, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000; // in seconds
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);
      if (newProgress >= 100) {
        clearInterval(interval);
        setIsFading(true); // Start fade-out
        setTimeout(() => {
          if (onComplete) {
            onComplete();
          }
        }, 1000); // Call onComplete after 1-second fade
      }
    }, 16); // ~60fps
    return () => clearInterval(interval);
  }, [totalDuration, onComplete]);

  return (
    <motion.div
      className={styles.loadingContainer}
      animate={{ opacity: isFading ? 0 : 1 }}
      transition={{ duration: 1 }} // 1-second fade-out
    >
      <div className={styles.textContainer}>
        <div className={styles.loadingText}>LOADING</div>
        <div className={styles.percentage}>{Math.round(progress)}%</div>
      </div>
      <div className={styles.loadingBarContainer}>
        <div className={styles.loadingBar} style={{ width: `${progress}%` }} />
      </div>
    </motion.div>
  );
};

export default LoadingIndicator;