import React from 'react';
import styles from './MapNav.module.css';
import GetFuel from '../../newgetfuel.png';
import EditUser from '../../pages/edituser/EditUser';
import { coordiEPSTtoKATEC } from '../../utils/coordinate';
import { Link, useHistory } from 'react-router-dom';

function MapNav({ userInfo, isLogin }) {
  // console.log(userInfo);
  const history = useHistory();
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
          <a href='login'>Login</a>
        </div>
      </div>
    </>
  );
}

export default MapNav;
