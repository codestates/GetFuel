import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import User from '../data/auth.js';
import jwt from 'jsonwebtoken';
import { findByEmail } from '../data/auth.js';
import { config } from '../configuration/config.js';
axios.defaults.withCredentials = true;

export default async function kakaoOauthHandler(req, res) {
  const maxAge = 5000;
  const code = req.query.authorizationCode;
  const grant_type = 'authorization_code';

  try {
    const getToken = await axios({
      method: 'POST',
      url: `https://kauth.kakao.com/oauth/token?code=${code}&client_id=${config.oauth.kakaoClientId}&client_secret=${config.oauth.kakaoClientSecret}&redirect_uri=${config.oauth.kakaoRedirectURI}&grant_type=${grant_type}`,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = getToken.data;

    const data = await axios({
      method: 'GET',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });

    const { email } = data.data.kakao_account;
    const { nickname } = data.data.properties;

    User.findOne({ email }, async (err, isDB) => {
      if (err) {
        return res.status(400).send(err);
      }

      if (!isDB) {
        await new User({
          email,
          nickname,
          kakaoAccessToken: access_token,
          type: 'kakao',
        }).save();
      }
    });

    const findId = await findByEmail(email);
    const userId = findId.id;
    const loginType = findId.type;

    const kakaoAccessToken = jwt.sign(
      { id: userId },
      config.jwt.access_secret,
      {
        expiresIn: config.jwt.access_expiresInSec,
      }
    );

    const kakaoRefreshToken = jwt.sign(
      { id: userId },
      config.jwt.refresh_secret,
      {
        expiresIn: config.jwt.refresh_expiresInSec,
      }
    );

    res.cookie('refreshToken', kakaoRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    res.status(200).json({
      accessToken: kakaoAccessToken,
      userId,
      loginType,
      kakaoAccessToken: access_token,
    });
  } catch (err) {
    res.cookie('kakao_login', 'fail', { maxAge });
    res.redirect(config.oauth.mainPageURL);
    console.log(err);
  }
}
