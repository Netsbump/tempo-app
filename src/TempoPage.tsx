import React, { useState, useEffect, useRef } from 'react';
import styles from './TempoPage.module.css';
import { Warmup } from './components/warmup/Warmup';
import { Rest } from './components/rest/Rest';
import { FullScreenButton } from './components/fullScreenButton/FullScreenButton';

interface TempoPageProps {
  tempo: [number, number, number, number];
  repetitions: number;
  rest: number;
  rounds: number;
  onReset: () => void;
}

export const TempoPage: React.FC<TempoPageProps> = ({
  tempo,
  repetitions,
  rest,
  rounds,
  onReset,
}) => {
  // Phase du tempo en cours (il y en a 4 possibles)
  const [currentPhase, setCurrentPhase] = useState<number>(0);

  // Compteur pour l'affichage du temps restant
  const [timeLeft, setTimeLeft] = useState(tempo[currentPhase]);

  // Compteur du nombre de rounds
  const [currentRound, setCurrentRound] = useState(1);

  // Compteur du nombre de repetitions 
  const [currentRepetition, setCurrentRepetition] = useState(1);

  const [isWarmupDone, setIsWarmupDone] = useState(false);

  // Etat du rest pour l'affichage du composant 
  const [isResting, setIsResting] = useState(false);
  
  // Etat de l'exercice complet 
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Gestion de l'audio
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
    // Si l'exercice est terminé, on retourne sur inputPage.tsx
    if (currentRepetition > repetitions) {
      setIsFinished(true);
      return;
    }
    
    if (!isWarmupDone) {
      setIsWarmupDone(true);
      return;
    }
    
    // Si on est en train de se reposer, on attend la fin du repos
    if (isResting) {
      return;
    }

    // Si le temps restant pour la phase en cours est épuisé
    if (timeLeft <= 0) {
      // On passe à la phase suivante (0, 1, 2, 3) en boucle
      const nextPhase = (currentPhase + 1) % 4;

      // Si la phase suivante est 0, cela signifie que nous avons terminé un round complet
      if (nextPhase === 0) {
        // On joue le son "endRepAudio" pour indiquer la fin d'un round
        playEndRep();

        // Si on a atteint le nombre de rounds défini, on passe en mode de repos
        if (currentRound >= rounds) {
          setIsResting(true);
          setTimeLeft(rest);
          setCurrentRound(1);
          setCurrentRepetition((prevRepetition) => prevRepetition + 1);
        } else {
          // Sinon, on incrémente le compteur de rounds
          setCurrentRound((prevRound) => prevRound + 1);
        }
      } else {
        // Pour les autres phases (1, 2, 3), on joue le son "beepAudio" pour indiquer le changement de phase
        playBeep();
      }

      // On met à jour la phase en cours et le temps restant pour la phase suivante
      setCurrentPhase(nextPhase);
      setTimeLeft(adjustedTempo[nextPhase]);
    }

    // On met en place un intervalle pour décompter le temps restant toutes les secondes
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    // On nettoie l'intervalle lorsqu'on quitte le composant ou lorsqu'on passe à une autre phase
    return () => clearInterval(interval);
  }, [currentPhase, timeLeft, adjustedTempo, currentRepetition, repetitions, currentRound, rounds, isWarmupDone, isResting, rest, playBeep, playEndRep]);

  
  const renderTempoElements = () => {
    if (!isWarmupDone) {
      return (
        <Warmup
          initialTimeLeft={3}
          onWarmupEnd={() => {
            setIsWarmupDone(false);
          }}
        />
      );
    }

    if (isResting) {
      return (
        <Rest
          initialTimeLeft={rest}
          onRestEnd={() => {
            setIsResting(false);
          }}
        />
      );
    } else {
      return tempo.map((value, index) => (
        <span key={index} className={`${styles.phase} ${currentPhase === index ? styles.activePhase : styles.inactivePhase}`}>
          {index % 2 === 0 ? 'WORK' : 'PAUSE'} {value} {index !== tempo.length - 1}
        </span>
      ));
    }

      {/* Plus tard on fera aussi un composant d'affichage genre sucesss quand la session est terminée 
      <div className={styles.completed}>
          {isFinished ? `${repetitions} SETS COMPLETED` : null}
      </div> */}
  };

  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <div className={styles.left}>
          <h1 className={styles.title}>TEMPO</h1>
          <div className={styles.info}>
            <span>- REPETITIONS</span> 
            <span className={styles.round}>{currentRepetition}</span>
            <span>OF</span>
            <span>{repetitions}</span>
          </div>
        </div>
        <FullScreenButton />
      </header>

      <main className={styles.main}>    
          <div className={styles.tempo}>{renderTempoElements()}</div>
          <div className={styles.timer}>{timeLeft}</div>
      </main>

      <footer>
        <div className={styles.footer}>
          <div className={styles.rounds}>
            ROUND {currentRound} / {rounds}
          </div>
          <button className={styles.resetButton} onClick={onReset}>
            RESET
          </button>
        </div>
      </footer>

      <audio ref={endRepAudio} src="/beep.mp3" />
      <audio ref={beepAudio} src="/short-beep.mp3" />
    </div>
  );
};
       
