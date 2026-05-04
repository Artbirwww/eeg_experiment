// components/ImageCard/ImageCard.tsx
import React, { useState, useEffect } from 'react';
import styles from './ImageCard.module.css';

interface ImageCardProps {
  imageId: string;
  category: string;
  side: 'left' | 'right';
  isActive?: boolean;
  onClick?: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageId, category, side, isActive, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const imagePath = `/EEG_choice/${category}_${imageId.padStart(2, '0')}.png`;

  console.log('Loading image:', imagePath);

  return (
    <button
      className={`${styles.card} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      disabled={!isActive}
    >
      <div className={styles.imageWrapper}>
        {!imageError ? (
          <img
            src={imagePath}
            alt={`${category} ${imageId}`}
            className={styles.image}
            onError={() => {
              console.error('Failed to load image:', imagePath);
              setImageError(true);
            }}
          />
        ) : (
          <div className={styles.errorPlaceholder}>
            <div>{category}</div>
            <div>{imageId}</div>
          </div>
        )}
        <div className={styles.label}>{category} {imageId}</div>
      </div>
      <div className={styles.sideLabel}>{side === 'left' ? 'F' : 'J'}</div>
    </button>
  );
};

export default ImageCard;