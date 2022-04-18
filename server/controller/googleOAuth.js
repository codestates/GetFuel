import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import qs from 'qs';
import User from '../data/auth.js';
import jwt from 'jsonwebtoken';
import { findByEmail } from '../data/auth.js';

export default async function googleOauthHandler(req, res) {
  const maxAge = 5000;
  const code = req.query.authorizationCode;

  try {
    const url = 'https://oauth2.googleapis.com/token';
    const values = {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_OAUTH_REDIRECTION,
      grant_type: 'authorization_code',
    };

    const getToken = await axios.post(url, qs.stringify(values), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { id_token, access_token } = getToken.data;

    const userInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );

    const { email, family_name } = userInfo.data;
    const nickname = family_name;

    User.findOne({ email }, async (err, isDB) => {
      if (err) {
        return res.status(400).send(err);
      }

      if (isDB === null) {
        await new User({
          email,
          nickname,
          type: 'google',
        }).save();
      }
    });

    const findId = await findByEmail(email);
    const userId = findId.id;
    console.log(findId);
    const loginType = findId.type;

    // ! Generate Token
    const googleAccessToken = jwt.sign(
      { userId },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRES,
      }
    );

    const googleRefreshToken = jwt.sign(
      { userId },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRES,
      }
    );

    res.cookie('refreshToken', googleRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    res.status(200).json({ accessToken: googleAccessToken, userId, loginType });

    res.redirect(process.env.MAPPAGE);
  } catch (err) {
    res.cookie('google_login', 'fail', { maxAge });
    res.redirect(process.env.MAINPAGE);
    console.log(err);
  }
}
