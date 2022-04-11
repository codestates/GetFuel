import React, { Component } from 'react';
import styles from './Main.module.css';
import Nav from '../../components/nav/Nav';
import image2 from '../../cooltext.png';
import logoabr from '../../logobar.png';

import { useHistory } from 'react-router-dom';


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
