import dotenv from 'dotenv';
dotenv.config();
import { signJwt } from '../utils/jwt.js';
import * as getGoogle from '../utils/getUser.js';
import { findAndUpdateUser } from '../data/auth.js';

export default async function googleOauthHandler(req, res) {
  // get the code from qs
  const code = req.query.code;

  try {
    const { id_token, access_token } = await getGoogle.getGoogleTokens({
      code,
    });

    const googleUser = await getGoogle.getGoogleUser({
      id_token,
      access_token,
    });

    const user = await findAndUpdateUser(
      { email: googleUser.email },
      { email: googleUser.email },
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
    console.log(error, 'Failed to authorize Google user');
    return res.redirect(`${process.env.ORIGIN}/oauth/error`);
  }
}
