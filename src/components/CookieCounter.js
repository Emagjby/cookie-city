import React from 'react';
import styles from '../styles/CookieCounter.module.css';

function CookieCounter(props) {
  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>
        Cookies: {props.formatCookies(props.cookies)}
      </h1>
    </div>
  );
}

export default CookieCounter;
