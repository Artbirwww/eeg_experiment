// App.tsx (обновленный - конец сессии)
import React, { useState, useEffect, useRef } from 'react';
import styles from './App.module.css';
import Instruction from './components/Instruction/Instruction';
import Training from './components/Training/Training';
import Calibration from './components/Calibration/Calibration';
import Experiment from './components/Experiment/Experiment';
import Completion from './components/Completion/Completion';
import Button from './components/Button/Button';
import DevButton from './components/DevButton/DevButton';
import { csvLogger } from './utils/csvLogger';

export type SessionPhase = 'prep' | 'instruction' | 'training' | 'calibration1' | 'experiment1' | 'calibration2' | 'experiment2' | 'calibration3' | 'completion';

const App: React.FC = () => {
  const [phase, setPhase] = useState<SessionPhase>('prep');
  const [timerMs, setTimerMs] = useState<number>(0);
  const timerRef = useRef<number | null>(null);
  const [experimentStarted, setExperimentStarted] = useState<boolean>(false);
  const [devMode, setDevMode] = useState<boolean>(false);

  useEffect(() => {
    const handleDevMode = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setDevMode(prev => !prev);
        console.log('Dev mode activated:', !devMode);
      }
    };
    window.addEventListener('keydown', handleDevMode);
    return () => window.removeEventListener('keydown', handleDevMode);
  }, [devMode]);

  useEffect(() => {
    if (experimentStarted && (phase === 'experiment1' || phase === 'experiment2')) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = window.setInterval(() => {
        setTimerMs(prev => prev + 2);
      }, 2);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [experimentStarted, phase]);

  const handleNext = () => {
    switch (phase) {
      case 'prep':
        setPhase('instruction');
        break;
      case 'instruction':
        setPhase('training');
        break;
      case 'training':
        setPhase('calibration1');
        break;
      case 'calibration1':
        setPhase('experiment1');
        setExperimentStarted(true);
        setTimerMs(0);
        break;
      case 'experiment1':
        setPhase('calibration2');
        setExperimentStarted(false);
        break;
      case 'calibration2':
        setPhase('experiment2');
        setExperimentStarted(true);
        setTimerMs(0);
        break;
      case 'experiment2':
        setPhase('calibration3');
        setExperimentStarted(false);
        break;
      case 'calibration3':
        setPhase('completion');
        break;
      default:
        break;
    }
  };

  const handleSkipCalibration = () => {
    console.log('Skipping calibration from phase:', phase);
    if (phase === 'calibration1') {
      setPhase('experiment1');
      setExperimentStarted(true);
      setTimerMs(0);
    } else if (phase === 'calibration2') {
      setPhase('experiment2');
      setExperimentStarted(true);
      setTimerMs(0);
    } else if (phase === 'calibration3') {
      setPhase('completion');
    }
  };

  const handleReset = () => {
    setPhase('prep');
    setExperimentStarted(false);
    setTimerMs(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const showDevButton = devMode && (phase === 'calibration1' || phase === 'calibration2' || phase === 'calibration3');

  return (
    <div className={styles.app}>
      {(phase === 'experiment1' || phase === 'experiment2') && (
        <div className={styles.timer}>Таймер: {timerMs} мс</div>
      )}
      <DevButton onClick={handleSkipCalibration} visible={showDevButton} />
      {phase === 'prep' && (
        <div className={styles.prepScreen}>
          <h1>Подготовка к эксперименту</h1>
          <p>Убедитесь, что испытуемый готов, ЭЭГ записывает.</p>
          <Button onClick={handleNext}>Начать инструкцию</Button>
        </div>
      )}
      {phase === 'instruction' && <Instruction onComplete={handleNext} />}
      {phase === 'training' && <Training onComplete={handleNext} />}
      {phase === 'calibration1' && <Calibration type="initial" onComplete={handleNext} />}
      {phase === 'experiment1' && <Experiment blockStart={1} blockEnd={6} onComplete={handleNext} />}
      {phase === 'calibration2' && <Calibration type="middle" onComplete={handleNext} />}
      {phase === 'experiment2' && <Experiment blockStart={7} blockEnd={12} onComplete={handleNext} />}
      {phase === 'calibration3' && <Calibration type="final" onComplete={handleNext} />}
      {phase === 'completion' && <Completion onReset={handleReset} />}
    </div>
  );
};

export default App;