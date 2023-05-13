import React, { useEffect } from 'react';
import styles from './FullScreenButton.module.css';
import fullScreen from '../../assets/img/full-screen.svg'

export const FullScreenButton: React.FC = () => {
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
  };

  useEffect(() => {
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
  }, []);

  return (
    <img className={styles.img} src={fullScreen} alt='Fullscreen' onClick={toggleFullScreen} />
  );
};
