import React from 'react';
import { TimerProvider } from '../contexts/TimerContext';

function TimerSequence({ children, sequence }) {
  
  const schedule = sequence.map((item, index) => ({
    id: item.component || `component_${index}`,
    showAt: item.showAt,
    hideAt: item.hideAt
  }));
  
  return (
    <TimerProvider schedule={schedule}>
      {children}
    </TimerProvider>
  );
}

export default TimerSequence;