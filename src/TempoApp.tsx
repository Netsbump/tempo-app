import React, { useState } from 'react';
import { InputPage } from './InputPage';
import { TempoPage } from './TempoPage';

export const TempoApp: React.FC = () => {
  const [page, setPage] = useState('input');
  const [config, setConfig] = useState<{
    tempo: [number, number, number, number];
    repetitions: number;
    rest: number;
    rounds: number;
  } | null>(null);

  const handleSubmit = (config: {
    tempo: [number, number, number, number];
    repetitions: number;
    rest: number;
    rounds: number;
  }) => {
    setPage('tempo');
    setConfig(config);
  };

  const handleReset = () => {
    setPage('input');
  };

  return (
    <div>
      {page === 'input' ? (
        <InputPage onSubmit={handleSubmit} />
      ) : (
        <TempoPage tempo={config?.tempo || [0, 0, 0, 0]} repetitions={config?.repetitions || 0} rest={config?.rest || 0} rounds={config?.rounds || 0} onReset={handleReset} />
      )}
    </div>
  );
};
