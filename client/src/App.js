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
import useAxiosPrivate from './service/axiosLogin';

export default function App({ opinet }) {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loginFunctions, setLoginFunctions] = useState({
    loginHandler,
    issueAccessToken,
  });

  const axiosInstance = useAxiosPrivate(userInfo?.accessToken, loginFunctions); // custom axios 객체;

  // axiosInstance, loginFunctions, userInfo 를 props로 내려서 써야함.
  // axiosInstance.post('http://localhost:8080/getfuel/posts') 식으로 사용.
  useEffect(async () => {
    try {
      const refresh = await axios.get('http://localhost:8080/auth/refresh', {
        headers: { 'Content-Type': 'application/json' },
      });
      if (refresh) {
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + refresh.data.accessToken;
        loginHandler(refresh.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  function loginHandler(data) {
    setIsLogin(true);
    issueAccessToken(data);
  }

  function issueAccessToken(data) {
    setUserInfo({ accessToken: data.accessToken, userId: data.userId });
  }
  
  return (
    <div>
      <div className={styles.App}>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/login">
          <Login loginHandler={loginHandler} />
        </Route>
        <Route path="/map">
          <MapContainer opinet={opinet} axiosInstance={axiosInstance} />
        </Route>
        <Route path="/review">
          <Review
            axiosInstance={axiosInstance}
            loginFunctions={loginFunctions}
            userInfo={userInfo}
          />
        </Route>
        <Route path="/signup" component={SignUp} />
        <Route path="/edituser" component={EditUser} />
      </div>
    </div>
  );
}
