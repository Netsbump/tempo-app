import React, { useState }from 'react';
import styles from './CustomInput.module.css';

interface CustomInputProps {
  label: string;
  defaultValue: number;
  onChange: (value: number) => void;
  unit: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({ label, defaultValue, onChange, unit }) => {
  const [value, setValue] = useState<number>(defaultValue);

  const getMinimumValue = (label: string) => {
    const labelsWithMinOfOne = ['DO', 'FOR', 'REST', 'SET'];
    return labelsWithMinOfOne.includes(label) ? 1 : 0;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = Number(event.target.value);

    // Check for minimum value
    const minValue = getMinimumValue(label);
    if (newValue < minValue || isNaN(newValue)) {
      newValue = minValue;
    }

    // Check for maximum value
    if (newValue > 1000) {
      newValue = 1000;
    }

    setValue(newValue);
    onChange(newValue);
  };

  const increment = () => {
    let newValue = value + 1;
    if (newValue > 1000) {
      newValue = 1000;
    }
    setValue(newValue);
    onChange(newValue);
  };

  const decrement = () => {
    let newValue = value - 1;
    const minValue = getMinimumValue(label);
    if (newValue < minValue) {
      newValue = minValue;
    }
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={styles.inputWrapper}>
      <span className={styles.info}>{label}</span>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type="number"
          value={value}
          onChange={handleChange}
          min={0}
          max={1000}
          pattern="\d*"
          inputMode="numeric"
        />
        <button className={`${styles.button} ${styles.decrementButton}`} onClick={decrement}>-</button>
        <button className={`${styles.button} ${styles.incrementButton}`} onClick={increment}>+</button>
      </div>
      <span className={styles.duration}>{unit}</span>
    </div>
  );
};
