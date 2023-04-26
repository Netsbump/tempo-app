import React, { useEffect, useState } from 'react';
import styles from './Rest.module.css';

interface RestProps {
  initialTimeLeft: number;
  onRestEnd: () => void;
}

const Rest: React.FC<RestProps> = ({ initialTimeLeft, onRestEnd }) => {
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
      <h2 className={styles.title}>Rest</h2>
      <div className={styles.timeLeft}>{timeLeft} seconds left</div>
    </div>
  );
};

export default Rest;
