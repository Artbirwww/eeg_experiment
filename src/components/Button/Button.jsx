import React from 'react';
import { useTimer } from '../../../contexts/TimerContext';
import styles from './Button.module.css';

function Button() {
  const { showButton, startTimer } = useTimer();
  
  if (!showButton) return null;
  
  return (
    <button onClick={startTimer} className={styles.button}>
      СТАРТ
    </button>
  );
}

export default Button;