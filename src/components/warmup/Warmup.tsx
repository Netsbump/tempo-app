import React, { useEffect, useState } from 'react';
import styles from './Warmup.module.css';
import { usePlayPause } from '../../contexts/PlayPauseContext';

interface WarmupProps {
  initialTimeLeft: number;
  onWarmupEnd: () => void;
  playBeep: () => void;
  playEndRep: () => void;
}

export const Warmup: React.FC<WarmupProps> = ({ initialTimeLeft, onWarmupEnd, playBeep, playEndRep }) => {
  const [remainingTime, setRemainingTime] = useState(initialTimeLeft);
  const { isRunning } = usePlayPause();

  useEffect(() => {

    if (!isRunning) return;

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
  }, [remainingTime, onWarmupEnd, playBeep, playEndRep, isRunning]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>GET READY</h2>
      <div className={styles.timeLeft}>{remainingTime}</div>
    </div>
  );
};


