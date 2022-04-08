import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const RSA_PRIVATE_KEY = fs.readFileSync(__dirname + '/../jwtRS256.key');

export function signJwt(data) {
  return jwt.sign(data, 'aaaaa' , {
    expiresIn: '30d',
    algorithm: 'RS256',
  });
}
