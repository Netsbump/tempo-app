import React from 'react';
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

  return (
    <img className={styles.img} src={fullScreen} alt='Fullscreen' onClick={toggleFullScreen} />
  );
};
