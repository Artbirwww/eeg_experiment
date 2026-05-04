// components/Completion/Completion.tsx
import React from 'react';
import Button from '../Button/Button';
import styles from './Completion.module.css';

interface Props {
  onReset: () => void;
}

const Completion: React.FC<Props> = ({ onReset }) => {
  return (
    <div className={styles.container}>
      <h2>✅ Сессия завершена</h2>
      <p>Эксперимент окончен. Спасибо за участие!</p>
      <Button onClick={onReset}>Начать заново</Button>
    </div>
  );
};

export default Completion;