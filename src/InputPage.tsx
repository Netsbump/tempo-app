import React, { useState } from 'react';
import styles from './InputPage.module.css';

interface InputPageProps {
  onSubmit: (tempo: [number, number, number, number], repetitions: number) => void;
}

export const InputPage: React.FC<InputPageProps> = ({ onSubmit }) => {
  const [tempo, setTempo] = useState<[number, number, number, number]>([4, 0, 1, 2]);
  const [repetitions, setRepetitions] = useState<number>(10);

  const handleSubmit = () => {
    onSubmit(tempo, repetitions);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Entrer le tempo et le nombre de répétitions</h1>
      <input
        className={styles.input}
        type="text"
        value={tempo.join('/')}
        onChange={(e) => setTempo(e.target.value.split('/').map(Number) as [number, number, number, number])}
      />
      <input
        className={styles.input}
        type="number"
        value={repetitions}
        onChange={(e) => setRepetitions(parseInt(e.target.value))}
      />
      <button className={styles.submitButton} onClick={handleSubmit}>
        Soumettre
      </button>
    </div>
  );
};
