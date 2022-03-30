import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import GetFuel1 from '../../GetFuel_logo.png'
//import axios from 'axios'
import { useHistory } from 'react-router-dom';
import Nav from '../../components/nav/Nav'

export default function Login(props) {
    //로그인 정보 상태


    return(
        <div>
            <Nav />
            <div>
                <img className={styles.logo2} src={GetFuel1} />
            </div>
            <div className={styles.user}>email</div>   
              <input className={styles.userInfo} type='text'></input>
            <div className={styles.user}>password</div>   
              <input className={styles.userInfo} type='password'></input>
            
              <div className={styles.button_bundle}>
            <a href='/'>
              <button className={styles.loginbutton}>Login</button>
            </a>
            </div>
            
        </div>
    )
}

