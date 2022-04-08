import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

export function signJwt(data) {
  return jwt.sign(data, 'aaaaa' , {
    expiresIn: '30d',
    algorithm: 'RS256',
  });
}