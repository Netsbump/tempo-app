import React, { useState, useEffect } from 'react';
import styles from './FullScreenButton.module.css';
import fullScreenIcon from '../../assets/img/arrows-out-simple.svg'
import normalScreenIcon from '../../assets/img/arrows-in-simple.svg'

export const FullScreenButton: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        setIsFullScreen(true);
    } else {
        document.exitFullscreen();
        setIsFullScreen(false);
    }
  };

  useEffect(() => {

    // Update the state when the fullscreen change event occurs
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    const acquireWakeLock = async () => {
      if ('wakeLock' in navigator) {
        try {
          const wakeLock = await (navigator.wakeLock as any).request('screen');
          console.log('Wake Lock active.');

          // Remember to release the Wake Lock when done.
          return () => wakeLock.release();
        } catch (err) {
          // Use a type assertion to tell TypeScript `err` is an instance of Error
          const error = err as Error;
          console.error(`${error.name}, ${error.message}`);
        }
      } else {
        console.log('Wake Lock API not available in this browser.');
      }
    };

    acquireWakeLock();

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };

  }, []);

  return (
    <img 
      className={styles.img} 
      // src={fullScreen} alt='Fullscreen' 
      src={isFullScreen ? normalScreenIcon : fullScreenIcon} 
      alt={isFullScreen ? 'Normal Screen' : 'Full Screen'} 
      onClick={toggleFullScreen} />
  );
};
