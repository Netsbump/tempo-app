import React, { useEffect, useRef,  useState } from 'react';
import styles from './TempoPage.module.css';
import FullScreenButton from './FullScreenButton';

interface TempoPageProps {
  tempo: [number, number, number, number];
  repetitions: number;
  onReset: () => void;
  onEnd: () => void;
}

export const TempoPage: React.FC<TempoPageProps> = ({ tempo, repetitions, onReset, onEnd }) => {

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

    // Si l'exercice est terminé, on ne fait rien.
    if (isFinished) {
      onEnd();
    };
  
    // Si le temps restant pour la phase en cours est épuisé.
    if (timeLeft <= 0) {
      // On passe à la phase suivante (0, 1, 2, 3) en boucle.
      const nextPhase = (currentPhase + 1) % 4;
  
      // Si la phase suivante est 0, cela signifie que nous avons terminé une répétition complète.
      if (nextPhase === 0) {
        // On joue le son "endRepAudio" pour indiquer la fin de la répétition.
        playEndRep();
  
        // Si on a atteint le nombre de répétitions défini, on termine l'exercice.
        if (currentRepetition >= repetitions) {
          setIsFinished(true);
          return;
        } else {
          // Sinon, on incrémente le compteur de répétitions.
          setCurrentRepetition((prevRepetition) => prevRepetition + 1);
        }
      } else {
        // Pour les autres phases (1, 2, 3), on joue le son "beepAudio" pour indiquer le changement de phase.
        playBeep();
      }
  
      // On met à jour la phase en cours et le temps restant pour la phase suivante.
      setCurrentPhase(nextPhase);
      setTimeLeft(adjustedTempo[nextPhase]);
    }
  
    // On met en place un intervalle pour décompter le temps restant toutes les secondes.
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);
  
    // On nettoie l'intervalle lorsqu'on quitte le composant ou lorsqu'on passe à une autre phase.
    return () => clearInterval(interval);
  }, [currentPhase, timeLeft, adjustedTempo, currentRepetition, repetitions, isFinished, onEnd, playBeep, playEndRep ]);
  
  const renderTempoElements = () => {
    return tempo.map((t, index) => (
      <span
        key={index}
        className={`${styles.phase} ${currentPhase === index ? styles.activePhase : styles.inactivePhase}`}
      >
        {t} {index !== tempo.length - 1}
      </span>
    ));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.left}>
          <h1 className={styles.title}>TEMPO</h1>
          <div className={styles.info}>
            <span>- REPS</span> 
            <span className={styles.round}>{currentRepetition}</span>
            <span>OF</span>
            <span>{repetitions}</span>
          </div>
        </div>
        <FullScreenButton />
      </header>
      
      <main className={styles.main}>
        <div>
          
          <div className={styles.tempo}>{renderTempoElements()}</div>
        </div>
        <div className={styles.timer}>{timeLeft}</div>
      </main>
      
      <div className={styles.completed}>
          {isFinished ? `${repetitions} ROUNDS COMPLETED` : null}
      </div>

      <button className={styles.resetButton} onClick={onReset}>
        Retour
      </button>

      <audio ref={endRepAudio} src="/beep.mp3" />
      <audio ref={beepAudio} src="/short-beep.mp3" />
    </div>
  );
};
