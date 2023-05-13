import React from 'react';
import {
  createHashRouter,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
import { InputPage } from '../tempoApp/setTimer/InputPage';
import { TempoPage } from '../tempoApp/displayTimer/TempoPage';
import styles from './App.module.css';

const Menu : React.FC = () => {
  return (
    <div className="App"> 
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
          </ul>
        </nav>
      </main>
    </div>
  )
} 

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//     <Route path="/" element={<Menu />}/>
//     <Route path="tempo-input" element={<InputPage />} />
//     <Route path="tempo" element={<TempoPage />} />
//     </>
//   )
// );

const router = createHashRouter([
  {
    path: "/",
    element: <Menu />,
  },
  {
    path: "tempo-input",
    element: <InputPage />,
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
