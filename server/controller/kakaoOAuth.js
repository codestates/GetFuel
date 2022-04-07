import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';
import { signJwt } from '../utils/jwt.js';
import { findAndUpdateUser } from '../data/auth.js';
dotenv.config();

export default async function kakaoOauthHandler(req, res) {
  const url = 'https://kauth.kakao.com/oauth/token';
  const values = {
    code: req.query.code,
    client_id: process.env.KAKAO_CLIENT_ID,
    client_secret: process.env.KAKAO_CLIENT_SECRET,
    redirect_uri: process.env.KAKAO_OAUTH_REDIRECTURL,
    grant_type: 'authorization_code',
  };

  try {
    const header = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const response = await axios.post(url, qs.stringify(values), header);
    const access_token = response.data.access_token;

    const getuser = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    // console.log(user);
    const { nickname, profile_image, thumbnail_image } =
      getuser.data.properties;
    const { email } = getuser.data.kakao_account;

    const user = await findAndUpdateUser(
      { email: email },
      { email: email },
      { upsert: true }
    );
    const accessToken = signJwt(
      { ...user.toJSON() },
      { expiresIn: process.env.ACCESSTOKENEXPIRE }
    );
    const refreshToken = signJwt(
      { ...user.toJSON() },
      { expiresIn: process.env.REFRESHTOKENEXPIRE }
    );

    res.cookie('accessToken', accessToken, {
      maxAge: 900000,
      httpOnly: true,
      domain: process.env.DOMAIN,
      path: '/',
      sameSite: 'none',
      secure: false,
    });

    res.cookie('refreshToken', refreshToken, {
      maxAge: 3.154e10,
      httpOnly: true,
      domain: process.env.DOMAIN,
      path: '/',
      sameSite: 'none',
      secure: false,
    });

    res.redirect(process.env.ORIGIN);
  } catch (error) {
    console.error(`Failed to fetch auth tokens`);
    throw new Error(error.message);
  }
}
