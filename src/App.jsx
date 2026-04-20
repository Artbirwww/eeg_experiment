import React from 'react';
import { ExperimentProvider, useExperiment } from './contexts/ExperimentContext';
import { PAIR_SEQUENCE } from './constants/pairSequence';
import ExperimenterPanel from './components/ExperimenterPanel/ExperimenterPanel';
import Instruction from './components/Instruction/Instruction';
import TrainingMode from './components/TrainingMode/TrainingMode';
import CalibrationSequence from './components/CalibrationSequence/CalibrationSequence';
import ExperimentBlock from './components/ExperimentBlock/ExperimentBlock';
import CompleteScreen from './components/CompleteScreen/CompleteScreen';
import './App.css';

const AppContent = () => {
  const {
    sessionState,
    currentBlock,
    experimentResults,
    showExperimenterPanel,
    sendEEGEvent,
    manualNext,
    startTraining,
    completeTraining,
    startExperimentPart1,
    completeExperimentPart1,
    startExperimentPart2,
    completeExperimentPart2,
    completeSession,
    addExperimentResult,
    setCurrentBlock
  } = useExperiment();

  const handleBlockComplete = (blockData) => {
    addExperimentResult(blockData);

    if (sessionState === 'experiment1' && currentBlock === 6) {
      completeExperimentPart1();
    } else if (sessionState === 'experiment1') {
      setCurrentBlock(prev => prev + 1);
    } else if (sessionState === 'experiment2' && currentBlock === 12) {
      completeExperimentPart2();
    } else if (sessionState === 'experiment2') {
      setCurrentBlock(prev => prev + 1);
    }
  };

  // Начальный экран
  if (sessionState === 'setup') {
    return (
      <div className="app">
        <h1>ЭЭГ Эксперимент</h1>
        {showExperimenterPanel && <ExperimenterPanel onManualNext={manualNext} />}
      </div>
    );
  }

  // Инструкция
  if (sessionState === 'instruction') {
    return <Instruction onStartTraining={startTraining} />;
  }

  // Тренировка
  if (sessionState === 'training') {
    return <TrainingMode onComplete={completeTraining} onEEGEvent={sendEEGEvent} />;
  }

  // Калибровка 1
  if (sessionState === 'calibration1') {
    return (
      <CalibrationSequence 
        onComplete={startExperimentPart1} 
        onEEGEvent={sendEEGEvent}
        showExperimenterPanel={showExperimenterPanel}
      />
    );
  }

  // Эксперимент часть 1
  if (sessionState === 'experiment1') {
    const blockPairs = PAIR_SEQUENCE[`block${currentBlock}`];
    return (
      <ExperimentBlock
        blockNumber={currentBlock}
        pairs={blockPairs}
        onBlockComplete={handleBlockComplete}
        onEEGEvent={sendEEGEvent}
      />
    );
  }

  // Калибровка 2
  if (sessionState === 'calibration2') {
    return (
      <CalibrationSequence 
        onComplete={startExperimentPart2} 
        onEEGEvent={sendEEGEvent}
        showExperimenterPanel={showExperimenterPanel}
      />
    );
  }

  // Эксперимент часть 2
  if (sessionState === 'experiment2') {
    const blockPairs = PAIR_SEQUENCE[`block${currentBlock}`];
    return (
      <ExperimentBlock
        blockNumber={currentBlock}
        pairs={blockPairs}
        onBlockComplete={handleBlockComplete}
        onEEGEvent={sendEEGEvent}
      />
    );
  }

  // Калибровка 3
  if (sessionState === 'calibration3') {
    return (
      <CalibrationSequence 
        onComplete={completeSession} 
        onEEGEvent={sendEEGEvent}
        showExperimenterPanel={showExperimenterPanel}
      />
    );
  }

  // Завершение
  if (sessionState === 'complete') {
    return <CompleteScreen results={experimentResults} />;
  }

  return null;
};

function App() {
  return (
    <ExperimentProvider>
      <AppContent />
    </ExperimentProvider>
  );
}

export default App;