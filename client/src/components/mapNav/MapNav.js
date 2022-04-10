import React from 'react';
import styles from './MapNav.module.css';
import GetFuel from '../../newgetfuel.png';
import EditUser from '../../pages/edituser/EditUser';
import { Link, useHistory } from 'react-router-dom';

function MapNav({ userInfo, isLogin, logoutHandler, axiosInstance }) {
  const history = useHistory();

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
            <a>
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
                <Link to='signup'>
                  <span>Sign up</span>
                </Link>
              )}
            </a>
          </span>
          <a>
            {isLogin ? (
              <span onClick={handleLogout}>Sign Out</span>
            ) : (
              <span>Login</span>
            )}
          </a>
        </div>
      </div>
    </>
  );
}

export default MapNav;
