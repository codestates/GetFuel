import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

export function signJwt(data, secret, expire) {
  return jwt.sign(data, secret, expire);
}
