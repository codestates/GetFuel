import styles from './App.module.css';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import MapContainer from './pages/MapContainer';
import Review from './pages/review/Review';
import SignUp from './pages/signup/SignUp';
import EditUser from './pages/edituser/EditUser';
import { Route, Switch, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  const openSignupModalHandler = () => {
    setIsOpenSignupModal(!isOpenSignupModal);
  };
  return (
    <div className={styles.App}>
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/login'>
          <Login
            isLogin={isLogin}
            handleResponseSuccess={handleResponseSuccess}
            loginHandlerRun={loginHandlerRun}
          />
        </Route>
        <Route path='/map'>
          <MapContainer opinet={opinet} />
        </Route>
        <Route path='/review'>
          <Review />
        </Route>
        <Route path='/signup' component={SignUp} />
        <Route exact path='/edituser'>
          <EditUser userInfo={userInfo} />
        </Route>
      </Switch>
    </div>
  );
}
