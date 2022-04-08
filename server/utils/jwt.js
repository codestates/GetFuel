import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

export function signJwt(data) {
  return jwt.sign(data, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '30d',
    algorithm: 'RS256',
  });
}
