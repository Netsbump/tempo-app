import React, { useState, useEffect } from 'react';
import { CustomInput } from '../../customInput/CustomInput';
import styles from './InputAmrap.module.css';

type AmrapState = {
    minutes: number,
    seconds: number,
    rounds?: number,
    rest?: number;
};

interface InputAmrapProps {
    onStateChange: (newState: AmrapState) => void;
}

export const InputAmrap : React.FC<InputAmrapProps> = ({ onStateChange }) => {
    const [minutes, setMinutes] = useState<number>(5)
    const [seconds, setSeconds] = useState<number>(0)
    const [rest, setRest] = useState<number>(0)
    const [rounds, setRounds] = useState<number>(1)
    const [showRestAndRounds, setShowRestAndRounds] = useState<boolean>(false)


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
        <div className={`${styles.inputsContainer} ${showRestAndRounds ? styles.showRestAndRounds : ''}`}>
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
                {showRestAndRounds && (
                    <>
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
                    </>
                )}
            </div>
        </div>
        <div className={styles.extraRoundsRestContainer}>
            <button className={styles.img} onClick={() => setShowRestAndRounds(!showRestAndRounds)}>
                {showRestAndRounds ? " - " : " + "}
            </button>
            <p className={styles.info}>
                {showRestAndRounds ? " Remove extra rounds and rest " : " Add extra rounds and rest "}
            </p>
        </div>
    </div>

    )

}