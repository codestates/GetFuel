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
                <Link to='signup'>
                    <button className={styles.signup}><span>Sign up</span></button>
                </Link>
                <Link to='login'>
                    <button className={styles.login}>Login</button>
                </Link>
            </div>
        </div>
    )
  
}

export default Nav;


