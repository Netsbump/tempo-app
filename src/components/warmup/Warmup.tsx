// components/Warmup.tsx
import React, { useEffect, useState } from 'react';
import styles from './Warmup.module.css';

interface WarmupProps {
  initialTimeLeft: number;
  onWarmupEnd: () => void;
}

export const Warmup: React.FC<WarmupProps> = ({ initialTimeLeft, onWarmupEnd }) => {
  const [remainingTime, setRemainingTime] = useState(initialTimeLeft);

  useEffect(() => {
    if (remainingTime <= 0) {
      onWarmupEnd();
      return;
    }

    const warmupInterval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
    }, 1000);

    return () => clearInterval(warmupInterval);
  }, [remainingTime, onWarmupEnd]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>GET READY</h2>
      <p className={styles.timer}>{remainingTime}</p>
    </div>
  );
};


