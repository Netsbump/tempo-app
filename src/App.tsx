import React, { useState } from 'react';
import { InputPage } from './InputPage';
import { TempoPage } from './TempoPage';

function App() {
  const [tempo, setTempo] = useState<[number, number, number, number] | null>(null);
  const [repetitions, setRepetitions] = useState<number | null>(null);

  const handleSubmit = (inputTempo: [number, number, number, number], inputRepetitions: number) => {
    setTempo(inputTempo);
    setRepetitions(inputRepetitions);
  };

  const handleReset = () => {
    setTempo(null);
    setRepetitions(null);
  };

  return (
    <div className="App">
      {tempo === null || repetitions === null ? (
        <InputPage onSubmit={handleSubmit} />
      ) : (
        <TempoPage tempo={tempo} repetitions={repetitions} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
