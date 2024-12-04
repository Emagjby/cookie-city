import React, { useState, useEffect } from 'react';
import styles from '../styles/Shop.module.css';

function CPSUpgrades({ cookies, setCookies, CPSMultiplier, setCPS }) {
  const [upgrades, setUpgrades] = useState([]);
  const [hoveredUpgrade, setHoveredUpgrade] = useState(null); // to track hovered upgrade

  const calculateUpgradePrice = (basePrice, owned) => {
    return Math.floor(basePrice * Math.pow(1.1, owned));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/CPSUpgradesData.json');
        const data = await response.json();
        setUpgrades(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (id) => {
    const upgrade = upgrades.find((upg) => upg.id === id);

    // Block interaction with unavailable upgrades
    if (!upgrade || upgrade.name === '???') {
      console.log('This upgrade is not available for purchase.');
      return; // Prevent further action
    }

    const price = calculateUpgradePrice(upgrade.basePrice, upgrade.owned);

    if (cookies >= price) {
      setUpgrades((prev) =>
        prev.map((upg) =>
          upg.id === id ? { ...upg, owned: upg.owned + 1 } : upg
        )
      );
      setCookies((prev) => prev - price); // Deduct cookies when upgrade is bought.

      // Update hoveredUpgrade state to reflect the newly purchased upgrade
      if (hoveredUpgrade && hoveredUpgrade.id === id) {
        setHoveredUpgrade({
          ...hoveredUpgrade,
          owned: hoveredUpgrade.owned + 1,
        });
      }
    } else {
      console.log('Needs ' + (price - cookies) + ' more cookies to buy');
    }
  };

  const calculateTotalCPS = () => {
    let totalCPS = upgrades.reduce((acc, upgrade) => {
      return acc + upgrade.baseCPSGain * upgrade.owned;
    }, 0);

    totalCPS *= CPSMultiplier;

    return totalCPS;
  };

  useEffect(() => {
    setCPS(calculateTotalCPS());
  }, [upgrades, CPSMultiplier]);

  function generateVisibleUpgrades() {
    const visibleUpgrades = [];
    let unlockedCount = 0;

    for (let i = 0; i < upgrades.length; i++) {
      const upgrade = upgrades[i];

      if (upgrade.owned > 0) {
        visibleUpgrades.push(upgrade);
        unlockedCount++;
      }
    }

    for (let i = unlockedCount; i < upgrades.length; i++) {
      const upgrade = upgrades[i];

      if (i === unlockedCount) {
        visibleUpgrades.push(upgrade); // Show the first "???" upgrade after owned upgrades
      }

      if (i === unlockedCount + 1) {
        visibleUpgrades.push(upgrade); // Show the first "???" upgrade after owned upgrades
      }

      if (i === unlockedCount + 2 || i === unlockedCount + 3) {
        visibleUpgrades.push({ ...upgrade, name: '???' }); // Show "???" for subsequent upgrades
      }
    }

    return visibleUpgrades;
  }

  const visibleUpgrades = generateVisibleUpgrades();

  return (
    <>
      <div className={styles.cpsUpgrades}>
        {visibleUpgrades.length > 0 ? (
          visibleUpgrades.map((upgrade) => (
            <div
              id="clickable"
              key={upgrade.id}
              className={styles.CPSUpgrade}
              onClick={() => {
                if (upgrade.name !== '???') {
                  handleClick(upgrade.id);
                }
              }}
              onMouseEnter={() => setHoveredUpgrade(upgrade)}
              onMouseLeave={() => setHoveredUpgrade(null)}
              style={{
                cursor: upgrade.name === '???' ? 'not-allowed' : 'pointer',
                backgroundColor:
                  upgrade.name !== '???'
                    ? 'rgba(44, 62, 80, 0.95)'
                    : 'rgba(0, 0, 0, 0.5)',
              }}
            >
              <h2>{upgrade.name}</h2>
              <p>
                Price: {calculateUpgradePrice(upgrade.basePrice, upgrade.owned)}
              </p>
            </div>
          ))
        ) : (
          <p>No upgrades available</p>
        )}
      </div>
      {hoveredUpgrade && visibleUpgrades.length > 0 && (
        <div className={styles.infoBoxCPS}>
          <div className={styles.nameAndPrice}>
            <h3>{hoveredUpgrade.name}</h3>
            <p className={styles.price}>
              Price:{' '}
              {Math.floor(
                calculateUpgradePrice(
                  hoveredUpgrade.basePrice,
                  hoveredUpgrade.owned
                )
              )}{' '}
              cookies
            </p>
          </div>
          {hoveredUpgrade.name !== '???' && (
            <p className={styles.effect}>
              <strong>Each</strong> {hoveredUpgrade.name} produces{' '}
              <strong>
                {Math.floor(hoveredUpgrade.baseCPSGain * CPSMultiplier)} Cookies
                per second
              </strong>
              <br />
              {hoveredUpgrade.owned !== 0 && (
                <>
                  <strong>
                    {hoveredUpgrade.owned} {hoveredUpgrade.name}
                    {hoveredUpgrade.owned > 1 ? 's' : ''}
                  </strong>{' '}
                  producing{' '}
                  <strong>
                    {Math.floor(
                      hoveredUpgrade.baseCPSGain *
                        CPSMultiplier *
                        hoveredUpgrade.owned
                    )}{' '}
                    Cookies per second
                  </strong>
                </>
              )}
            </p>
          )}
          <p className={styles.description}>
            {(hoveredUpgrade.name !== '???' && hoveredUpgrade.description) ||
              '???'}
          </p>
        </div>
      )}
    </>
  );
}

export default CPSUpgrades;
