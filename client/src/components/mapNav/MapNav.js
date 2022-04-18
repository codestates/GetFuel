import React from 'react';
import styles from './MapNav.module.css';
import GetFuel from '../../newgetfuel.png';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function MapNav({ isLogin, setIsLogin, axiosInstance, userInfo }) {
  const history = useHistory();

  const access_token = userInfo.access_token;
  const loginType = userInfo.loginType;

  const handleLogout = async () => {
    if (loginType === 'user') {
      await axiosInstance('/auth/signout');
      setIsLogin(false);
      history.push('/');
    } else if (loginType === 'kakao') {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}/auth/oauth/signout`, {
          data: { access_token: access_token, loginType: loginType },
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        .then((res) => {
          setIsLogin(false);
          history.push('/');
        });
    } else if (loginType === 'google') {
      if (!window.gapi.auth2) {
        window.gapi.load('auth2', function () {
          window.gapi.auth2
            .init({
              client_id: process.env.REACT_APP_CLIENTID,
              scope: 'email',
            })
            .then(() => {
              if (window.gapi) {
                const auth2 = window.gapi.auth2.getAuthInstance();
                if (auth2 != null) {
                  auth2
                    .signOut()
                    .then(
                      auth2
                        .disconnect()
                        .then(() => console.log('LOGOUT SUCCESSFUL'))
                    );
                  setIsLogin(false);
                  history.push('/');
                }
              }
            });
        });
      }
    }
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
            <Link to='login'>
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
