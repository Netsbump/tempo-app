import React, { useState } from 'react';
import { FullScreenButton } from '../../components/fullScreenButton/FullScreenButton';
import { InputTempo } from '../../components/inputTypes/inputTempo/InputTempo'
import { InputFortime } from '../../components/inputTypes/inputFortime/InputFortime';
import { InputAmrap } from '../../components/inputTypes/inputAmrap/InputAmrap';
import { InputTabata } from '../../components/inputTypes/inputTabata/InputTabata';
import { InputEmom } from '../../components/inputTypes/inputEmom/InputEmom';
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
    case 'amrap':
      InputComponent = InputAmrap;
      break;
    case 'tabata':
      InputComponent = InputTabata;
      break;
    case 'fortime':
      InputComponent = InputFortime;
      break;
    case 'emom':
      InputComponent = InputEmom;
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
