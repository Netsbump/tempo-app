import React, { useEffect, useState } from 'react';
import styles from './Rest.module.css';

interface RestProps {
  initialTimeLeft: number;
  onRestEnd: () => void;
}

export const Rest: React.FC<RestProps> = ({ initialTimeLeft, onRestEnd }) => {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

  useEffect(() => {
    if (timeLeft <= 0) {
      onRestEnd();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onRestEnd]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>REST</h2>
      <div className={styles.timeLeft}>{timeLeft}</div>
    </div>
  );
};

