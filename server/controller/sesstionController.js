import dotenv from 'dotenv';
dotenv.config();
import { signJwt } from '../utils/jwt.js';
import * as getGoogle from '../utils/getUser.js';
import { findAndUpdateUser } from '../data/auth.js';

export default async function googleOauthHandler(req, res) {
  // get the code from qs
  const code = req.query.code;
  console.log({ code });

  try {
    const { id_token, access_token } = await getGoogle.getTokens({ code });
    console.log({ id_token, access_token });

    const googleUser = await getGoogle.getGoogleUser({
      id_token,
      access_token,
    });

    const user = await findAndUpdateUser(
      { email: googleUser.email },
      { email: googleUser.email },
      { upsert: true }
    );
    console.log('_____________user_____________', user);

    const accessToken = signJwt(
      { ...user.toJSON() },
      { expiresIn: process.env.accessTokenExpire }
    );
    console.log('---------accessToken---------', accessToken);
    const refreshToken = signJwt(
      { ...user.toJSON() },
      { expiresIn: process.env.refreshTokenExpire }
    );
    console.log('---------refreshToken----------', refreshToken);

    res.cookie('accessToken', accessToken, {
      maxAge: 900000,
      httpOnly: true,
      domain: process.env.domain,
      path: '/',
      sameSite: 'none',
      secure: false,
    });

    res.cookie('refreshToken', refreshToken, {
      maxAge: 3.154e10,
      httpOnly: true,
      domain: process.env.domain,
      path: '/',
      sameSite: 'none',
      secure: false,
    });

    res.redirect(process.env.origin);
  } catch (error) {
    console.log(error, 'Failed to authorize Google user');
    return res.redirect(`${process.env.origin}/oauth/error`);
  }
}
