import React from 'react';
import styles from '../styles/CookieCounter.module.css';

function CookieCounter(props) {
  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>
        {/* COOKIES COUNTER */}
        Cookies: {Math.floor(props.formatCurrency(props.cookies))}
      </h1>
      <h1 className={styles.cps}>
        {/* CPS COUNTER:*/}
        CPS: {Math.floor(props.formatCurrency(props.cps))}
      </h1>
    </div>
  );
}

export default CookieCounter;
