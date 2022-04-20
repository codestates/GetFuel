import React from 'react';
import styles from './Nav.module.css';
import GetFuel from '../../img/newgetfuel.png';
import { useHistory } from 'react-router-dom';

function Nav() {
  const history = useHistory();

  return (
    <div className={styles.nav}>
      <img className={styles.logo} src={GetFuel} />
      <div className={styles.menu}>
        <button
          className={styles.signup}
          onClick={() => history.push('/signup')}
        >
          <span>Sign up</span>
        </button>

        <button className={styles.login} onClick={() => history.push('/login')}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Nav;
