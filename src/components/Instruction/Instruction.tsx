// components/Instruction/Instruction.tsx
import React, { useState } from 'react';
import Button from '../Button/Button';
import styles from './Instruction.module.css';

interface Props {
  onComplete: () => void;
}

const Instruction: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const texts = [
    "На экране будут появляться две картинки. Сначала просто смотрите, не выбирайте.",
    "Потом появится сигнал 'F или J?'. Нажмите F для левой картинки, J для правой.",
    "Отвечайте быстро, но без суеты. Если нажали не ту клавишу, скажите 'Ошибка' и продолжайте.",
    "Соответствие клавиш: F - ЛЕВАЯ картинка, J - ПРАВАЯ картинка."
  ];

  const next = () => {
    if (step < texts.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.text}>{texts[step]}</div>
      <Button onClick={next}>Далее</Button>
    </div>
  );
};

export default Instruction;