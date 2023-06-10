import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import styles from './AmrapPage.module.css';
import backImage from '../../assets/img/arrow-back.svg'
import resetImage from '../../assets/img/clock-counter-clockwise.svg'
import playImage from '../../assets/img/play.svg'
import pauseImage from '../../assets/img/pause.svg'
import { Warmup } from '../../components/warmup/Warmup';
import { Rest } from '../../components/rest/Rest';
import { FullScreenButton } from '../../components/fullScreenButton/FullScreenButton';
import { VolumeAction } from '../../components/volumeAction/VolumeAction';
import { usePlayPause } from '../../contexts/PlayPauseContext';
import longBeepSound from '../../assets/sounds/long-beep.wav';
import shortBeepSound from '../../assets/sounds/short-beep.mp3';

interface AmrapPageState {
    minutes: number;
    seconds: number;
    rest: number;
    rounds: number;
}

export const AmrapPage: React.FC = () => {

    const location = useLocation();
    const { minutes, seconds, rest, rounds } = location.state as AmrapPageState; 

    const calculateInitialTimeLeft = () => {
       return (minutes * 60) + seconds;
    };

    // Current roundDuration, remaining time and rounds
    const [roundDuration, setRoundDuration] = useState(calculateInitialTimeLeft());
    const [timeLeft, setTimeLeft] = useState(calculateInitialTimeLeft());
    const [currentRound, setCurrentRound] = useState(1);

    // Status flags for warmup, rest, completion, soundEnabled and pause/play
    const [isWarmupDone, setIsWarmupDone] = useState(false);
    const [isResting, setIsResting] = useState(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
    const { isRunning, setIsRunning } = usePlayPause();

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

    // Reset tempo 
    const reset = () => {
        setTimeLeft(calculateInitialTimeLeft());
        setCurrentRound(1);
        setIsWarmupDone(false);
        setIsResting(false);
        setIsFinished(false);
        setIsSoundEnabled(true);
    };

    useEffect(() => {

      // Composant en pause ? 
      if (!isRunning) return;

      // Warmup terminé ? 
      if (!isWarmupDone) {
        return;
      }

      // 
      if (timeLeft <= 0) {

        // Composant en pause ? 
        if (isResting) {
          setIsResting(false);
          setCurrentRound((prevRound) => prevRound + 1);
          console.log(roundDuration);
          setTimeLeft(roundDuration); 
          return;
        }
        
        playEndRep();
    
        // Par défault rounds = 1 mais rounds peut être défini sur une valeur plus haute par l'utilisateur  
        // Si on a dépassé le nb de rounds prévu afficher le composant de fin 
        if (currentRound > rounds) {

          setIsFinished(true);
          return;
        
        // Sinon si rounds > 1 et que qu'on cu
        } else if (rounds > 1 && currentRound === 1) {

          setIsResting(true);
          setTimeLeft(rest);

        }

        return;
      }

      if ([3, 2, 1].includes(timeLeft)) {
        playBeep();
      }

      const timer = setTimeout(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
  
      return () => clearTimeout(timer);

    }, [timeLeft, playBeep, playEndRep, isRunning, currentRound, rounds,  isWarmupDone, isResting, rest, roundDuration]);

    const renderAmrapElements = () => {
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
            <div className={styles.timer}>
                {timeLeft}
            </div>
          )
        }
      };
    
      return (
        <div className={styles.container}>
    
          <header className={styles.header}>
            <div className={styles.left}>
              <img className={styles.img} src={backImage} alt='Back' onClick={() => window.history.back()} />
              <h1 className={styles.title}>AMRAP</h1>
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
            <div className={styles.tempo}>{renderAmrapElements()}</div>
          </main>
    
          <footer className={styles.footer}>
          <button className={styles.actionButton} onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? 
              <img className={styles.img} src={pauseImage} alt='image pause action'/> 
              : 
              <img className={styles.img} src={playImage} alt='image play action'/> 
            }
          </button>
            <VolumeAction 
              isSoundEnabled={isSoundEnabled} 
              setIsSoundEnabled={setIsSoundEnabled} 
            />
            <button className={styles.actionButton} onClick={() => reset()}>
              <img className={styles.img} src={resetImage} alt='reset timer'/> 
            </button>
          </footer>
    
          <audio ref={endRepAudio} src={longBeepSound} />
          <audio ref={beepAudio} src={shortBeepSound}  />
        </div>
      );
  
};