// import logo from './logo.svg';
<<<<<<< HEAD
import styles from './App.module.css';
import Login from './Page/Login'
import Main from './Page/Main'
import Map from './Page/Map'
import Review from './Page/Review'
import { Route } from 'react-router-dom'
import React, { Component } from 'react';
=======
import './App.css';
import Login from './Page/Login'
import Main from './Page/Main'
import { Link, Route, Switch } from 'react-router-dom'
>>>>>>> c9b8d8d1c90ddf63f80f21002627f1f7a0364802




<<<<<<< HEAD
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
    this.setState({isLogin: true});
    this.issueAccessToken(data.data.accessToken);
  }

  issueAccessToken(token) {
    this.setState({ accessToken: token})
  }

  render() {
    const { isLogin } = this.state;
  return (
    <div className={styles.App}>
=======
function App() {
  return (
    <div className="App">
>>>>>>> c9b8d8d1c90ddf63f80f21002627f1f7a0364802
      <Route exact path='/'>
        <Main />
      </Route>
      <Route path='/login'>
<<<<<<< HEAD
        {isLogin ? (
          <Map />
          ) : (
          <Login />
        )}
      </Route>
      <Route path='/map'>
        <Map />
      </Route>
      <Route path='/review'>
        <Review />
      </Route>
    </div>
  );
}
}
=======
        <Login />
      </Route>
      
    </div>
  );
}
>>>>>>> c9b8d8d1c90ddf63f80f21002627f1f7a0364802

export default App;
