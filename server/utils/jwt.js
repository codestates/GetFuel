import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

export function signJwt(data) {
  return jwt.sign(data, 'aaaa', {
    expiresIn: '30d',
    algorithm: 'RS256',
  });
}
