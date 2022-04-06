import React from 'react';
import styles from './MapNav.module.css';
import GetFuel from '../../newgetfuel.png';

function MapNav() {
  return (
    <div className={styles.nav}>
      <img className={styles.logo} src={GetFuel} />
      <div className={styles.menu}>
        <a href="signup">Sign up</a>
        <a href="login">Login</a>
      </div>
    </div>
  );
}

export default MapNav;
