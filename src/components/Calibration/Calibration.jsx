import React, { useState, useEffect } from 'react';
import styles from './Calibration.module.css';

const Calibration = ({ type, duration, onComplete, onEEGEvent }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    onEEGEvent(`calibration_${type}_start`);
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsActive(false);
          onEEGEvent(`calibration_${type}_end`);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={styles.calibration}>
      <h2>Калибровка: {type === 'open' ? 'Глаза открыты' : 'Глаза закрыты'}</h2>
      {type === 'open' && <div className={styles.fixationPoint}>+</div>}
      <div className={styles.timer}>
        Осталось: {minutes}:{seconds.toString().padStart(2, '0')}
      </div>
      <div className={styles.instruction}>
        {type === 'open' ? 'Смотрите на крест' : 'Держите глаза закрытыми'}
      </div>
    </div>
  );
};

export default Calibration;