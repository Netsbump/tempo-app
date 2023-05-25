import React, { useState } from 'react';
import { FullScreenButton } from '../../components/fullScreenButton/FullScreenButton';
import { InputTempo } from '../../components/inputTempo/InputTempo'
import styles from './InputPage.module.css';
import { useNavigate  } from 'react-router-dom';
import backImage from '../../assets/img/arrow-back.svg'

type InputPageProps = {
  type: string;
}
type TimerState = Record<string, number | [number, number, number, number]>;

export const InputPage: React.FC<InputPageProps> = ({ type }) => {
  const navigate = useNavigate();
  const [timerState, setTimerState] = useState({});

  const handleStateChange = (newState : TimerState) => {
    setTimerState(newState);
  };

  const handleSubmit = () => {
    navigate('/' + type, { state: timerState });
  };


  // Determine which input component to render based on the timer type
  let InputComponent;
  switch (type) {
    case 'tempo':
      InputComponent = InputTempo;
      break;
    // Todo Add similar cases for other timer types...
    default:
      throw new Error("Invalid timer type: " + type);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.left}>
          <img className={styles.img} src={backImage} alt='Back' onClick={() => window.history.back()} />
          <h1 className={styles.title}>{type.toUpperCase()}</h1>
        </div>
        <FullScreenButton />
      </header>
      <main className={styles.main}>
        <InputComponent onStateChange={handleStateChange} />
      </main>
      <footer>
      <button className={styles.submitButton} onClick={handleSubmit}>
        START
      </button>
      </footer>
    </div>
  );
};
