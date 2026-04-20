import React from 'react';
import styles from './ExperimenterPanel.module.css';

const ExperimenterPanel = ({ onManualNext }) => {
  return (
    <div className={styles.experimenterPanel}>
      <h2>Панель экспериментатора</h2>
      <button onClick={() => onManualNext('instruction')}>Показать инструкцию</button>
      <button onClick={() => onManualNext('calibration1')}>Перейти к калибровке</button>
      <button onClick={() => onManualNext('experiment1')}>Запустить эксперимент</button>
    </div>
  );
};

export default ExperimenterPanel;