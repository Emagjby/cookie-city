import React from 'react';
import styles from '../styles/CookieButton.module.css';

function CookieButton(props) {
  return (
    <div className={styles.container}>
      <img
        id="clickable"
        src={'/images/cookie.png'}
        alt="Cookie Image"
        className={styles.image}
        onClick={props.onClick}
      />
    </div>
  );
}

export default CookieButton;
