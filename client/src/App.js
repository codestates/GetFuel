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

export default function App({ opinet }) {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const loginHandler = (data) => {
    setIsLogin(true);
    issueAccessToken(data);
  };

  const issueAccessToken = (data) => {
    setUserInfo({ accessToken: data.accessToken, userId: data.userId });
  };

  return (
    <div className={styles.App}>
      <Route exact path='/'>
        <Main />
      </Route>
      <Route path='/login'>
        <Login loginHandler={loginHandler} />
      </Route>
      <Route path='/map'>
        <MapContainer opinet={opinet} />
      </Route>
      <Route path='/review'>
        <Review />
      </Route>
      <Route path='/signup' component={SignUp} />
      <Route path='/edituser' component={EditUser} />
    </div>
  );
}
