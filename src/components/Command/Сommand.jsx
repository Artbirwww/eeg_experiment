import React from 'react';
import { useTimer } from '../../../contexts/TimerContext';
import styles from './Command.module.css';

function Command({ id, Text }) {
  const { componentStates } = useTimer();
  
  if (!componentStates[id]) {
    return null;
  }
  
  return (
    <div className={styles.command}>
      {Text}
    </div>
  );
}

export default Command;