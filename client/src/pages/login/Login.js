import React, { useState } from 'react'
import styles from './Login.module.css'
import GetFuel from '../../GetFuel_logo.png'
import Nav from '../../components/nav/Nav'
import axios from 'axios'

// axios.defaults.withCredentials = true;

export default function Login ({ handleResponseSuccess }) {
    const [loginInfo, setLoginInfo] = useState({
        email:'',
        password:'',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const handleInputValue = (key) => (e) => {
        setLoginInfo({ ...loginInfo, [key]: e.target.value});
    }
    const handleLogin = () => {
    const { email, password } = loginInfo;

    if(email && password) {
        axios.post(
            'http://localhost:8080/auth/signin',
            { email, password },
            { headers: { 'Content-Type': 'application/json'}, withCredentials: true}
        )
        .then(() => {
            handleResponseSuccess()
        })
        .catch((err) => setErrorMessage('이메일과 비밀번호를 확인하세요'))
    }
    else{
        setErrorMessage('이메일과 비밀번호를 입력하세요')
        }
    }

        return(
            <div>
            <Nav />
            <div>
                <img className={styles.logo2} src={GetFuel} />
            </div>
            <div className={styles.user}>email</div>   
            <input className={styles.userInfo}
                    type='text'
                    name='email'
                    onChange={handleInputValue('email')}
                    />
            <div className={styles.user}>password</div>   
            <input className={styles.userInfo}
                    type='password'
                    name='password'
                    onChange={handleInputValue('password')}
                    />
            <div className={styles.alert}>{errorMessage}</div>
            <div>
                <button onClick={handleLogin} className={styles.button}>Login</button>
            </div>
            </div>
    );
    };
