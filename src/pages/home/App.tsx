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
import { FortimePage } from '../fortimeApp/FortimePage';
import { AmrapPage } from '../amrapApp/AmrapPage';
import { TabataPage } from '../tabataApp/TabataPage';
import { EmomPage } from '../emomApp/EmomPage';
import { PlayPauseProvider } from '../../contexts/PlayPauseContext';
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
    path: "amrap-input",
    element: <InputPage type="amrap"/>,
  },
  {
    path: "tabata-input",
    element: <InputPage type="tabata"/>,
  },
  {
    path: "fortime-input",
    element: <InputPage type="fortime"/>,
  },
  {
    path: "emom-input",
    element: <InputPage type="emom"/>,
  },
  {
    path: "tempo",
    element: (
      <PlayPauseProvider>
        <TempoPage />
      </PlayPauseProvider>
    ),
  },
  {
    path: "amrap",
    element: (
      <PlayPauseProvider>
        <AmrapPage />
      </PlayPauseProvider>
    ),
  },
  {
    path: "tabata",
    element: (
      <PlayPauseProvider>
        <TabataPage />
      </PlayPauseProvider>
    ),
  },
  {
    path: "fortime",
    element: (
      <PlayPauseProvider>
        <FortimePage />
      </PlayPauseProvider>
    ),
  },
  {
    path: "emom",
    element: (
      <PlayPauseProvider>
        <EmomPage />
      </PlayPauseProvider>
    ),
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
