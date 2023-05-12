import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './TempoPage.module.css';
import backImage from '../../../assets/img/arrow-back.svg'
import { Warmup } from '../../../components/warmup/Warmup';
import { Rest } from '../../../components/rest/Rest';
import { FullScreenButton } from '../../../components/fullScreenButton/FullScreenButton';

// Déclaration d'interface pour variable css en ts
interface CSSCustomProperties extends React.CSSProperties {
  '--tempoAnimation': string;
}

interface TempoPageState {
  tempo: [number, number, number, number];
  repetitions: number;
  rest: number;
  rounds: number;
}

export const TempoPage: React.FC = () => {
  const location = useLocation();

  const { tempo, repetitions, rest, rounds } = location.state as TempoPageState;

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
  // Etat pour la durée de l'animation css du cercle 
  const [animationDuration, setAnimationDuration] = useState<number>(tempo[currentPhase]);

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

  // A revoir pour la gestion des tempo pause de 0
  const adjustedTempo = tempo.map((t) => (t === 0 ? 0.5 : t));

  useEffect(() => {
    // Si l'exercice est terminé, on retourne sur inputPage.tsx
    if (currentRound > rounds) {
      setIsFinished(true);
      return;
    }

    if (!isWarmupDone) {
      return;
    }

    if (isResting) {
      return;
    }

    // Si le temps restant pour la phase en cours est épuisé
    if (timeLeft <= 0) {

      // On passe à la phase suivante (0, 1, 2, 3) en boucle
      const nextPhase = (currentPhase + 1) % 4;

      // Pour toutes les phases (0, 1, 2, 3), on joue le son "beepAudio" pour indiquer le changement de phase
      playBeep();

      // Si la phase suivante est 0, cela signifie que nous avons terminé un phase complète
      if (nextPhase === 0) {

        // Si on a atteint le nombre de répétitions défini, on passe en mode de repos
        if (currentRepetition === repetitions) {

          setTimeout(() => {
            // On joue le son "endRepAudio" pour indiquer la fin d'une repetition
            playEndRep();
          }, 300);

          setIsResting(true);
          setTimeLeft(rest);

          // On incrémente le round 
          setCurrentRound((prevRound) => prevRound + 1);
        
          // On remet les reps à zero
          setCurrentRepetition(1);

        } else {
          // Sinon, on incrémente le compteur de repetitions 
          setCurrentRepetition((prevRepetition) => prevRepetition + 1);
        }
      } 

      // On met à jour la phase en cours et le temps restant pour la phase suivante
      setCurrentPhase(nextPhase);
      setTimeLeft(adjustedTempo[nextPhase]);

      // Mettez à jour la durée de l'animation lorsque vous changez de phase
      setAnimationDuration(adjustedTempo[nextPhase]);

    }

    // On met en place un intervalle pour décompter le temps restant toutes les secondes
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    // On nettoie l'intervalle lorsqu'on quitte le composant ou lorsqu'on passe à une autre phase
    return () => clearInterval(interval);
  }, [currentPhase, timeLeft, adjustedTempo, currentRepetition, repetitions, currentRound, rounds, isWarmupDone, isResting, rest, animationDuration, setAnimationDuration, playBeep, playEndRep]);
  
  const renderTempoElements = () => {
    if (!isWarmupDone) {
      return (
        <Warmup
          initialTimeLeft={10}
          playBeep={playBeep}
          playEndRep={playEndRep}
          onWarmupEnd={() => {
            setIsWarmupDone(true);
          }}
        />
      );
    }

    if (isFinished) {
      return (
        <div className={styles.completed}>
          {`${rounds} ROUNDS COMPLETED`}
        </div>
      );
    }

    if (isResting) {
      return (
        <Rest
          initialTimeLeft={rest}
          playBeep={playBeep}
          playEndRep={playEndRep}
          onRestEnd={() => {
            setIsResting(false);
          }}
        />
      );
    } else {
      return (
        <>
          <div className={styles.containerTempo}>
            {tempo.map((value, index) => (
              <div key={index} className={styles.containerPhase}>
                <span key={`tempo-${index}`} className={`${styles.tempoPhase} ${currentPhase === index ? styles.activePhase : styles.inactivePhase}`}>
                  {value} {index !== tempo.length - 1}
                </span>
                {currentPhase === index 
                  ? <span key={`message-${index}`} className={styles.labelPhase}>{index % 2 === 0 ? 'WORK' : 'PAUSE'}</span> 
                  : null
                }
              </div>
            ))}
          </div>
          <div className={styles.timer}>
            <svg 
              key={`tempoAnimation-${currentPhase}`} 
              className={styles.svgCircle} 
              style={{ "--tempoAnimation": `${animationDuration}s` } as CSSCustomProperties}
              viewBox="0 0 100 100"
            > 
            <circle r="45" cx="50" cy="50"></circle>
            </svg>
            {timeLeft}
          </div>
          <article className={styles.reps}>
            <div>REPS</div>
            <div className={styles.repsCount}>
             <span className={`${currentRepetition - 1 !== 0 ? styles.repsDone : null}`}>{currentRepetition - 1}</span> 
             <span>/</span> 
             <span>{repetitions}</span> 
            </div>
          </article>
        </>
      )
    }
  };

  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <div className={styles.left}>
          <img className={styles.img} src={backImage} alt='Back' onClick={() => window.history.back()} />
          <h1 className={styles.title}>TEMPO</h1>
          <div className={styles.info}>
            <span>- ROUNDS</span> 
            <span className={styles.round}>{currentRound <= rounds ? currentRound : rounds}</span>
            <span>OF</span>
            <span>{rounds}</span>
          </div>
        </div>
        <FullScreenButton />
      </header>

      <main className={styles.main}>  
        <div className={styles.tempo}>{renderTempoElements()}</div>
      </main>

      <footer className={styles.footer}>
        <button className={styles.actionButton}>
          PAUSE
        </button>
        <button className={styles.actionButton}>
          RESET
        </button>
      </footer>

      <audio ref={endRepAudio} src="/beep.mp3" />
      <audio ref={beepAudio} src="/short-beep.mp3" />
    </div>
  );
};
       
