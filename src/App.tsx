import React, {useState} from 'react';
import { TempoApp } from './TempoApp';
import styles from './App.module.css';

function App() {
  const [selectedApp, setSelectedApp] = useState('');

  const handleAppSelect = (app : string) => {
    setSelectedApp(app);
  };

  const renderApp = () => {
    switch (selectedApp) {
      case 'tempo':
        return <TempoApp />;
      // case 'amrap':
      //   return <AmrapApp />;
      // case 'tabata':
      //   return <TabataApp />;
      default:
        return (
          <main className={styles.main}>
            <h1>Choose your timer</h1>
            <nav>
              <ul>
                <li onClick={() => handleAppSelect('tempo')}>TEMPO</li>
                <li onClick={() => handleAppSelect('amrap')}>AMRAP</li>
                <li onClick={() => handleAppSelect('tabata')}>TABATA</li>
                <li onClick={() => handleAppSelect('fortime')}>FOR TIME</li>
                <li onClick={() => handleAppSelect('emom')}>EMOM</li>
              </ul>
            </nav>
          </main>
        );
    }
  };

  return (
    <div className="App">
      {renderApp()}
    </div>
  );
}

export default App;
