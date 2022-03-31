import React from 'react'
<<<<<<< HEAD
import styles from './Nav.module.css'
=======
import './nav.css'
>>>>>>> c9b8d8d1c90ddf63f80f21002627f1f7a0364802
import GetFuel from '../GetFuel_logo.png'


function Nav () {
    return (
<<<<<<< HEAD
        <div className={styles.nav}>
                <img className={styles.logo} src={GetFuel} />
                <div className={styles.menu}>
                <a href='signup'>Sign up</a>
=======
        <div className='nav'>
                <img className='logo' src={GetFuel} />
                <div className='menu'>
                <a href=''>Sign up</a>
>>>>>>> c9b8d8d1c90ddf63f80f21002627f1f7a0364802
                <a href='login'>Login</a>
                </div>
            </div>
    )
}

export default Nav;