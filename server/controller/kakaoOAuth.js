import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';
import { signJwt } from '../utils/jwt.js';
import { findAndUpdateUser } from '../data/auth.js';
dotenv.config();

export default async function kakaoOauthHandler(req, res) {
  const code = req.query.code;
  const url = 'https://kauth.kakao.com/oauth/token';
  const REST_API_KEY = '690e96bd45128ff563adf6862a6112c2';
  const REDIRECT_URI = 'http://localhost:8080/api/sessions/oauth/kakao';
  const values = {
    code: code,
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code',
  };

  try {
    const header = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const response = await axios.post(url, qs.stringify(values), header);
    const access_token = response.data.access_token;
    console.log('acccesstoekn', { access_token });

    const getuser = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    // console.log(user);
    const { nickname, profile_image, thumbnail_image } =
      getuser.data.properties;
    const { email } = getuser.data.kakao_account;
    console.log({ email });

    const user = await findAndUpdateUser(
      { email: email },
      { email: email },
      { upsert: true }
    );
    const accessToken = signJwt(
      { ...user.toJSON() },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.ACCESSTOKENEXPIRE }
    );
    const refreshToken = signJwt(
      { ...user.toJSON() },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.REFRESHTOKENEXPIRE }
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    res.redirect(process.env.ORIGIN);
  } catch (error) {
    console.error(`Failed to fetch auth tokens`);
    throw new Error(error.message);
  }
}
