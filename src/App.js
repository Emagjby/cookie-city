import React, { useEffect, useState } from 'react';
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
  const [CPSMultiplier, setCPSMultiplier] = useState(1);
  const [clickValueMultiplier, setClickValueMultiplier] = useState(1);
  const [floatingTexts, setFloatingTexts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCookies((prevCookies) => prevCookies + CPS * CPSMultiplier);
    }, 1000);

    return () => clearInterval(interval);
  }, [CPS]);

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
              clickValue,
              clickValueMultiplier
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
        <OneTimeUpgrades
          cookies={cookies}
          setCookies={setCookies}
          setCPSMultiplier={setCPSMultiplier}
          setClickValueMultiplier={setClickValueMultiplier}
        />
        <CPSUpgrades />
      </div>
      <div className="navbar"></div>
    </div>
  );
}

export default App;
