import React from 'react';
import styles from './Nav.module.css';
import GetFuel from '../../newgetfuel.png';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <div className={styles.nav}>
            <img className={styles.logo} src={GetFuel} />
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


