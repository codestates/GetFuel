import React, { useRef, useState, useEffect } from 'react';
import styles from './Login.module.css';
import GetFuel from '../../GetFuel_logo1.png';
import Nav from '../../components/nav/Nav';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Loading from '../../components/loding/Loding.js';

axios.defaults.withCredentials = true; // true로 설정해줘야 refreshtoken 주고 받을 수 있다

export default function Login({ loginHandler }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    emailRef.current.value = '';
    passwordRef.current.value = '';
    handleLogin(email, password);
  };

  const handleLogin = (email, password) => {
    if (email && password) {
      axios
        .post(
          'http://localhost:8080/auth/signin',
          { email, password },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
        .then((res) => {
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + res.data.accessToken;
          history.push('/map'); // 페이지 이동
          loginHandler(res.data);
        })
        .catch((err) => {
          setErrorMessage('이메일과 비밀번호를 확인하세요');
        });
    } else {
      setErrorMessage('이메일과 비밀번호를 입력하세요');
    }
  };

  const getAccessToken = (authorizationCode) => {
    if (authorizationCode) {
      axios
        .get(
          `http://localhost:8080/oauth/google/login`,
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
      <div className={styles.logo_div}>
        <img className={styles.logo2} src={GetFuel} />
      </div>
      <form onSubmit={handleSubmit} className={styles.loginform}>
        <div className={styles.user}>Email</div>
        <input
          className={styles.userInfo}
          type='text'
          placeholder='이메일을 입력하세요'
          ref={emailRef}
          autoComplete='on'
        />
        <div className={styles.user}>Password</div>
        <input
          className={styles.userInfo}
          type='password'
          placeholder='비밀번호를 입력하세요'
          ref={passwordRef}
          autoComplete='off'
        />
        <div className={styles.alert}>{errorMessage}</div>
        <div>
          <button className={styles.button}>Login</button>
        </div>
      </form>
      <div>{isLoading ? <Loading /> : null}</div>
    </div>
  );
}
