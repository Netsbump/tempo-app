import React, { useEffect, useState } from 'react';
import styles from './Warmup.module.css';

interface WarmupProps {
  initialTimeLeft: number;
  onWarmupEnd: () => void;
  playBeep: () => void;
  playEndRep: () => void;
}

export const Warmup: React.FC<WarmupProps> = ({ initialTimeLeft, onWarmupEnd, playBeep, playEndRep }) => {
  const [remainingTime, setRemainingTime] = useState(initialTimeLeft);

  useEffect(() => {
    if (remainingTime <= 0) {
      playEndRep();
      onWarmupEnd();
      return;
    }

    if ([3, 2, 1].includes(remainingTime)) {
      playBeep();
    }

    const warmupInterval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
    }, 1000);

    return () => clearInterval(warmupInterval);
  }, [remainingTime, onWarmupEnd, playBeep, playEndRep]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>GET READY</h2>
      <div className={styles.timeLeft}>{remainingTime}</div>
    </div>
  );
};


