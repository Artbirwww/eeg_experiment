import React, { useState } from 'react';
import Calibration from '../Calibration/Calibration';
// import styles from './CalibrationSequence.module.css';

const CalibrationSequence = ({ onComplete, onEEGEvent, showExperimenterPanel }) => {
  const [step, setStep] = useState('open');
  const [openComplete, setOpenComplete] = useState(false);

  if (!openComplete) {
    return (
      <div className={styles.calibrationSequence}>
        <Calibration 
          type="open"
          duration={300}
          onComplete={() => {
            setOpenComplete(true);
            setStep('closed');
          }}
          onEEGEvent={onEEGEvent}
        />
      </div>
    );
  }

  return (
    <div className={styles.calibrationSequence}>
      <Calibration 
        type="closed"
        duration={300}
        onComplete={onComplete}
        onEEGEvent={onEEGEvent}
      />
    </div>
  );
};

export default CalibrationSequence;