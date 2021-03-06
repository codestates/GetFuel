import styles from "./App.module.css";
import Login from "./pages/login/Login.js";
import Main from "./pages/main/Main.js";
import MapContainer from "../src/pages/map/MapContainer.js";
import Review from "./pages/review/Review.js";
import SignUp from "./pages/signup/SignUp.js";
import EditUser from "./pages/edituser/EditUser.js";
import { Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAxiosPrivate from "./service/axiosLogin";
import DeleteUserModal from "./pages/edituser/DeleteUserModal.js";
import GoogleLogin from "./pages/oauth/GoogleLogin.js";
import KakaoLogin from "./pages/oauth/KakaoLogin.js";

axios.defaults.withCredentials = true; // true로 설정해줘야 refreshtoken 주고 받을 수 있다

export default function App({ opinet }) {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loginType, setLoginType] = useState(null);
  const [loginFunctions] = useState({
    loginHandler,
    issueAccessToken,
  });
  const axiosInstance = useAxiosPrivate(userInfo?.accessToken, loginFunctions); // custom axios 객체;
  console.log(isLogin);
  useEffect(async () => {
    if (isLogin === false) {
      return;
    }

    try {
      const refresh = await axios.get(`${process.env.REACT_APP_AWS_API_URL}/auth/refresh`, {
        headers: { "Content-Type": "application/json" },
      });

      if (refresh.data.data === null) {
        setIsLogin(false);
      } else if (refresh.data.accessToken) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + refresh.data.accessToken;
        loginHandler(refresh.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [isLogin]);

  function loginHandler(data) {
    setIsLogin(true);
    issueAccessToken(data);
  }

  function logoutHandler() {
    setIsLogin(false);
  }

  function issueAccessToken(data) {
    if (data.kakaoAccessToken) {
      setUserInfo({
        accessToken: data.accessToken,
        userId: data.userId,
        kakaoAccessToken: data.kakaoAccessToken,
      });
    } else {
      setUserInfo({
        accessToken: data.accessToken,
        userId: data.userId,
      });
    }
    setLoginType(data.loginType);
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
          <MapContainer
            opinet={opinet}
            axiosInstance={axiosInstance}
            userInfo={userInfo}
            isLogin={isLogin}
            logoutHandler={logoutHandler}
            setIsLogin={setIsLogin}
            loginType={loginType}
          />
        </Route>
        <Route path="/review">
          <Review
            axiosInstance={axiosInstance}
            userInfo={userInfo}
            setIsLogin={setIsLogin}
            isLogin={isLogin}
            loginType={loginType}
          />
        </Route>
        <Route path="/signup" component={SignUp} />
        <Route path="/edituser">
          <EditUser userInfo={userInfo} axiosInstance={axiosInstance} />
        </Route>
        <Route path="/deleteuser" component={DeleteUserModal} />
        <Route exact path="/googlelogin">
          <GoogleLogin loginHandler={loginHandler} />
        </Route>
        <Route exact path="/kakaologin">
          <KakaoLogin loginHandler={loginHandler} />
        </Route>
      </div>
    </div>
  );
}
