import React, { useState } from 'react';
import TrialStage from '../TrialStage/TrialStage';
import { TRAINING_PAIRS } from '../../constants/pairSequence';
import styles from './TrainingMode.module.css';

const TrainingMode = ({ onComplete, onEEGEvent }) => {
  const [trialNumber, setTrialNumber] = useState(0);

  const handleTrialComplete = () => {
    if (trialNumber + 1 < TRAINING_PAIRS.length) {
      setTrialNumber(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className={styles.trainingMode}>
      <TrialStage
        key={trialNumber}
        pair={TRAINING_PAIRS[trialNumber]}
        onComplete={handleTrialComplete}
        onEEGEvent={onEEGEvent}
      />
      <div className={styles.trainingProgress}>
        Триал {trialNumber + 1} из {TRAINING_PAIRS.length}
      </div>
    </div>
  );
};

export default TrainingMode;