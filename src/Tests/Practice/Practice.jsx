import React from 'react';
import CardPair from '../../components/CardPair/CardPair';
import { useTimer } from '../../../contexts/TimerContext';

function Practice() {
  const { componentStates, completeComponent } = useTimer();
  
  const isActive = componentStates['practice'];
  
  const handleComplete = () => {
    console.log('Practice завершен, переходим к следующему компоненту');
    completeComponent('practice');
  };
  
  if (!isActive) return null;
  
  return (
    <CardPair 
      totalCards={10} 
      timerDuration={10} 
      onComplete={handleComplete}
    />
  );
}

export default Practice;