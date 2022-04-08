import React from 'react';
import styles from './MapNav.module.css';
import GetFuel from '../../newgetfuel.png';
import EditUser from '../../pages/edituser/EditUser';
import { Link, useHistory } from 'react-router-dom';

function MapNav({ userInfo, isLogin, logoutHandler, axiosInstance }) {
  const history = useHistory();
  console.log(userInfo.authorization);

  const handleLogout = () => {
    const authorization = userInfo.accessToken;
    axiosInstance
      .get('/auth/signout', {
        headers: { Authorization: `Bearer ${authorization}` },
        withCredentials: true,
      })
      .then(() => logoutHandler(), history.push('/'))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className={styles.nav}>
        <img className={styles.logo} src={GetFuel} />
        <div className={styles.menu}>
          <span>
            <a href='/edituser'>
              {isLogin ? (
                <span
                  onClick={() => {
                    history.push({
                      pathname: '/edituser',
                      state: { userInfo: userInfo },
                    });
                  }}
                >
                  Your Profile
                </span>
              ) : (
                <a href='signup'>
                  <span>Sign up</span>
                </a>
              )}
            </a>
          </span>
          <a>
            {isLogin ? (
              <span onClick={handleLogout}>Logout</span>
            ) : (
              <spa>Login</spa>
            )}
          </a>
        </div>
      </div>
    </>
  );
}

export default MapNav;
