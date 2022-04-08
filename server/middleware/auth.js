import jwt from 'jsonwebtoken';
import { config } from '../configuration/config.js';
import * as usersRepository from '../data/auth.js';

export const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  console.error('미들웨어에 들어옴?', { authHeader });
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json({ message: 'Authentication Error' });
  }

  const token = authHeader.split(' ')[1]; //access token
  console.log({ token });

  jwt.verify(token, config.jwt.access_secret, async (error, decoded) => {
    console.log({ error });
    // if (error.name === 'TokenExpiredError') {
    //   return res
    //     .status(419)
    //     .json({ code: 419, message: '토큰이 만료되었습니다.' });
    // }

    if (error) {
      return res
        .status(401)
        .json({ code: 401, message: 'Authentication Error' });
    }

    const user = await usersRepository.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ code: 401, message: '회원정보를 찾을 수 없습니다.' });
    }

    req.userId = user.id; // req에 userId 추가 (custom)
    next();
  });
};
