// components/DevButton/DevButton.tsx
import React from 'react';
import styles from './DevButton.module.css';

interface DevButtonProps {
  onClick: () => void;
  visible: boolean;
}

const DevButton: React.FC<DevButtonProps> = ({ onClick, visible }) => {
  console.log('DevButton render, visible:', visible);
  
  if (!visible) return null;

  return (
    <button className={styles.devButton} onClick={onClick} type="button">
      ⚡ Пропустить калибровку
    </button>
  );
};

export default DevButton;