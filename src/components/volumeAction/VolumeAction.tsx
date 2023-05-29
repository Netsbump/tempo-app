import React, { useState } from 'react';
import soundOn from '../../assets/img/speaker-high.svg'
import soundOff from '../../assets/img/speaker-x.svg'
import styles from './VolumeAction.module.css';

interface VolumeActionProps {
    isSoundEnabled: boolean;
    setIsSoundEnabled: (value: boolean) => void;
  }

export const VolumeAction: React.FC<VolumeActionProps> = ({ isSoundEnabled, setIsSoundEnabled }) => {

return (
    <button className={styles.volumeAction} onClick={() => setIsSoundEnabled(!isSoundEnabled)}>
        {isSoundEnabled ? 
        <img className={styles.img} src={soundOn} alt='Turn sound on'/> 
        : 
        <img className={styles.img} src={soundOff} alt='Turn sound off'/> 
        }
    </button>
    );
};