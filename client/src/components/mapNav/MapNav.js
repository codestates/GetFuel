import React from 'react';
import styles from './MapNav.module.css';
import GetFuel from '../../img/newgetfuel.png';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function MapNav({ isLogin, setIsLogin, axiosInstance, userInfo, loginType }) {
  const history = useHistory();

  const handleLogout = async () => {
    if (loginType === 'user') {
      await axiosInstance('/auth/signout');
      setIsLogin(false);
      history.push('/');
    } else if (loginType === 'kakao') {
      await axios.post(`http://localhost:8080/auth/oauth/signout`, {
        data: {
          kakaoAccessToken: userInfo.kakaoAccessToken,
          loginType,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      setIsLogin(false);
      history.push('/');
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
                  auth2.signOut().then(
                    auth2.disconnect().then(() => {
                      console.log('LOGOUT SUCCESSFUL');
                    })
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
          {isLogin && loginType === 'user' ? (
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
            <>
              <button
                className={styles.btn}
                onClick={() => history.push('/login')}
              >
                Login
              </button>
              <button
                className={styles.btn}
                onClick={() => history.push('/signup')}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MapNav;
