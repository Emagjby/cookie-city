import React, { useState, useEffect } from 'react';
import styles from '../styles/Shop.module.css';

function OneTimeUpgrades({
  cookies,
  setCookies,
  setCPSMultiplier,
  setClickValueMultiplier,
}) {
  const [upgrades, setUpgrades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./data/OneTimeUpgradesData.json');
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
    if (upgrade && cookies >= upgrade.price) {
      setUpgrades((prev) =>
        prev.map((upg) => (upg.id === id ? { ...upg, bought: true } : upg))
      );
      setCookies((prev) => prev - upgrade.price);
      upgrade.area == 'cps'
        ? setCPSMultiplier((prev) => prev + upgrade.multiplier)
        : setCPSMultiplier((prev) => prev + 0);
      upgrade.area == 'clickValue'
        ? setClickValueMultiplier((prev) => prev + upgrade.multiplier)
        : setClickValueMultiplier((prev) => prev + 0);
    } else {
      console.log('Not enough cookies to buy this upgrade.');
    }
  };

  const visibleUpgrades = upgrades
    .filter((upgrade) => !upgrade.bought)
    .slice(0, 5);
  const placeholders = Array(5 - visibleUpgrades.length).fill(null);
  const displayUpgrades = [...visibleUpgrades, ...placeholders];

  const [hoveredUpgrade, setHoveredUpgrade] = useState(null);

  return (
    <>
      <div className={styles.withLabel}>
        <p style={{ fontWeight: 600, marginTop: 5, marginLeft: 5 }}>
          One time upgrades:
        </p>
        <div className={styles.oneTimeUpgrades}>
          {displayUpgrades.map((upgrade, index) =>
            upgrade ? (
              <div
                id="clickable"
                key={upgrade.id}
                className={styles.oneTimeUpgrade}
                onClick={() => handleClick(upgrade.id)}
                onMouseEnter={() => setHoveredUpgrade(upgrade)}
                onMouseLeave={() => setHoveredUpgrade(null)}
              >
                <img
                  src={upgrade.image}
                  alt={upgrade.name}
                  className={styles.upgradeImage}
                />
              </div>
            ) : (
              <div
                id="notAllowed"
                key={index + upgrades.length + 1}
                className={styles.placeholder}
              >
                {/* To add a ico of a lock or smth */}
              </div>
            )
          )}
        </div>
      </div>
      {hoveredUpgrade && visibleUpgrades.length > 0 && (
        <div className={styles.infoBox}>
          <h3>{hoveredUpgrade.name}</h3>
          <h6 className={styles.type}>{hoveredUpgrade.type}</h6>
          <p className={styles.price}>Price: {hoveredUpgrade.price} cookies</p>
          <p className={styles.effect}>Effect: {hoveredUpgrade.effect}</p>
          <p className={styles.description}>{hoveredUpgrade.description}</p>
        </div>
      )}
    </>
  );
}

export default OneTimeUpgrades;
