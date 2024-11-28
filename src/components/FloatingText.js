import React, { useEffect } from 'react';
import styles from '../styles/FloatingText.module.css';

export const FloatingText = ({ value, x, y, onRemove, id }) => {
  useEffect(() => {
    // Remove this text after 1.5 seconds
    const timer = setTimeout(() => onRemove(id), 1500);
    return () => clearTimeout(timer);
  }, [id, onRemove]);

  return (
    <span
      className={styles.floatingText}
      style={{
        left: x,
        top: y,
      }}
    >
      {value}
    </span>
  );
};

export function PresentationalFloatingTexts({ floatingTexts, handleRemove }) {
  return (
    <>
      {floatingTexts.map(({ id, value, x, y }) => (
        <FloatingText
          key={id}
          id={id}
          value={value}
          x={x}
          y={y}
          onRemove={handleRemove}
        />
      ))}
    </>
  );
}
