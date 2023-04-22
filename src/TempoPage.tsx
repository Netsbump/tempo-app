import React, { useEffect, useRef,  useState } from 'react';
import styles from './TempoPage.module.css';

interface TempoPageProps {
  tempo: [number, number, number, number];
  repetitions: number;
  onReset: () => void;
}

export const TempoPage: React.FC<TempoPageProps> = ({ tempo, repetitions, onReset }) => {
  const [currentPhase, setCurrentPhase] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(tempo[currentPhase]);
  const [currentRepetition, setCurrentRepetition] = useState<number>(1);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const beepAudio = useRef<HTMLAudioElement | null>(null);
  const endRepAudio = useRef<HTMLAudioElement | null>(null);

  const playBeep = () => {
    if (beepAudio.current) {
      beepAudio.current.play();
    }
  };

  const playEndRep = () => {
    if (endRepAudio.current) {
      endRepAudio.current.play();
    }
  };

  const adjustedTempo = tempo.map((t) => (t === 0 ? 0.5 : t));

  useEffect(() => {
    if (isFinished) return;

    if (timeLeft <= 0) {
      const nextPhase = (currentPhase + 1) % 4;

      if (nextPhase === 0) {
        playBeep();
      } else {
        playEndRep();
      }

      setCurrentPhase(nextPhase);
      setTimeLeft(adjustedTempo[nextPhase]);

      if (nextPhase === 0) {
        if (currentRepetition + 1 === repetitions) {
          setIsFinished(true);
          return;
        } else {
          setCurrentRepetition((prevRepetition) => prevRepetition + 1);
        }
      }
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPhase, timeLeft, adjustedTempo, currentRepetition, repetitions, isFinished, playBeep, playEndRep]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>TEMPO {tempo.join(' | ')}</h1>
        <div className={styles.info}>ROUND {currentRepetition + 1} OF {repetitions}</div>
      </header>
      <main className={styles.main}>
        <div className={styles.round}>
          {isFinished ? `${currentRepetition + 1} ROUNDS OF ${repetitions} COMPLETED` : currentRepetition}
        </div>
        <div className={styles.info}>Phase en cours : {currentPhase + 1}</div>
        <div className={styles.timer}>{timeLeft}</div>
      </main>
      <button className={styles.resetButton} onClick={onReset}>
        Réinitialiser
      </button>
      <audio ref={beepAudio} src="/beep.mp3" />
      <audio ref={endRepAudio} src="/short-beep.mp3" />
    </div>
  );
};
