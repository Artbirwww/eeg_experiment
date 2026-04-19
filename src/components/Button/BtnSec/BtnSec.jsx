import React from 'react';
import { useTimer } from '../../../../contexts/TimerContext';
import styles from './BtnSec.module.css';

function BtnSec() {
  const { isTimerRunning, elapsedTime } = useTimer();

  if (!isTimerRunning) return null;

  return (
    <div className={styles.timerCorner}>
      Прошло: {elapsedTime} мс
    </div>
  );
}

export default BtnSec;