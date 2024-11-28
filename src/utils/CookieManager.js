import React, { useState } from 'react';

export function formatCurrency(cookies) {
  // Helper function to generate the alphabetic format (AA, AB, AC...)
  const getAlphabeticFormat = (num) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let letters = '';
    let remainder = num;

    // Generate alphabetic suffix (e.g., AA, AB, AC...)
    while (remainder >= 0) {
      letters = alphabet[remainder % 26] + letters;
      remainder = Math.floor(remainder / 26) - 1;
      if (remainder < 0) break;
    }

    return letters;
  };

  const formatWithPrecision = (value, suffix) => {
    // Retain three decimal places, trimming unnecessary zeros
    return value.toFixed(3) + suffix;
  };

  if (cookies < 10_000) {
    return cookies.toString(); // No formatting needed for values less than 1000
  } else if (cookies < 1_000_000) {
    // Format for thousands (no K, only .)
    return formatWithPrecision(cookies / 1000, '');
  } else if (cookies < 1_000_000_000) {
    // Format for millions (M)
    return formatWithPrecision(cookies / 1_000_000, 'M');
  } else if (cookies < 1_000_000_000_000) {
    // Format for billions (B)
    return formatWithPrecision(cookies / 1_000_000_000, 'B');
  } else if (cookies < 1_000_000_000_000_000) {
    // Format for trillions (T)
    return formatWithPrecision(cookies / 1_000_000_000_000, 'T');
  } else {
    // After trillions, use the alphabetic system
    const value = cookies / 1_000_000_000_000;
    const alphabeticSuffix = getAlphabeticFormat(value);
    return formatWithPrecision(value, alphabeticSuffix);
  }
}
