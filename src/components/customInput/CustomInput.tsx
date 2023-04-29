import React from 'react';
import styles from './CustomInput.module.css';

interface CustomInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  unit: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({ label, value, onChange, unit }) => {
  return (
    <div className={styles.inputWrapper}>
      <span className={styles.info}>{label}</span>
      <input
        className={styles.input}
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
      <span className={styles.duration}>{unit}</span>
    </div>
  );
};
