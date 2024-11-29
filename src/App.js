import React, { useState } from 'react';
import CookieCounter from './components/CookieCounter';
import CookieButton from './components/CookieButton';
import { PresentationalFloatingTexts } from './components/FloatingText';
import CookieManager from './utils/CookieManager';
import CPSUpgrades from './components/CPSUpgrades';
import OneTimeUpgrades from './components/OneTimeUpgrades';

function App() {
  const [cookies, setCookies] = useState(0);
  const [CPS, setCPS] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [floatingTexts, setFloatingTexts] = useState([]);

  return (
    <div className="container">
      <div className="section" id="Clicker">
        <CookieCounter
          formatCurrency={CookieManager.formatCurrency}
          cookies={cookies}
          cps={CPS}
        />
        <CookieButton
          onClick={(event) =>
            CookieManager.handleCookieButtonClick(
              event,
              setCookies,
              setFloatingTexts,
              clickValue
            )
          }
        />
        <PresentationalFloatingTexts
          floatingTexts={floatingTexts}
          handleRemove={CookieManager.handleRemove}
          setFloatingTexts={setFloatingTexts}
        />
      </div>
      <div className="section"></div>
      <div className="section" id="Shop">
        <h1 id="Shop">Shop</h1>
        <OneTimeUpgrades />
        <CPSUpgrades />
      </div>
      <div className="navbar"></div>
    </div>
  );
}

export default App;
