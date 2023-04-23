import React from 'react';
import styles from './FullScreenButton.module.css';

const FullScreenButton: React.FC = () => {
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
  };

  return (
    <button onClick={toggleFullScreen} className={styles.fullscreenButton}>Full Screen</button>
  );
};

export default FullScreenButton;
