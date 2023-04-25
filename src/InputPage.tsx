import React, { useState } from 'react';
import FullScreenButton from './FullScreenButton';
import styles from './InputPage.module.css';

interface InputPageProps {
  onSubmit: (tempo: [number, number, number, number], repetitions: number) => void;
}

export const InputPage: React.FC<InputPageProps> = ({ onSubmit }) => {
  const [tempo, setTempo] = useState<[number, number, number, number]>([4, 2, 2, 1]);
  const [repetitions, setRepetitions] = useState<number>(10);

  const handleSubmit = () => {
    onSubmit(tempo, repetitions);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.left}>
          <h1 className={styles.title}>TEMPO</h1>
        </div>
        <FullScreenButton />
      </header>
      <main>
        <div className={styles.tempoContainer}>
          {tempo.map((value, index) => (
            <div key={index} className={styles.inputWrapper}>
              <span className={styles.info}>{index % 2 === 0 ? "WORK" : "PAUSE"}</span>
              <input
                key={index}
                className={styles.input}
                type="number"
                value={value}
                onChange={(e) => {
                  const newTempo = [...tempo];
                  newTempo[index] = parseInt(e.target.value);
                  setTempo(newTempo as [number, number, number, number]);
                }}
              />
              <span className={styles.duration}>SECONDS</span>
            </div>
          ))}
        </div>

        <div className={styles.inputWrapper}>
          <span className={styles.info}>FOR</span>
          <input
            className={styles.input}
            type="number"
            value={repetitions}
            onChange={(e) => setRepetitions(parseInt(e.target.value))}
          />
          <span className={styles.duration}>ROUND</span>
        </div>
        
        <div className={styles.inputWrapper}>
        <button className={styles.submitButton} onClick={handleSubmit}>
          START
        </button>
        </div>

      </main>
    </div>
  );
};
