import React, { useState, useEffect } from 'react';
import CookieCounter from './components/CookieCounter';
import CookieButton from './components/CookieButton';
import { formatCookies } from './utils/CookieManager';

function App() {
  const [cookies, setCookies] = useState(0);
  const [clickValue, setClickValue] = useState(100);

  const handleCookieButtonClick = () => setCookies((prev) => prev + clickValue);

  return (
    <div className="container">
      <div className="section">
        <CookieCounter formatCookies={formatCookies} cookies={cookies} />
        <CookieButton onClick={handleCookieButtonClick} />
      </div>
      <div className="section"></div>
      <div className="section"></div>
      <div className="navbar"></div>
    </div>
  );
}

export default App;
