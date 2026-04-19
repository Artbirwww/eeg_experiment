import React from 'react';
import { useTimer } from '../../../contexts/TimerContext';
import styles from './Plus.module.css';

function Plus({ id }) {
  const { componentStates } = useTimer();
  
  const isActive = componentStates[id];

  if (!isActive) return null;

  return (
    <div className={styles.plus}>+</div>
  );
}

export default Plus;