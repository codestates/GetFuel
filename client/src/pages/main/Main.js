import React from 'react';
import styles from './Main.module.css';
import Nav from '../../components/nav/Nav';
import image2 from '../../img/cooltext.png';
import logoabr from '../../img/logobar.png';
import google from '../../img/google.png';
import kakao from '../../img/kakao.png';
import { useHistory } from 'react-router-dom';

export default function Main() {
  const history = useHistory();
  const getKakaoCode = () => {
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`
    );
  };

  const getGoogleCode = () => {
    window.location.assign(
      `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&access_type=offline&response_type=code&prompt=consent&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile`
    );
  };

  return (
    <div>
      <Nav />
      <div>
        <img className={styles.txtlogo} src={image2} />
      </div>
      <div className={styles.title}>나에게 알맞는 주유소를 찾아보세요!</div>
      <div>
        <div>
          <button className={styles.Tutorial} onClick={getGoogleCode}>
            <img src={google} />
          </button>
        </div>
        <div>
          <button className={styles.kakao} onClick={getKakaoCode}>
            <img src={kakao} />
          </button>
        </div>

        <div>
          <button
            className={styles.Tutorial}
            onClick={() => history.push('/map')}
          >
            <img src={logoabr} />
          </button>
        </div>
      </div>
    </div>
  );
}
