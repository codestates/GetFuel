import React, { useState } from 'react'
import styles from './Login.module.css'
import GetFuel from '../../GetFuel_logo.png'
import Nav from '../../components/nav/Nav'
import axios from 'axios'
import { Route, useHistory } from 'react-router-dom';
import Review from '../review/Review'


axios.defaults.withCredentials = true; // true로 설정해줘야 refreshtoken 주고 받을 수 있다

export default function Login ({loginHandler}) {
    const [loginInfo, setLoginInfo] = useState({
        email:'',
        password:'',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const handleInputValue = (key) => (e) => {
        setLoginInfo({ ...loginInfo, [key]: e.target.value});
    }
    const history = useHistory();

    const handleLogin = () => {
    const { email, password } = loginInfo;

    if(email && password) {
        axios.post(
            'http://localhost:8080/auth/signin',
            { email, password },
            { headers: { 'Content-Type': 'application/json'}, withCredentials: true}
        )
        .then((res) => {
            history.push('/map'); // 페이지 이동
            loginHandler(res.data)
        })
        .catch((err) => setErrorMessage('이메일과 비밀번호를 확인하세요'))
    }
    else{
        setErrorMessage('이메일과 비밀번호를 입력하세요')
        }
    }

        return (
            <div>
            <Nav />
            <div>
                <img className={styles.logo2} src={GetFuel} />
            </div>
            <div className={styles.user}>email</div>   
            <input className={styles.userInfo}
                    type='text' onChange={handleInputValue('email')}/>
            <div className={styles.user}>password</div>   
            <input className={styles.userInfo}
                    type='password' onChange={handleInputValue('password')}/>
            <div className={styles.alert}>{errorMessage}</div>
            <div>
                <button className={styles.button} onClick={handleLogin}>Login</button>
            </div>
            </div>
    );
    };
