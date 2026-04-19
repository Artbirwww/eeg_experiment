import React from 'react';
import CardPair from '../../components/CardPair/CardPair';
import { useTimer } from '../../../contexts/TimerContext';

function Test3() {
  const { componentStates, completeComponent } = useTimer();
  
  const isActive = componentStates['test3'];
  
  const handleComplete = () => {
    console.log('Test3 завершен');
    completeComponent('test3');
  };
  
  if (!isActive) return null;
  
  return (
    <CardPair 
      totalCards={60} 
      timerDuration={10} 
      onComplete={handleComplete}
    />
  );
}

export default Test3;