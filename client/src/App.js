import styles from './App.module.css';
import Login from './Page/Login';
import Main from './Page/Main';
import Review from './Page/Review';
<<<<<<< HEAD
import { Route } from 'react-router-dom';
import React, { Component } from 'react';
import MapContainer from './Page/MapContainer.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      accessToken: '',
    };
    this.loginHandler = this.loginHandler.bind(this);
    this.issueAccessToken = this.issueAccessToken.bind(this);
  }

  //리프레쉬토큰은?

  loginHandler(data) {
    this.setState({ isLogin: true });
    this.issueAccessToken(data.data.accessToken);
  }

  issueAccessToken(token) {
    this.setState({ accessToken: token });
  }

  render() {
    const { isLogin } = this.state;
    return (
      <div className={styles.App}>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/login">{isLogin ? <MapContainer /> : <Login />}</Route>
        <Route path="/map">
          <MapContainer />
        </Route>
        <Route path="/review">
          <Review />
        </Route>
      </div>
    );
  }
}

export default App;
=======
import { Route, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapContainer from './Page/MapContainer.js';

export default function App({ opinet }) {
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();

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

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <div className={styles.App}>
      <Route exact path="/">
        <Main />
      </Route>
      <Route path="/login">
        <Login
          isLogin={isLogin}
          handleResponseSuccess={handleResponseSuccess}
        />
      </Route>
      <Route path="/map">
        <MapContainer opinet={opinet} />
      </Route>
      <Route path="/review">
        <Review />
      </Route>
    </div>
  );
}
>>>>>>> b3a0ef74d92ec2c62a3c9d8b669f138ebde5b83e
