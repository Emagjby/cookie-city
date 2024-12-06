import React, { useState, useEffect } from 'react';
import styles from '../styles/Shop.module.css';
import { format } from 'prettier';

function CPSUpgrades({
  cookies,
  setCookies,
  CPSMultiplier,
  setCPS,
  formatCurrency,
}) {
  const [upgrades, setUpgrades] = useState([]);
  const [hoveredUpgrade, setHoveredUpgrade] = useState(null); // to track hovered upgrade
  const [disabledButtons, setDisabledButtons] = useState([]); // Track temporarily disabled buttons
  const [recentlyUpgraded, setRecentlyUpgraded] = useState([]); // Track recently upgraded upgrades

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

      handleBoughtItem(id);
    } else {
      console.log('Needs ' + (price - cookies) + ' more cookies to buy');
      handleInvalidClick(upgrade.id);
    }
  };

  const handleInvalidClick = (id) => {
    setDisabledButtons((prev) => [...prev, id]); // Disable the button temporarily

    setTimeout(() => {
      setDisabledButtons((prev) => prev.filter((btnId) => btnId !== id)); // Re-enable after 1.5s
    }, 500);
  };

  const handleBoughtItem = (id) => {
    setRecentlyUpgraded((prev) => [...prev, id]); // Add the ID to the recentlyUpgraded array

    setTimeout(() => {
      setRecentlyUpgraded((prev) => prev.filter((btnId) => btnId !== id));
    }, 350);
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

    // Add owned upgrades first
    for (const upgrade of upgrades) {
      if (upgrade.owned > 0) {
        visibleUpgrades.push(upgrade);
        unlockedCount++;
      }
    }

    // Add available upgrades (first `???` or unlockable upgrades)
    const remainingUpgrades = upgrades.slice(unlockedCount);

    // Add the next unlockable upgrade (up to 2 visible ones)
    for (let i = 0; i < 4; i++) {
      if (i == 0) {
        visibleUpgrades.push({ ...remainingUpgrades[i], isGray: false });
      } else if (i == 1) {
        visibleUpgrades.push({ ...remainingUpgrades[i], isGray: true });
      } else {
        // Add ??? for subsequent upgrades
        visibleUpgrades.push({
          ...remainingUpgrades[i],
          name: '???',
          isGray: false,
        });
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
              className={`${styles.CPSUpgrade} ${
                disabledButtons.includes(upgrade.id)
                  ? styles.disabled
                  : recentlyUpgraded.includes(upgrade.id)
                    ? styles.recentlyUpgraded
                    : ''
              }`}
              onClick={() => {
                if (upgrade.name !== '???' && !upgrade.isGray) {
                  handleClick(upgrade.id);
                } else {
                  handleInvalidClick(upgrade.id);
                }
              }}
              onMouseEnter={() => setHoveredUpgrade(upgrade)}
              onMouseLeave={() => setHoveredUpgrade(null)}
              style={{
                cursor:
                  upgrade.name === '???'
                    ? 'not-allowed'
                    : upgrade.isGray
                      ? 'not-allowed'
                      : 'pointer',
                backgroundColor:
                  upgrade.name !== '???'
                    ? disabledButtons.includes(upgrade.id)
                      ? null
                      : upgrade.isGray
                        ? 'rgba(255, 255, 255, 0.5)'
                        : recentlyUpgraded.includes(upgrade.id)
                          ? null
                          : 'rgba(44, 62, 80, 0.95)'
                    : disabledButtons.includes(upgrade.id)
                      ? null
                      : 'rgba(255, 255, 255, 0.5)',
                color:
                  upgrade.name !== '???'
                    ? disabledButtons.includes(upgrade.id)
                      ? null
                      : upgrade.isGray
                        ? 'rgba(0, 0, 0, 1)'
                        : 'rgba(255, 255, 255, 1)'
                    : disabledButtons.includes(upgrade.id)
                      ? null
                      : recentlyUpgraded.includes(upgrade.id)
                        ? null
                        : 'rgba(0, 0, 0, 1)',
              }}
            >
              <h2>{upgrade.name}</h2>
              <p>
                Price:{' '}
                {formatCurrency(
                  calculateUpgradePrice(upgrade.basePrice, upgrade.owned)
                )}
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
              {formatCurrency(
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
                {formatCurrency(
                  Math.floor(hoveredUpgrade.baseCPSGain * CPSMultiplier)
                )}{' '}
                Cookies per second
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
