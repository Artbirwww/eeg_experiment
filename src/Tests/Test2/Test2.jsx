import React from 'react';
import CardPair from '../../components/CardPair/CardPair';
import { useTimer } from '../../../contexts/TimerContext';

function Test2() {
  const { componentStates, completeComponent } = useTimer();
  
  const isActive = componentStates['test2'];
  
  const handleComplete = () => {
    console.log('Test2 завершен');
    completeComponent('test2');
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

export default Test2;