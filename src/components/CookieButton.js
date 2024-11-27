import React from 'react';
import styles from '../styles/CookieButton.module.css';
import cookieImage from '../images/cookie.png';

function CookieButton(props) {
  return (
    <div className={styles.container}>
      <img
        src={cookieImage}
        alt="Cookie Image"
        className={styles.image}
        onClick={props.onClick}
      />
    </div>
  );
}

export default CookieButton;
