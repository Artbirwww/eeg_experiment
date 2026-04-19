import React, { useState, useEffect } from 'react';
import styles from "./CardPair.module.css";
import Timer from '../Timer/Timer';

function CardPair({ totalCards = 10, timerDuration = 10, onComplete }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentPair, setCurrentPair] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const pairs = [];
  for (let i = 1; i <= totalCards; i += 2) {
    if (i + 1 <= totalCards) {
      pairs.push([i, i + 1]);
    }
  }
  
  const currentCards = pairs[currentPair];
  
  useEffect(() => {
    if (!isCompleted && currentPair >= pairs.length && onComplete) {
      setIsCompleted(true);
      onComplete();
      console.log('Все карточки пройдены!');
    }
  }, [currentPair, pairs.length, onComplete, isCompleted]);
  
  const goToNextPair = () => {
    if (currentPair < pairs.length - 1) {
      setCurrentPair(currentPair + 1);
      setTimerKey(prev => prev + 1);
    } else if (currentPair === pairs.length - 1) {
      if (onComplete && !isCompleted) {
        setIsCompleted(true);
        onComplete();
        console.log('Последняя карточка нажата!');
      }
    }
  };
  
  const goToPreviousPair = () => {
    if (currentPair > 0) {
      setCurrentPair(currentPair - 1);
      setTimerKey(prev => prev + 1);
    }
  };
  
  const handleCardClick = (cardNumber) => {
    console.log(`Нажата карточка ${cardNumber}`);
    goToNextPair();
  };
  
  const handleTimeEnd = () => {
    console.log('Время вышло!');
    goToNextPair();
  };
  
  if (!currentCards) {
    return <div>Нет доступных карточек</div>;
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        Пара {currentPair + 1} из {pairs.length}
      </div>
      
      <div className={styles.cardscontainer}>
        <button 
          className={styles.cardButton}
          onClick={() => handleCardClick(currentCards[0])}
        >
          {currentCards[0]}
        </button>
        <button 
          className={styles.cardButton}
          onClick={() => handleCardClick(currentCards[1])}
        >
          {currentCards[1]}
        </button>
      </div>
      
      <Timer 
        key={timerKey} 
        initialTime={timerDuration} 
        onTimeEnd={handleTimeEnd} 
      />

      
    </div>
  );
}

export default CardPair;