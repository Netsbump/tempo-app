import React, { useState, useEffect } from 'react';
import { CustomInput } from '../customInput/CustomInput';
import styles from './InputTempo.module.css';

interface InputTempoProps {
    onStateChange: (newState: any) => void; // Ajoutez la définition de cette prop ici
  }

export const InputTempo : React.FC<InputTempoProps> = ({ onStateChange }) => {
  const [tempo, setTempo] = useState<[number, number, number, number]>([4, 2, 2, 1]);
  const [repetitions, setRepetitions] = useState<number>(3);
  const [rest, setRest] = useState<number>(30);
  const [rounds, setRounds] = useState<number>(2);

  // Callbacks to handle input changes
  const handleTempoChange = (index : number, newValue : number) => {
    const newTempo: [number, number, number, number] = [...tempo];
    newTempo[index] = newValue;
    setTempo(newTempo);
    onStateChange({ tempo: newTempo, repetitions, rest, rounds });
  };

  const handleRepetitionsChange = (newValue : number) => {
    setRepetitions(newValue);
    onStateChange({ tempo, repetitions: newValue, rest, rounds });
  };

  const handleRestChange = (newValue : number) => {
    setRest(newValue);
    onStateChange({ tempo, repetitions, rest: newValue, rounds });
  };

  const handleRoundsChange = (newValue : number) => {
    setRounds(newValue);
    onStateChange({ tempo, repetitions, rest, rounds: newValue });
  };

  useEffect(() => {
    onStateChange({ tempo, repetitions, rest, rounds });
  }, []);

  return (
    <div className={styles.inputsContainer}>
      <div>
        {tempo.map((value, index) => (
            <CustomInput
            key={index}
            label={index % 2 === 0 ? "WORK" : "PAUSE"}
            defaultValue={value}
            onChange={(newValue) => handleTempoChange(index, newValue)}
            unit="SECONDS"
            />
        ))}
      </div>
      <div>
        <CustomInput
            label="DO"
            defaultValue={repetitions}
            onChange={handleRepetitionsChange}
            unit="REPS"
        />
        <CustomInput
            label="REST"
            defaultValue={rest}
            onChange={handleRestChange}
            unit="SECONDS"
        />
        <CustomInput
            label="FOR"
            defaultValue={rounds}
            onChange={handleRoundsChange}
            unit="ROUNDS"
        />
      </div>
    </div>
  );
};

