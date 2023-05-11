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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    let newValue = Number(event.target.value);

    // Vérification de la valeur minimale
    if (newValue < 0 || isNaN(newValue)) {
      newValue = 0;
    }

    // Vérification de la valeur maximale
    if (newValue > 1000) {
      newValue = 1000;
    }

    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={styles.inputWrapper}>
      <span className={styles.info}>{label}</span>
      <input
        className={styles.input}
        type="number"
        value={value}
        onChange={handleChange}
        min={0}
        max={1000}
      />
      <span className={styles.duration}>{unit}</span>
    </div>
  );
};
