import React, { useState } from 'react';

export function formatCookies(cookies) {
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

  if (cookies < 1000) {
    return cookies.toString(); // No formatting needed for values less than 1000
  } else if (cookies < 1_000_000) {
    // Format for thousands (K)
    const formatted = (cookies / 1000).toFixed(3); // 3 decimal places
    return parseFloat(formatted).toString() + 'K'; // Remove leading zeros
  } else if (cookies < 1_000_000_000) {
    // Format for millions (M)
    const formatted = (cookies / 1_000_000).toFixed(3); // 3 decimal places
    return parseFloat(formatted).toString() + 'M';
  } else if (cookies < 1_000_000_000_000) {
    // Format for billions (B)
    const formatted = (cookies / 1_000_000_000).toFixed(3); // 3 decimal places
    return parseFloat(formatted).toString() + 'B';
  } else if (cookies < 1_000_000_000_000_000) {
    // Format for trillions (T)
    const formatted = (cookies / 1_000_000_000_000).toFixed(3); // 3 decimal places
    return parseFloat(formatted).toString() + 'T';
  } else {
    // After trillions, use the alphabetic system
    const alphabeticSuffix = getAlphabeticFormat(cookies / 1_000_000_000_000);
    return (
      parseFloat((cookies / 1_000_000_000_000).toFixed(3)).toString() +
      alphabeticSuffix
    );
  }
}
