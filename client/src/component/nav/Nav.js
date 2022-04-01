import React from 'react'
import styles from './Nav.module.css'
import GetFuel from '../GetFuel_logo.png'


function Nav () {
    return (
        <div className={styles.nav}>
                <img className={styles.logo} src={GetFuel} />
                <div className={styles.menu}>
                <a href='signup'>Sign up</a>
                <a href='login'>Login</a>
                </div>
            </div>
    )
}

export default Nav;