import React, { useState, useEffect, useRef } from 'react';
import styles from './TrialStage.module.css';

const TrialStage = ({ pair, onComplete, onEEGEvent }) => {
  const [stage, setStage] = useState(1);
  const [startTime, setStartTime] = useState(null);
  const [choiceTime, setChoiceTime] = useState(null);
  const [restDuration, setRestDuration] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isWaitingForChoice, setIsWaitingForChoice] = useState(false);
  const timeoutRef = useRef(null);
  const [isDeviant, setIsDeviant] = useState(false);

  useEffect(() => {
    onEEGEvent('fixation_cross_start', { pair });
    const timer = setTimeout(() => {
      setStage(2);
      onEEGEvent('images_show_start', { pair });
    }, 500);
    setStartTime(Date.now());
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (stage === 2) {
      const timer = setTimeout(() => {
        setStage(3);
        setShowPrompt(true);
        setIsWaitingForChoice(true);
        onEEGEvent('choice_prompt_show', { pair });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleChoice = (choice) => {
    if (!isWaitingForChoice) return;

    const choiceTimestamp = Date.now();
    const stageStart = startTime;
    const t = choiceTimestamp - (stageStart + 500 + 5000);
    
    setChoiceTime(t);
    setIsWaitingForChoice(false);
    setShowPrompt(false);
    onEEGEvent('choice_made', { pair, choice, reactionTime: t });

    let t4;
    let isDeviantCase = false;

    if (t < 2000) {
      t4 = 2500 + (2000 - t);
    } else if (t >= 2000 && t <= 3000) {
      t4 = 4500 - t;
    } else {
      t4 = 2500;
      isDeviantCase = true;
      setIsDeviant(true);
    }

    setRestDuration(t4);

    timeoutRef.current = setTimeout(() => {
      onEEGEvent('trial_end', { pair, reactionTime: t, isDeviant: isDeviantCase });
      onComplete({ reactionTime: t, isDeviant: isDeviantCase });
    }, t4);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.key === 'f' || e.key === 'F') && isWaitingForChoice) {
        handleChoice('F');
      } else if ((e.key === 'j' || e.key === 'J') && isWaitingForChoice) {
        handleChoice('J');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isWaitingForChoice]);

  return (
    <div className={styles.trialStage}>
      {stage === 1 && <div className={styles.fixationCross}>+</div>}
      {stage === 2 && (
        <div className={styles.imagesContainer}>
          <div className={styles.imageLeft}>{pair.split('-')[0]}</div>
          <div className={styles.imageRight}>{pair.split('-')[1]}</div>
        </div>
      )}
      {stage === 3 && showPrompt && (
        <div className={styles.choicePrompt}>
          <div className={styles.imagesContainer}>
            <div className={styles.imageLeft}>{pair.split('-')[0]}</div>
            <div className={styles.imageRight}>{pair.split('-')[1]}</div>
          </div>
          <div className={styles.promptText}>F или J?</div>
          <div className={styles.keyHint}>← F &nbsp;&nbsp;&nbsp;&nbsp; J →</div>
        </div>
      )}
      {stage === 4 && (
        <div className={styles.restScreen}>
          {isDeviant && <div className={styles.deviantWarning}>⚠ Отклонение по времени</div>}
        </div>
      )}
    </div>
  );
};

export default TrialStage;