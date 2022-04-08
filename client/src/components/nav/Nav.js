import React from 'react';
import styles from './Nav.module.css';
import GetFuel from '../../newgetfuel.png';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className={styles.nav}>
      <Link to='/'>
        <img className={styles.logo} src={GetFuel} />
      </Link>
      <div className={styles.menu}>
        <a href='signup'>Sign Up</a>
        <a href='login'>Login</a>
      </div>
    </div>
  );
}

export default Nav;
