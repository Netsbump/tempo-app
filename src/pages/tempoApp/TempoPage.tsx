import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './TempoPage.module.css';
import backImage from '../../assets/img/arrow-back.svg'
import { Warmup } from '../../components/warmup/Warmup';
import { Rest } from '../../components/rest/Rest';
import { FullScreenButton } from '../../components/fullScreenButton/FullScreenButton';
import { VolumeAction } from '../../components/volumeAction/VolumeAction';
import longBeepSound from '../../assets/sounds/long-beep.wav';
import shortBeepSound from '../../assets/sounds/short-beep.mp3';

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

  // Current phase, remaining time, round, and repetition counters
  const [currentPhase, setCurrentPhase] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState(tempo[currentPhase]);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentRepetition, setCurrentRepetition] = useState(1);

  // Status flags for warmup, rest, completion and soundEnabled
  const [isWarmupDone, setIsWarmupDone] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);

  // Animation duration state
  const [animationDuration, setAnimationDuration] = useState<number>(tempo[currentPhase]);

  // Audio refs
  const beepAudio = useRef<HTMLAudioElement | null>(null);
  const endRepAudio = useRef<HTMLAudioElement | null>(null);

  // Play beep sound
  const playBeep = () => {
    if (beepAudio.current && isSoundEnabled) {
      beepAudio.current.volume = 0.1;
      beepAudio.current.play();
    }
  };

  // Play end rep sound
  const playEndRep = () => {
    if (endRepAudio.current && isSoundEnabled) {
      endRepAudio.current.volume = 0.1;
      endRepAudio.current.play();
    }
  };

  // Adjust tempo for zero values
  const adjustedTempo = tempo.map((t) => (t === 0 ? 0.5 : t));
  
  // Reset tempo 
  const reset = () => {
    setCurrentPhase(0);
    setTimeLeft(tempo[0]);
    setCurrentRound(1);
    setCurrentRepetition(1);
    setIsWarmupDone(false);
    setIsResting(false);
    setIsFinished(false);
    setIsSoundEnabled(true);
    setAnimationDuration(tempo[0]);
  };

  // Effect for tracking and controlling phase changes
  useEffect(() => {

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

    if (timeLeft <= 0) {

      const nextPhase = (currentPhase + 1) % 4;

      playBeep();

      if (nextPhase === 0) {

        if (currentRepetition === repetitions) {

          setTimeout(() => {
            playEndRep();
          }, 300);

          setIsResting(true);
          setTimeLeft(rest);

          setCurrentRound((prevRound) => prevRound + 1);
        
          setCurrentRepetition(1);

        } else {
          setCurrentRepetition((prevRepetition) => prevRepetition + 1);
        }
      } 

      setCurrentPhase(nextPhase);
      setTimeLeft(adjustedTempo[nextPhase]);

      setAnimationDuration(adjustedTempo[nextPhase]);

    }

    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

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
        <VolumeAction 
          isSoundEnabled={isSoundEnabled} 
          setIsSoundEnabled={setIsSoundEnabled} 
        />
        <button className={styles.actionButton} onClick={() => reset()}>
          RESET
        </button>
      </footer>

      <audio ref={endRepAudio} src={longBeepSound} />
      <audio ref={beepAudio} src={shortBeepSound}  />
    </div>
  );
};
       
