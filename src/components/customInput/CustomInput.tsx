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
    const newValue = Number(event.target.value);
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
      />
      <span className={styles.duration}>{unit}</span>
    </div>
  );
};
