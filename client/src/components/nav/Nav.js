import React from 'react'
import GetFuel from '../../GetFuel.png'
import styles from './Nav.module.css'




function Nav () {
    return (
        <div className={styles.nav}>
                <img className={styles.logo} src={GetFuel} />
                <div className={styles.menu}>
                <a href='signup'><div className={styles.button}>Sign up</div></a>
                <a href='login'><div className={styles.button}>Login</div></a>
                </div>
            </div>
    )
}

export default Nav;