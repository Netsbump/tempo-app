import React, { useState, useEffect } from 'react';
import { CustomInput } from '../../customInput/CustomInput';
import styles from './InputEmom.module.css';

type EmomState = {
    minutes: number,
    numberExercises: number,
};

interface InputEmomProps {
    onStateChange: (newState: EmomState) => void;
}

export const InputEmom : React.FC<InputEmomProps> = ({ onStateChange }) => {

    const [minutes, setMinutes] = useState<number>(12)
    const [numberExercises, setNumberExercises] = useState<number>(3)

    const handleMinutesChange = (newValue : number) => {
        setMinutes(newValue);
        onStateChange({ minutes: newValue, numberExercises });
    }

    const handleNumberExercicesChange = (newValue : number) => {
        setNumberExercises(newValue);
        onStateChange({ minutes, numberExercises : newValue});
    }

    useEffect(() => {
        onStateChange({ minutes, numberExercises });
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
                    label="DO"
                    defaultValue={numberExercises}
                    onChange={handleNumberExercicesChange}
                    unit="EXERCISES"
                />
            </div>
        </div>
    </div>

    )

}