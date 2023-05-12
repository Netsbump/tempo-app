import React, { useEffect, useState } from 'react';
import styles from './Rest.module.css';

interface RestProps {
  initialTimeLeft: number;
  onRestEnd: () => void;
  playBeep: () => void;
  playEndRep: () => void;
}

export const Rest: React.FC<RestProps> = ({ initialTimeLeft, onRestEnd, playBeep, playEndRep }) => {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

  useEffect(() => {
    if (timeLeft <= 0) {
      playEndRep();
      onRestEnd();
      return;
    }

    if ([3, 2, 1].includes(timeLeft)) {
      playBeep();
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onRestEnd, playBeep, playEndRep]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>REST</h2>
      <div className={styles.timeLeft}>{timeLeft}</div>
    </div>
  );
};

