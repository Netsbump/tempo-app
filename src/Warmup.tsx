// components/Warmup.tsx
import React, { useEffect, useState } from 'react';
import styles from './Warmup.module.css';

interface WarmupProps {
  initialTimeLeft: number;
  onWarmupEnd: () => void;
}

const Warmup: React.FC<WarmupProps> = ({ initialTimeLeft, onWarmupEnd }) => {
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
    <div className={styles.warmup}>
      <h2>Préparation</h2>
      <p>{remainingTime}</p>
    </div>
  );
};

export default Warmup;
