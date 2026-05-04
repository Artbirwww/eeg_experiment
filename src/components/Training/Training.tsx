// components/Training/Training.tsx
import React, { useState, useCallback } from 'react';
import Trial from '../Trial/Trial';
import Button from '../Button/Button';
import styles from './Training.module.css';

interface Props {
  onComplete: () => void;
}

const trainingPairs = [
  { left: '1', right: '5', leftCategory: 'Driver', rightCategory: 'Rescuer' },
  { left: '3', right: '2', leftCategory: 'Explosion', rightCategory: 'Engineer' },
  { left: '4', right: '1', leftCategory: 'Master', rightCategory: 'Rescuer' },
];

const Training: React.FC<Props> = ({ onComplete }) => {
  const [trialIndex, setTrialIndex] = useState(0);
  const [complete, setComplete] = useState(false);
  const [key, setKey] = useState(0);

  const handleTrialComplete = useCallback(() => {
    if (trialIndex + 1 < trainingPairs.length) {
      setTrialIndex(prev => prev + 1);
      setKey(prev => prev + 1);
    } else {
      setComplete(true);
    }
  }, [trialIndex]);

  if (complete) {
    return (
      <div className={styles.complete}>
        <h2>Тренировка завершена</h2>
        <Button onClick={onComplete}>Перейти к калибровке</Button>
      </div>
    );
  }

  const pair = trainingPairs[trialIndex];
  return (
    <div className={styles.training}>
      <div className={styles.counter}>Тренировка: этап {trialIndex + 1} / {trainingPairs.length}</div>
      <Trial
        key={key}
        leftImage={pair.left}
        rightImage={pair.right}
        leftCategory={pair.leftCategory}
        rightCategory={pair.rightCategory}
        blockNumber={1}
        trialNumber={trialIndex + 1}
        isTraining={true}
        onComplete={handleTrialComplete}
      />
    </div>
  );
};

export default Training;