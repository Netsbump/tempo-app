import React, { useState, useEffect } from 'react';
import { CustomInput } from '../../customInput/CustomInput';
import styles from './InputTabata.module.css';

type TabataState = {
    minutes: number,
    seconds: number,
    rounds: number,
    rest: number;
};

interface InputTabataProps {
    onStateChange: (newState: TabataState) => void;
}

export const InputTabata : React.FC<InputTabataProps> = ({ onStateChange }) => {

    const [minutes, setMinutes] = useState<number>(0)
    const [seconds, setSeconds] = useState<number>(20)
    const [rest, setRest] = useState<number>(10)
    const [rounds, setRounds] = useState<number>(6)

    const handleMinutesChange = (newValue : number) => {
        setMinutes(newValue);
        onStateChange({ minutes: newValue, seconds, rest, rounds });
    }

    const handleSecondsChange = (newValue : number) => {
        setSeconds(newValue);
        onStateChange({ minutes, seconds : newValue, rest, rounds });
    }

    const handleRestChange = (newValue : number) => {
        setRest(newValue);
        onStateChange({ minutes, seconds, rest: newValue, rounds });
    }

    const handleRoundsChange = (newValue : number) => {
        setRounds(newValue);
        onStateChange({ minutes, seconds, rest, rounds: newValue });
    }

    useEffect(() => {
        onStateChange({ minutes, seconds, rest, rounds });
      }, []);

    return (
        <div className={styles.container}>
            <div className={styles.inputsContainer}>
                <div>
                    <CustomInput
                        label="FOR"
                        defaultValue={minutes}
                        onChange={handleMinutesChange}
                        unit="MINUTES"
                    />
                    <CustomInput
                        label="AND"
                        defaultValue={seconds}
                        onChange={handleSecondsChange}
                        unit="SECONDS"
                    />
                </div>
                <div>
                    <CustomInput
                        label="SET"
                        defaultValue={rounds}
                        onChange={handleRoundsChange}
                        unit="ROUNDS"
                    />
                    <CustomInput
                        label="REST"
                        defaultValue={rest}
                        onChange={handleRestChange}
                        unit="SECONDS"
                    />
                </div>
            </div>
        </div>
    )
}