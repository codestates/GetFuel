import React from 'react';
import styles from './MapNav.module.css';
import GetFuel from '../../newgetfuel.png';
import { Link, useHistory } from 'react-router-dom';

function MapNav({ isLogin, setIsLogin, axiosInstance }) {
  const history = useHistory();

  const handleLogout = async () => {
    setIsLogin(false);

    await axiosInstance('/auth/signout');
    history.push('/');
  };

  return (
    <>
      <div className={styles.nav}>
        <img className={styles.logo} src={GetFuel} />
        <div className={styles.menu}>
          {isLogin ? (
            <button
              className={styles.btn}
              onClick={() => history.push('/edituser')}
            >
              Edit Profile
            </button>
          ) : (
            <button
              className={styles.btn}
              onClick={() => history.push('/signup')}
            >
              Sign Up
            </button>
          )}

          {isLogin ? (
            <button className={styles.btn} onClick={handleLogout}>
              Sign Out
            </button>
          ) : (
            <Link to="login">
              <button
                className={styles.btn}
                onClick={() => history.push('/signin')}
              >
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default MapNav;
