import React, { useState } from 'react';
import { FullScreenButton } from './components/fullScreenButton/FullScreenButton';
import { CustomInput } from './components/customInput/CustomInput';
import styles from './InputPage.module.css';

interface InputPageProps {
  onSubmit: (config: {
    tempo: [number, number, number, number], 
    repetitions: number, 
    rest: number,
    rounds: number
  }) => void;
}

export const InputPage: React.FC<InputPageProps> = ({ onSubmit }) => {
  const [tempo, setTempo] = useState<[number, number, number, number]>([4, 2, 2, 1]);
  const [repetitions, setRepetitions] = useState<number>(2);
  const [rest, setRest] = useState<number>(10);
  const [rounds, setRounds] = useState<number>(2);

  const handleSubmit = () => {
    onSubmit({tempo, repetitions, rest, rounds});
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
        <div className={styles.inputsContainer}>
          {tempo.map((value, index) => (
            <CustomInput
              key={index}
              label={index % 2 === 0 ? "WORK" : "PAUSE"}
              value={value}
              onChange={(newValue) => {
                const newTempo = [...tempo];
                newTempo[index] = newValue;
                setTempo(newTempo as [number, number, number, number]);
              }}
              unit="SECONDS"
            />
          ))}
        </div>
        <div className={styles.inputsContainer}>
          <CustomInput
            label="FOR"
            value={repetitions}
            onChange={setRepetitions}
            unit="SETS"
          />
          <CustomInput
            label="REST"
            value={rest}
            onChange={setRest}
            unit="SECONDS"
          />
          <CustomInput
            label="FOR"
            value={rounds}
            onChange={setRounds}
            unit="ROUNDS"
          />
        </div>
      </main>
      <footer>
      <button className={styles.submitButton} onClick={handleSubmit}>
        START
      </button>
      </footer>
    </div>
  );
};
