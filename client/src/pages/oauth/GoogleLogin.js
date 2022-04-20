import React, { useEffect, useState } from 'react';
import Loading from '../../components/loding/Loding.js';
import axios from 'axios';
import Nav from '../../components/nav/Nav';
import { useHistory } from 'react-router-dom';
import googlelogin from '../../img/googlelogin.jpg';
import './Oauth.css';

axios.defaults.withCredentials = true;

export default function GoogleLogin({ loginHandler }) {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

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
      <div className="container">
        <img src={googlelogin} className="oauth" />
      </div>
      <div>{isLoading ? <Loading /> : null}</div>
    </div>
  );
}
