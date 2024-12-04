import React, { useEffect } from 'react';
import styles from '../styles/FloatingText.module.css';

export const FloatingText = ({
  value,
  x,
  y,
  onRemove,
  id,
  setFloatingTexts,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id, setFloatingTexts); // Remove after 1 second
    }, 1000);
    return () => clearTimeout(timer); // Cleanup the timer
  }, [id, onRemove, setFloatingTexts]);

  return (
    <span
      className={styles.floatingText}
      style={{
        left: x,
        top: y,
      }}
    >
      +
      {parseFloat(value) < 100
        ? parseFloat(value).toFixed(1)
        : parseFloat(value).toFixed(0)}
    </span>
  );
};

export function PresentationalFloatingTexts({
  floatingTexts,
  handleRemove,
  setFloatingTexts,
}) {
  if (!Array.isArray(floatingTexts)) {
    return <div>Error: floatingTexts is not an array!</div>;
  }

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
          setFloatingTexts={setFloatingTexts} // Pass down setFloatingTexts
        />
      ))}
    </>
  );
}
