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

  const playBeep = () => {
    if (beepAudio.current) {
      beepAudio.current.play();
    }
  };

  useEffect(() => {
    if (isFinished) return;

    if (timeLeft <= 0) {
      const nextPhase = (currentPhase + 1) % 4;
      setCurrentPhase(nextPhase);
      setTimeLeft(tempo[nextPhase]);

      if (nextPhase === 0) {
        playBeep();
        if (currentRepetition === repetitions) {
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
  }, [currentPhase, timeLeft, tempo, currentRepetition, repetitions, isFinished]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tempo: {tempo.join(' - ')}</h1>
      <div className={styles.info}>Répétitions : {repetitions}</div>
      <div className={styles.info}>
        Répétition actuelle : {isFinished ? 'Terminé' : currentRepetition}
      </div>
      <div className={styles.info}>Phase en cours : {currentPhase + 1}</div>
      <div className={styles.timer}>{timeLeft}</div>
      <button className={styles.resetButton} onClick={onReset}>
        Réinitialiser
      </button>
      <audio ref={beepAudio} src="../public/beep.mp3" />
    </div>
  );
};
