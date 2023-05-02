import React, { useState } from 'react';
import { FullScreenButton } from '../../../components/fullScreenButton/FullScreenButton';
import { CustomInput } from '../../../components/customInput/CustomInput';
import styles from './InputPage.module.css';
import { useNavigate  } from 'react-router-dom';

export const InputPage: React.FC = () => {
  const [tempo, setTempo] = useState<[number, number, number, number]>([4, 2, 2, 1]);
  const [repetitions, setRepetitions] = useState<number>(3);
  const [rest, setRest] = useState<number>(30);
  const [rounds, setRounds] = useState<number>(2);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/tempo', { state: { tempo, repetitions, rest, rounds } });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.left}>
          <h1 className={styles.title}>TEMPO</h1>
        </div>
        <FullScreenButton />
      </header>
      <main className={styles.main}>
        <div className={styles.inputsContainer}>
          {tempo.map((value, index) => (
            <CustomInput
              key={index}
              label={index % 2 === 0 ? "WORK" : "PAUSE"}
              defaultValue={value}
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
            label="DO"
            defaultValue={repetitions}
            onChange={setRepetitions}
            unit="REPS"
          />
          <CustomInput
            label="REST"
            defaultValue={rest}
            onChange={setRest}
            unit="SECONDS"
          />
          <CustomInput
            label="FOR"
            defaultValue={rounds}
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
