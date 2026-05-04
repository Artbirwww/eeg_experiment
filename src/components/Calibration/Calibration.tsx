// components/Calibration/Calibration.tsx
import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import styles from './Calibration.module.css';

interface Props {
  type: 'initial' | 'middle' | 'final';
  onComplete: () => void;
}

const Calibration: React.FC<Props> = ({ type, onComplete }) => {
  const [stage, setStage] = useState<'open' | 'closed' | 'ready'>('open');
  const [timeLeft, setTimeLeft] = useState(5 * 60);

  useEffect(() => {
    if (stage === 'ready') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (stage === 'open') {
            setStage('closed');
            setTimeLeft(5 * 60);
          } else if (stage === 'closed') {
            setStage('ready');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [stage]);

  const getTitle = () => {
    switch (type) {
      case 'initial': return 'Калибровка перед экспериментом';
      case 'middle': return 'Промежуточная калибровка';
      case 'final': return 'Финальная калибровка';
    }
  };

  if (stage === 'ready') {
    return (
      <div className={styles.container}>
        <h2>{getTitle()} завершена</h2>
        <Button onClick={onComplete}>Продолжить</Button>
      </div>
    );
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={styles.container}>
      <h2>{getTitle()}</h2>
      <p>{stage === 'open' ? 'Открытые глаза' : 'Закрытые глаза'}</p>
      <p className={styles.timer}>{minutes}:{seconds.toString().padStart(2, '0')}</p>
    </div>
  );
};

export default Calibration;