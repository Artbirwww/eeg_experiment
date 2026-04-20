import React from 'react';
import styles from './CompleteScreen.module.css';

const CompleteScreen = ({ results }) => {
  return (
    <div className={styles.completeScreen}>
      <h1>Эксперимент завершен</h1>
      <p>Спасибо за участие!</p>
      {results.length > 0 && (
        <div className={styles.resultsSummary}>
          <h3>Результаты сессии</h3>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CompleteScreen;