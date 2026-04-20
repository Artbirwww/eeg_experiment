import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const ExperimentContext = createContext();

export const useExperiment = () => {
  const context = useContext(ExperimentContext);
  if (!context) {
    throw new Error('useExperiment must be used within ExperimentProvider');
  }
  return context;
};

export const ExperimentProvider = ({ children }) => {
  const [sessionState, setSessionState] = useState('setup');
  const [currentBlock, setCurrentBlock] = useState(1);
  const [trainingComplete, setTrainingComplete] = useState(false);
  const [experimentResults, setExperimentResults] = useState([]);
  const [showExperimenterPanel, setShowExperimenterPanel] = useState(true);
  const eegSyncRef = useRef(null);

  const sendEEGEvent = useCallback((eventName, data = {}) => {
    const timestamp = Date.now();
    console.log(`EEG EVENT: ${eventName}`, { timestamp, ...data });
    if (window.eegSync) {
      window.eegSync.sendEvent(eventName, { timestamp, ...data });
    }
  }, []);

  const manualNext = useCallback((nextState) => {
    sendEEGEvent('manual_transition', { from: sessionState, to: nextState });
    setSessionState(nextState);
  }, [sessionState, sendEEGEvent]);

  const startTraining = useCallback(() => {
    setSessionState('training');
    sendEEGEvent('training_start');
  }, [sendEEGEvent]);

  const completeTraining = useCallback(() => {
    setTrainingComplete(true);
    sendEEGEvent('training_complete');
    setSessionState('calibration1');
  }, [sendEEGEvent]);

  const startExperimentPart1 = useCallback(() => {
    setCurrentBlock(1);
    setSessionState('experiment1');
    sendEEGEvent('experiment_part1_start');
  }, [sendEEGEvent]);

  const completeExperimentPart1 = useCallback(() => {
    sendEEGEvent('experiment_part1_complete');
    setSessionState('calibration2');
  }, [sendEEGEvent]);

  const startExperimentPart2 = useCallback(() => {
    setCurrentBlock(7);
    setSessionState('experiment2');
    sendEEGEvent('experiment_part2_start');
  }, [sendEEGEvent]);

  const completeExperimentPart2 = useCallback(() => {
    sendEEGEvent('experiment_part2_complete');
    setSessionState('calibration3');
  }, [sendEEGEvent]);

  const completeSession = useCallback(() => {
    sendEEGEvent('session_complete');
    setSessionState('complete');
  }, [sendEEGEvent]);

  const addExperimentResult = useCallback((blockData) => {
    setExperimentResults(prev => [...prev, blockData]);
    sendEEGEvent('block_complete', blockData);
  }, [sendEEGEvent]);

  return (
    <ExperimentContext.Provider value={{
      sessionState,
      currentBlock,
      trainingComplete,
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
    }}>
      {children}
    </ExperimentContext.Provider>
  );
};