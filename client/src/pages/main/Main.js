import React, { useEffect, useState } from 'react';
import styles from './Main.module.css';
import Nav from '../../components/nav/Nav';
import image2 from '../../cooltext.png';
import logoabr from '../../logobar.png';
import google from '../../google.png';
import kakao from '../../kakao.png';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Loading from '../../components/loding/Loding';

export default function Main({ loginHandler }) {
  const [isLoading, setIsLoading] = useState(true);

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

  const history = useHistory();
  const getAccessToken = (authorizationCode) => {
    if (authorizationCode) {
      axios
        .get(
          `http://localhost:8080/oauth/kakao/login`,
          {
            params: { authorizationCode },
          },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        )
        .then((res) => {
          loginHandler(res.data);
          history.push('/map');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    if (authorizationCode) {
      getAccessToken(authorizationCode);
    }
    setIsLoading(false);
  }, []);

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
      <div>{isLoading ? <Loading /> : null}</div>
    </div>
  );
}
