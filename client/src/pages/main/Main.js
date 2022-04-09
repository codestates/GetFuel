import React, { Component } from 'react';
import styles from './Main.module.css';
import Nav from '../../components/nav/Nav';
import image2 from '../../image2.png';
import kakao from '../../kakao.png';
import google from '../../google.png';
import getfuletutorial from '../../TutorialLogo.png';
import { getKakaoCode } from '../oauth/KakaoOAuth';
import getGoogleCode from '../oauth/GoogleOAuth';

export default function Main() {
  return (
    <div>
      <Nav />
      <div>
        <img className={styles.image1} src={image2} />
      </div>
      <div className={styles.title}>나에게 알맞는 주유소를 찾아보세요!</div>
      <div>
        <div className={styles.button}>
        <div>
          <a href={getGoogleCode()}>
            <button className={styles.google}>
              <img src={google} />
            </button>
          </a>
        </div>
        <div>
          <a href={getKakaoCode} className={styles.kakao}>
            <img src={kakao} />
          </a>
        </div>
        <div>
          <a href='map' className={styles.Tutorial}>
            <img src={getfuletutorial} />
          </a>
        </div>
        </div>
        <img className={styles.image2} src={image2} />
      </div>
    </div>
  );
}
