import React, { createContext, useState, ReactNode, useContext } from 'react';

interface PlayPauseContextProps {
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlayPauseContext = createContext<PlayPauseContextProps | undefined>(undefined);

interface PlayPauseProviderProps {
  children: ReactNode;
}

const PlayPauseProvider: React.FC<PlayPauseProviderProps> = ({ children }) => {
  const [isRunning, setIsRunning] = useState(true);

  return (
    <PlayPauseContext.Provider value={{ isRunning, setIsRunning }}>
      {children}
    </PlayPauseContext.Provider>
  );
};

const usePlayPause = () => {
  const context = useContext(PlayPauseContext);
  if (context === undefined) {
    throw new Error('usePlayPause must be used within a PlayPauseProvider');
  }
  return context;
};

export { PlayPauseContext, PlayPauseProvider, usePlayPause };
