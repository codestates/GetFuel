// import logo from './logo.svg';
import styles from './App.module.css';
import Login from './Page/login/Login'
import Main from './Page/main/Main'
import Map from './Page/map/Map'
import Review from './Page/review/Review'
import { Route, useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import kakaoLogin from './Page/main/kakaoLogin'




export default function App () {
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();
  
  const isAuthenticated = () => {
    axios.get(
      'http://localhost:8080/auth/refresh'
    )
    .then((data) => {
      // console.log('@@@@@@@@@@', data)
      setIsLogin(true);
      // 페이지 이동
    })
    .catch((err) => console.log('인증에러', err));
  }

  const handleResponseSuccess = () => {
    isAuthenticated();
  };
  const handleLogout = () => {
    axios.post('https://localhost:8080/signout').then((res) => {
      setIsLogin(false);
      history.push('/')
    });
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <div className={styles.App}>
      <Route exact path='/'>
        <Main />
      </Route>
      <Route path='/login'>
          <Login 
            isLogin={isLogin}
            handleResponseSuccess={handleResponseSuccess}
          />
      </Route>
      <Route path='kakaoLogin' component={kakaoLogin}></Route>
      <Route path='/map'>
        <Map />
      </Route>
      <Route path='/review'>
        <Review />
      </Route>
    </div>
  );
}

