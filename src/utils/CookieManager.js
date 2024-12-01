import { click } from '@testing-library/user-event/dist/click';

export function formatCurrency(cookies) {
  const getAlphabeticFormat = (num) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let letters = '';
    let remainder = num;
    while (remainder >= 0) {
      letters = alphabet[remainder % 26] + letters;
      remainder = Math.floor(remainder / 26) - 1;
      if (remainder < 0) break;
    }
    return letters;
  };

  const formatWithPrecision = (value, suffix) => {
    return value.toFixed(3) + suffix;
  };

  if (cookies < 10_000) {
    return cookies.toString();
  } else if (cookies < 1_000_000) {
    return formatWithPrecision(cookies / 1000, '');
  } else if (cookies < 1_000_000_000) {
    return formatWithPrecision(cookies / 1_000_000, 'M');
  } else if (cookies < 1_000_000_000_000) {
    return formatWithPrecision(cookies / 1_000_000_000, 'B');
  } else if (cookies < 1_000_000_000_000_000) {
    return formatWithPrecision(cookies / 1_000_000_000_000, 'T');
  } else {
    const value = cookies / 1_000_000_000_000;
    const alphabeticSuffix = getAlphabeticFormat(value);
    return formatWithPrecision(value, alphabeticSuffix);
  }
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
