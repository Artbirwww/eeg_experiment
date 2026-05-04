// components/Experiment/Experiment.tsx
import React, { useState, useCallback, useEffect } from 'react';
import Trial from '../Trial/Trial';
import Button from '../Button/Button';
import { csvLogger } from '../../utils/csvLogger';
import styles from './Experiment.module.css';

interface Props {
  blockStart: number;
  blockEnd: number;
  onComplete: () => void;
}

const categoryMap: Record<string, string> = {
  'A': 'Driver',
  'B': 'Engineer',
  'C': 'Explosion',
  'D': 'Master',
  'E': 'Rescuer'
};

const pairsData: Record<number, Array<{ left: string; right: string; leftCategory: string; rightCategory: string }>> = {
  1: [
    { left: '1', right: '5', leftCategory: 'Driver', rightCategory: 'Rescuer' },
    { left: '3', right: '2', leftCategory: 'Explosion', rightCategory: 'Engineer' },
    { left: '4', right: '1', leftCategory: 'Master', rightCategory: 'Rescuer' },
    { left: '3', right: '2', leftCategory: 'Engineer', rightCategory: 'Driver' },
    { left: '4', right: '5', leftCategory: 'Explosion', rightCategory: 'Master' }
  ],
  2: [
    { left: '2', right: '4', leftCategory: 'Rescuer', rightCategory: 'Engineer' },
    { left: '3', right: '5', leftCategory: 'Driver', rightCategory: 'Explosion' },
    { left: '1', right: '5', leftCategory: 'Master', rightCategory: 'Engineer' },
    { left: '1', right: '3', leftCategory: 'Explosion', rightCategory: 'Rescuer' },
    { left: '2', right: '4', leftCategory: 'Master', rightCategory: 'Driver' }
  ],
  3: [
    { left: '1', right: '2', leftCategory: 'Engineer', rightCategory: 'Explosion' },
    { left: '4', right: '3', leftCategory: 'Rescuer', rightCategory: 'Master' },
    { left: '5', right: '3', leftCategory: 'Driver', rightCategory: 'Engineer' },
    { left: '5', right: '4', leftCategory: 'Master', rightCategory: 'Explosion' },
    { left: '2', right: '1', leftCategory: 'Driver', rightCategory: 'Rescuer' }
  ],
  4: [
    { left: '5', right: '3', leftCategory: 'Explosion', rightCategory: 'Driver' },
    { left: '4', right: '1', leftCategory: 'Engineer', rightCategory: 'Master' },
    { left: '2', right: '1', leftCategory: 'Rescuer', rightCategory: 'Explosion' },
    { left: '4', right: '2', leftCategory: 'Driver', rightCategory: 'Master' },
    { left: '3', right: '5', leftCategory: 'Rescuer', rightCategory: 'Engineer' }
  ],
  5: [
    { left: '3', right: '4', leftCategory: 'Master', rightCategory: 'Rescuer' },
    { left: '1', right: '5', leftCategory: 'Engineer', rightCategory: 'Driver' },
    { left: '2', right: '4', leftCategory: 'Explosion', rightCategory: 'Master' },
    { left: '5', right: '1', leftCategory: 'Rescuer', rightCategory: 'Driver' },
    { left: '2', right: '3', leftCategory: 'Engineer', rightCategory: 'Explosion' }
  ],
  6: [
    { left: '1', right: '4', leftCategory: 'Master', rightCategory: 'Engineer' },
    { left: '5', right: '2', leftCategory: 'Explosion', rightCategory: 'Rescuer' },
    { left: '2', right: '3', leftCategory: 'Master', rightCategory: 'Driver' },
    { left: '5', right: '3', leftCategory: 'Engineer', rightCategory: 'Rescuer' },
    { left: '1', right: '4', leftCategory: 'Explosion', rightCategory: 'Driver' }
  ],
  7: [
    { left: '5', right: '1', leftCategory: 'Driver', rightCategory: 'Engineer' },
    { left: '3', right: '2', leftCategory: 'Master', rightCategory: 'Explosion' },
    { left: '1', right: '4', leftCategory: 'Driver', rightCategory: 'Rescuer' },
    { left: '3', right: '2', leftCategory: 'Explosion', rightCategory: 'Engineer' },
    { left: '4', right: '5', leftCategory: 'Master', rightCategory: 'Rescuer' }
  ],
  8: [
    { left: '1', right: '4', leftCategory: 'Rescuer', rightCategory: 'Explosion' },
    { left: '2', right: '5', leftCategory: 'Driver', rightCategory: 'Master' },
    { left: '3', right: '3', leftCategory: 'Rescuer', rightCategory: 'Engineer' },
    { left: '4', right: '1', leftCategory: 'Driver', rightCategory: 'Explosion' },
    { left: '2', right: '5', leftCategory: 'Master', rightCategory: 'Engineer' }
  ],
  9: [
    { left: '2', right: '3', leftCategory: 'Explosion', rightCategory: 'Master' },
    { left: '4', right: '5', leftCategory: 'Rescuer', rightCategory: 'Driver' },
    { left: '1', right: '3', leftCategory: 'Engineer', rightCategory: 'Explosion' },
    { left: '5', right: '4', leftCategory: 'Rescuer', rightCategory: 'Master' },
    { left: '1', right: '2', leftCategory: 'Driver', rightCategory: 'Engineer' }
  ],
  10: [
    { left: '5', right: '2', leftCategory: 'Master', rightCategory: 'Driver' },
    { left: '3', right: '1', leftCategory: 'Engineer', rightCategory: 'Rescuer' },
    { left: '4', right: '3', leftCategory: 'Explosion', rightCategory: 'Driver' },
    { left: '4', right: '1', leftCategory: 'Engineer', rightCategory: 'Master' },
    { left: '2', right: '5', leftCategory: 'Rescuer', rightCategory: 'Explosion' }
  ],
  11: [
    { left: '5', right: '4', leftCategory: 'Driver', rightCategory: 'Rescuer' },
    { left: '2', right: '1', leftCategory: 'Explosion', rightCategory: 'Engineer' },
    { left: '3', right: '5', leftCategory: 'Master', rightCategory: 'Rescuer' },
    { left: '2', right: '1', leftCategory: 'Engineer', rightCategory: 'Driver' },
    { left: '3', right: '4', leftCategory: 'Explosion', rightCategory: 'Master' }
  ],
  12: [
    { left: '1', right: '3', leftCategory: 'Rescuer', rightCategory: 'Engineer' },
    { left: '2', right: '4', leftCategory: 'Driver', rightCategory: 'Explosion' },
    { left: '5', right: '4', leftCategory: 'Master', rightCategory: 'Engineer' },
    { left: '5', right: '2', leftCategory: 'Explosion', rightCategory: 'Rescuer' },
    { left: '1', right: '3', leftCategory: 'Master', rightCategory: 'Driver' }
  ],
};

const Experiment: React.FC<Props> = ({ blockStart, blockEnd, onComplete }) => {
  const [currentBlock, setCurrentBlock] = useState(blockStart);
  const [currentTrial, setCurrentTrial] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [key, setKey] = useState(0);
  const [experimentStarted, setExperimentStarted] = useState(false);

  useEffect(() => {
    if (!experimentStarted && blockStart === 1) {
      csvLogger.start();
      setExperimentStarted(true);
    }
    if (blockStart === 7 && !experimentStarted) {
      csvLogger.start();
      setExperimentStarted(true);
    }
  }, [blockStart, experimentStarted]);

  const getCurrentPair = () => {
    const blockPairs = pairsData[currentBlock];
    if (!blockPairs) return null;
    return blockPairs[currentTrial];
  };

  const getGlobalTrialNumber = () => {
    let total = 0;
    for (let b = blockStart; b < currentBlock; b++) {
      total += pairsData[b]?.length || 0;
    }
    return total + currentTrial + 1;
  };

  const handleTrialComplete = useCallback(() => {
    const blockPairs = pairsData[currentBlock];
    if (blockPairs && currentTrial + 1 < blockPairs.length) {
      setCurrentTrial(prev => prev + 1);
      setKey(prev => prev + 1);
    } else if (currentBlock < blockEnd) {
      setCurrentBlock(prev => prev + 1);
      setCurrentTrial(0);
      setKey(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  }, [currentBlock, currentTrial, blockEnd]);

  const handleDownloadAndComplete = () => {
    csvLogger.stop();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    csvLogger.download(`eeg_data_blocks_${blockStart}_to_${blockEnd}_${timestamp}.csv`);
    csvLogger.clear();
    onComplete();
  };

  if (isComplete) {
    return (
      <div className={styles.complete}>
        <h2>Блоки {blockStart}-{blockEnd} завершены</h2>
        <Button onClick={handleDownloadAndComplete}>Скачать CSV и продолжить</Button>
      </div>
    );
  }

  const pair = getCurrentPair();
  if (!pair) return <div>Ошибка загрузки пары</div>;

  const globalTrial = getGlobalTrialNumber();

  return (
    <div className={styles.experiment}>
      <div className={styles.info}>
        Блок {currentBlock} / {blockEnd}, этап {currentTrial + 1} / {pairsData[currentBlock]?.length || 5}
      </div>
      <Trial
        key={key}
        leftImage={pair.left}
        rightImage={pair.right}
        leftCategory={pair.leftCategory}
        rightCategory={pair.rightCategory}
        blockNumber={currentBlock}
        trialNumber={globalTrial}
        isTraining={false}
        onComplete={handleTrialComplete}
      />
    </div>
  );
};

export default Experiment;