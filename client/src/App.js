import styles from './App.module.css';
import Login from './pages/login/Login.js';
import Main from './pages/main/Main.js';
import MapContainer from '../src/pages/map/MapContainer.js';
import Review from './pages/review/Review.js';
import SignUp from './pages/signup/SignUp.js';
import EditUser from './pages/edituser/EditUser.js';
import { Route, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import kakaoLogin from './pages/main/kakaoLogin';

export default function App({ opinet }) {
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();
  const [isOpenSignupModal, setIsOpenSignupModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  console.log(userInfo);
  const loginHandlerRun = (data) => {
    loginHandler(data);
  };

  const loginHandler = (data) => {
    setUserInfo(data);
  };
  const isAuthenticated = () => {
    axios
      .get('http://localhost:8080/auth/refresh')
      .then((data) => {
        // console.log('@@@@@@@@@@', data)
        setIsLogin(true);
        // 페이지 이동
      })
      .catch((err) => console.log('에러입니다', err));
  };

  const handleResponseSuccess = () => {
    isAuthenticated();
  };
  const handleLogout = () => {
    axios.post('https://localhost:8080/signout%27').then((res) => {
      setIsLogin(false);
      history.push('/');
    });
  };

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
      <Route path='/map'>
        <MapContainer opinet={opinet} />
      </Route>
      <Route path='kakaoLogin' component={kakaoLogin}></Route>
      <Route path='/review'>
        <Review />
      </Route>
      <Route path='/signup' component={SignUp} />
      <Route path='/edituser' component={EditUser} />
    </div>
  );
}
