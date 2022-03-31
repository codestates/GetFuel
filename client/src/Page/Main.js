import React, { Component } from 'react';
import styles from './Main.module.css';
import Nav from '../component/nav';
import image2 from '../image2.png';
import kakao from '../kakao.png';
import google from '../google.png';
import getfuel_experience from '../getfuel_experience.png';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Nav />
        <div>
          <img className={styles.image1} src={image2} />
        </div>
        <div className={styles.title}>나에게 알맞는 주유소를 찾아보세요!</div>
        <div>
          <div>
            <button className={styles.google}>
              <img src={google} />
            </button>
          </div>
          <div>
            <button className={styles.kakao}>
              <img src={kakao} />
            </button>
          </div>
          <div>
            <button className={styles.getfuel}>
              <img className={styles.experience} src={getfuel_experience} />
            </button>
          </div>
          <img className={styles.image2} src={image2} />
        </div>
      </div>
    );
  }
}

export default Main;
