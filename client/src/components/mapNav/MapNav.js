import React from 'react';
import styles from './MapNav.module.css';
import GetFuel from '../../newgetfuel.png';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function MapNav({ isLogin, setIsLogin, axiosInstance, userInfo }) {
  const history = useHistory();
  const handleLogout = async () => {
    const loginType = userInfo.loginType;
    if (loginType === 'user') {
      await axiosInstance('/auth/signout');
      setIsLogin(false);
      history.push('/');
    } else if (loginType === 'kakao') {
      await axios
        .post(`http://localhost:8080/auth/oauth/signout`, {
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
      const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
      await axios.post(`http://localhost:8080/auth/oauth/signout`, {
        data: {
          loginType,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (!window.gapi.auth2) {
        window.gapi.load('auth2', function () {
          window.gapi.auth2
            .init({
              client_id: client_id,
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
                  console.log('작동?');
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
          {isLogin && localStorage.getItem('loginType') === 'user' ? (
            <button
              className={styles.btn}
              onClick={() => history.push('/edituser')}
            >
              Edit Profile
            </button>
          ) : (
            <div></div>
          )}

          {isLogin ? (
            <button className={styles.btn} onClick={handleLogout}>
              Sign Out
            </button>
          ) : (
            <Link to='signup'>
              <button className={styles.btn}>Sign up</button>
            </Link>
          )}
          {}
        </div>
      </div>
    </>
  );
}

export default MapNav;
