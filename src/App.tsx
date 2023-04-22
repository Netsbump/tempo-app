import React, { useState } from 'react';
import { InputPage } from './InputPage';
import { TempoPage } from './TempoPage';
import Warmup from './Warmup';

function App() {
  const [tempo, setTempo] = useState<[number, number, number, number]>([0, 0, 0, 0]);
  const [repetitions, setRepetitions] = useState(0);
  const [page, setPage] = useState('input');

  const handleSubmit = (tempo: [number, number, number, number], repetitions: number) => {
    setTempo(tempo);
    setRepetitions(repetitions);
    setPage('warmup');
  };

  const handleWarmupEnd = () => {
    setPage('tempo');
  };

  const handleReset = () => {
    setPage('input');
  };

  return (
    <div className="App">
      {page === 'input' ? (
        <InputPage onSubmit={handleSubmit} />
      ) : page === 'warmup' ? (
        <Warmup initialTimeLeft={3} onWarmupEnd={handleWarmupEnd} />
      ) : (
        <TempoPage tempo={tempo} repetitions={repetitions} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
