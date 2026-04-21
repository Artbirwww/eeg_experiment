import React from 'react';
import styles from './Instruction.module.css';


const Instruction = ({ onStartTraining }) => {
  return (
    <div className={styles.instruction}>
      <h1>Инструкция для испытуемого</h1>
      <div className={styles.content}>
        <p>На экране будут появляться две картинки</p>
        <p>Сначала нужно просто смотреть, а не выбирать</p>
        <p>Потом появится сигнал на выбор (F или J)</p>
        <p>Выбор делается клавишами <kbd>F</kbd> или <kbd>J</kbd></p>
        <p>Отвечайте быстро, но без суеты</p>
        <p>Если ошиблись, скажите "Ошибка" и продолжайте</p>
      </div>
      <div className={styles.keyVisual}>
        <div className={styles.keyLeft}>F ←</div>
        <div className={styles.keyRight}>→ J</div>
      </div>
      <button className={styles.startBtn} onClick={onStartTraining}>
        Начать тренировку
      </button>
    </div>
  );
};

export default Instruction;