import React, { useState } from 'react';
import TrialStage from '../TrialStage/TrialStage';
import styles from './ExperimentBlock.module.css';

const ExperimentBlock = ({ blockNumber, pairs, onBlockComplete, onEEGEvent }) => {
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [results, setResults] = useState([]);

  const handleTrialComplete = (result) => {
    const newResults = [...results, result];
    setResults(newResults);
    
    if (currentPairIndex + 1 < pairs.length) {
      setCurrentPairIndex(currentPairIndex + 1);
    } else {
      onBlockComplete({ blockNumber, results: newResults });
    }
  };

  return (
    <div className={styles.experimentBlock}>
      <div className={styles.blockHeader}>
        Блок {blockNumber} - Триал {currentPairIndex + 1} из {pairs.length}
      </div>
      <TrialStage 
        key={`${blockNumber}-${currentPairIndex}`}
        pair={pairs[currentPairIndex]}
        onComplete={handleTrialComplete}
        onEEGEvent={onEEGEvent}
      />
    </div>
  );
};

export default ExperimentBlock;