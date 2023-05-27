import React from 'react';
import {
  createHashRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
import { FullScreenButton } from '../../components/fullScreenButton/FullScreenButton';
import { InputPage } from '../setTimer/InputPage';
import { TempoPage } from '../tempoApp/TempoPage';
import styles from './App.module.css';

const Menu : React.FC = () => {
  return (
    <div className="App">
      <header className={styles.header}>
        <FullScreenButton />
      </header>
      <main className={styles.main}>
        <h1>Choose your timer</h1>
        <nav>
          <ul>
            <li>
              <Link to="tempo-input">TEMPO</Link>
            </li>
            <li>
              <Link to="amrap-input">AMRAP</Link>
            </li>
            <li>
              <Link to="tabata-input">TABATA</Link>
            </li>
            <li>
              <Link to="fortime-input">FOR TIME</Link>
            </li>
            <li>
              <Link to="emom-input">EMOM</Link>
            </li>
            <li>
              <Link to="rest-input">REST</Link>
            </li>
          </ul>
        </nav>
      </main>
    </div>
  )
} 

const router = createHashRouter([
  {
    path: "/",
    element: <Menu />,
  },
  {
    path: "tempo-input",
    element: <InputPage type="tempo"/>,
  },
  {
    path: "tempo",
    element: <TempoPage />,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
