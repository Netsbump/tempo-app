import React, { useState } from 'react';
import { InputPage } from './InputPage';
import { TempoPage } from './TempoPage';
import Warmup from './Warmup';
import Rest from './Rest';

function App() {
  const [tempo, setTempo] = useState<[number, number, number, number]>([0, 0, 0, 0]);
  const [repetitions, setRepetitions] = useState(0);
  const [rest, setRest] = useState(0);
  const [page, setPage] = useState('input');

  // Cette fonction est définie dans App.tsx et passée en tant que prop onSubmit au composant InputPage.
  const handleSubmit = (tempo: [number, number, number, number], repetitions: number, rest: number) => {
    setTempo(tempo);
    setRepetitions(repetitions);
    setRest(rest);
    setPage('warmup');
  };

  const handleWarmupEnd = () => {
    setPage('tempo');
  };

  const handleReset = () => {
    setPage('input');
  };

  const handleTempoEnd = () => {
    setPage('rest');
  };

  const handleRestEnd = () => {
    setPage('input');
  };

  return (
    <div className="App">
      {page === 'input' ? (
        <InputPage onSubmit={handleSubmit} />
      ) : page === 'warmup' ? (
        <Warmup initialTimeLeft={3} onWarmupEnd={handleWarmupEnd} />
      ) : page === 'tempo' ? (
        <TempoPage tempo={tempo} repetitions={repetitions} onReset={handleReset} onEnd={handleTempoEnd} />
      ) : (
        <Rest initialTimeLeft={rest} onRestEnd={handleRestEnd} />
      )}
    </div>
  );
}

export default App;
