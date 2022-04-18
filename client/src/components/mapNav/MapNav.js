import React from 'react';
import styles from './MapNav.module.css';
import GetFuel from '../../newgetfuel.png';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function MapNav({ isLogin, setIsLogin, axiosInstance, userInfo }) {
  const history = useHistory();
  const loginType = userInfo.loginType;

  const handleLogout = async () => {
    console.log(userInfo);
    if (loginType === 'user') {
      await axiosInstance('/auth/signout');
      setIsLogin(false);
      history.push('/');
    } else if (loginType === 'kakao') {
      await axios
        .delete(`http://localhost:8080/auth/oauth/signout`, {
          data: {
            kakaoAccessToken: userInfo.kakaoAccessToken,
            loginType,
          },
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
              client_id:
                '779018207520-qvftar8nin7c9bqo0q4ouk4mtj7gb6lc.apps.googleusercontent.com',
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
