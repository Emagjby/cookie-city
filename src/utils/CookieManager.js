import { click } from '@testing-library/user-event/dist/click';

function formatCurrency(number) {
  if (isNaN(number) || number === null || number === undefined) {
    return 'Invalid number';
  }

  const units = [
    '',
    'K',
    'M',
    'B', // Billion
    'T', // Trillion
    'Qa', // Quadrillion
    'Qi', // Quintillion
    'Sx', // Sextillion
  ];

  const allUnits = [...units];

  let unitIndex = 0;

  while (number >= 1000 && unitIndex < allUnits.length - 1) {
    number /= 1000;
    unitIndex++;
  }

  return `${parseFloat(number.toFixed(3))}${allUnits[unitIndex]}`;
}

export const handleCookieButtonClick = (
  event,
  setCookies,
  setFloatingTexts,
  clickValue,
  clickValueMultiplier
) => {
  setCookies((prev) => prev + clickValue * clickValueMultiplier);
  const id = Date.now();
  const randomXOffset = Math.floor(Math.random() * 21) - 10;
  const x = event.clientX + randomXOffset;
  const y = event.clientY - 10;

  setFloatingTexts((prev) => [
    ...prev,
    { id, value: `+${clickValue * clickValueMultiplier}`, x, y },
  ]);
};

export const handleRemove = (id, setFloatingTexts) => {
  setFloatingTexts((prev) => prev.filter((text) => text.id !== id));
};

const CookieManager = {
  handleCookieButtonClick,
  formatCurrency,
  handleRemove,
};

export default CookieManager;
