import React, { Component } from 'react';
import styles from './Main.module.css';
import Nav from '../../components/nav/Nav';
import image2 from '../../cooltext.png';
import kakao from '../../kakao.png';
import google from '../../google.png';
import logoabr from '../../logobar.png';
import { getKakaoCode } from '../oauth/KakaoOAuth';
import getGoogleCode from '../oauth/GoogleOAuth';
import { useHistory } from 'react-router-dom';
//import Loading from '../../components/loding/Loding';

export default function Main() {

  const history = useHistory();

  return (
    <div>
      <Nav />
      <div>
        <img className={styles.txtlogo} src={image2} />
      </div>
      <div className={styles.title}>나에게 알맞는 주유소를 찾아보세요!</div>
      <div>
        <div className={styles.button}>
          <div>
              <button className={styles.google} onClick={getGoogleCode} >
                <img src={google} />
              </button>
          </div>
          <div>
            <a href={getKakaoCode} className={styles.kakao}>
              <img src={kakao} />
            </a>
          </div>
            <button className={styles.Tutorial} onClick={() => history.push('/map')}>
              <img src={logoabr} />
            </button>
        </div>

      </div>
    </div>
  );
}
