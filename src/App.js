import React, { useState, useEffect } from 'react';
import CookieCounter from './components/CookieCounter';
import CookieButton from './components/CookieButton';
import { PresentationalFloatingTexts } from './components/FloatingText';
import { formatCurrency } from './utils/CookieManager';

function App() {
  const [cookies, setCookies] = useState(0);
  const [CPS, setCPS] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [floatingTexts, setFloatingTexts] = useState([]);

  // Handles cookie button click and generates floating text
  const handleCookieButtonClick = (event) => {
    setCookies((prev) => prev + clickValue); // Increment cookies by the click value
    const id = Date.now(); // Generate a unique ID for each floating text
    const randomXOffset = Math.floor(Math.random() * (20 + 1)) - 10; // Calculate random horizontal offset
    const x = event.clientX + randomXOffset; // Get X position with random offset
    const y = event.clientY - 10; // Set Y position 10 pixels above the cursor

    // Add a new floating text to the state
    setFloatingTexts((prev) => [
      ...prev,
      { id, value: `+${clickValue}`, x, y },
    ]);
  };

  // Removes floating text after animation completes
  const handleRemove = (id) => {
    setFloatingTexts((prev) => prev.filter((text) => text.id !== id)); // Remove the text with matching ID
  };

  return (
    <div className="container">
      <div className="section">
        <CookieCounter
          formatCurrency={formatCurrency}
          cookies={cookies}
          cps={CPS}
        />
        <CookieButton onClick={handleCookieButtonClick} />
        <PresentationalFloatingTexts
          floatingTexts={floatingTexts}
          handleRemove={handleRemove}
        />
      </div>
      <div className="section"></div>
      <div className="section"></div>
      <div className="navbar"></div>
    </div>
  );
}

export default App;
