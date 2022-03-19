import dotenv from 'dotenv';
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if(value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  db: {
    host: required('DB_HOST')
  },
  host: {
    port: parseInt(required('HOST_PORT', 8080))
  },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT,ROUNDS', 12))
  },
  jwt : {
    access_secret: required('JWT_ACCESS_SECRET'),
    refresh_secret: required('JWT_REFRESH_SECRET'),
    access_expiresInSec: required('JWT_ACCESS_EXPIRES'),
    refresh_expiresInSec: required('JWT_REFRESH_EXPIRES'),
  }
}