// components/Trial/Trial.tsx
import React, { useState, useEffect, useRef } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import { csvLogger } from '../../utils/csvLogger';
import styles from './Trial.module.css';

interface Props {
  leftImage: string;
  rightImage: string;
  leftCategory: string;
  rightCategory: string;
  blockNumber: number;
  trialNumber: number;
  isTraining: boolean;
  onComplete: () => void;
}

type Phase = 'fixation' | 'stimuli' | 'choice' | 'black' | 'done';

const Trial: React.FC<Props> = ({ 
  leftImage, 
  rightImage, 
  leftCategory, 
  rightCategory, 
  blockNumber, 
  trialNumber, 
  isTraining, 
  onComplete 
}) => {
  const [phase, setPhase] = useState<Phase>('fixation');
  const [choiceStartTime, setChoiceStartTime] = useState<number>(0);
  const [tValue, setTValue] = useState<number | null>(null);
  const [t4Duration, setT4Duration] = useState<number>(0);
  const [hasLogged, setHasLogged] = useState<boolean>(false);
  const phaseRef = useRef<Phase>('fixation');
  const timeoutRef = useRef<number | null>(null);
  const fixationTimerRef = useRef<number | null>(null);
  const stimuliTimerRef = useRef<number | null>(null);
  const blackTimerRef = useRef<number | null>(null);

  useEffect(() => {
    fixationTimerRef.current = window.setTimeout(() => {
      setPhase('stimuli');
    }, 500);

    stimuliTimerRef.current = window.setTimeout(() => {
      setPhase('choice');
      setChoiceStartTime(performance.now());
    }, 5500);

    timeoutRef.current = window.setTimeout(() => {
      if (phaseRef.current === 'choice') {
        handleChoice(null);
      }
    }, 10000);

    return () => {
      if (fixationTimerRef.current) clearTimeout(fixationTimerRef.current);
      if (stimuliTimerRef.current) clearTimeout(stimuliTimerRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (blackTimerRef.current) clearTimeout(blackTimerRef.current);
    };
  }, []);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const handleChoice = (chosenSide: 'left' | 'right' | null) => {
    if (phase !== 'choice') return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const choiceTime = performance.now();
    const t = Math.floor(choiceTime - choiceStartTime);
    setTValue(t);

    let chosenValue = '';
    if (chosenSide === 'left') {
      chosenValue = `${leftCategory}_${leftImage}`;
    } else if (chosenSide === 'right') {
      chosenValue = `${rightCategory}_${rightImage}`;
    } else {
      chosenValue = 'none';
    }

    if (!isTraining && !hasLogged) {
      csvLogger.log(chosenValue);
      setHasLogged(true);
    }

    let t4 = 0;
    if (t < 2000) {
      t4 = 2500 + (2000 - t);
    } else if (t >= 2000 && t <= 3000) {
      t4 = 4500 - t;
    } else {
      t4 = 2500;
    }
    setT4Duration(t4);

    setPhase('black');

    blackTimerRef.current = window.setTimeout(() => {
      setPhase('done');
      onComplete();
    }, t4);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (phase === 'choice') {
        if (e.key === 'f' || e.key === 'F') {
          handleChoice('left');
        } else if (e.key === 'j' || e.key === 'J') {
          handleChoice('right');
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div className={styles.trial}>
      {(phase === 'fixation' || phase === 'stimuli' || phase === 'choice') && (
        <div className={styles.imagesContainer}>
          <ImageCard
            imageId={leftImage}
            category={leftCategory}
            side="left"
            isActive={phase === 'choice'}
            onClick={() => phase === 'choice' && handleChoice('left')}
          />
          <ImageCard
            imageId={rightImage}
            category={rightCategory}
            side="right"
            isActive={phase === 'choice'}
            onClick={() => phase === 'choice' && handleChoice('right')}
          />
        </div>
      )}
      {phase === 'fixation' && <div className={styles.fixation}>+</div>}
      {phase === 'choice' && (
        <div className={styles.choicePrompt}>
          F или J?
          <div className={styles.choiceSub}>Нажмите F (левая) или J (правая)</div>
        </div>
      )}
      {phase === 'black' && <div className={styles.blackScreen} />}
      {(phase === 'choice' || phase === 'black') && tValue !== null && (
        <div className={styles.debugInfo}>
          t = {tValue} мс | t4 = {t4Duration} мс
          {tValue > 3000 && <span className={styles.warning}> ⚠️ Превышение времени!</span>}
        </div>
      )}
    </div>
  );
};

export default Trial;