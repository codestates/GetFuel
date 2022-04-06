import dotenv from 'dotenv';
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
<<<<<<< HEAD
  if(value == null) {
=======
  if (value == null) {
>>>>>>> 41250f9a6bbce0f8adcbd8279352b5defd2e06b0
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  db: {
<<<<<<< HEAD
    host: required('DB_HOST')
  },
  host: {
    port: parseInt(required('HOST_PORT', 8080))
  },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT,ROUNDS', 12))
  },
  jwt : {
=======
    host: required('DB_HOST'),
  },
  host: {
    port: parseInt(required('HOST_PORT', 8080)),
  },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT,ROUNDS', 12)),
  },
  jwt: {
>>>>>>> 41250f9a6bbce0f8adcbd8279352b5defd2e06b0
    access_secret: required('JWT_ACCESS_SECRET'),
    refresh_secret: required('JWT_REFRESH_SECRET'),
    access_expiresInSec: required('JWT_ACCESS_EXPIRES'),
    refresh_expiresInSec: required('JWT_REFRESH_EXPIRES'),
<<<<<<< HEAD
  }
}
=======
  },
  opinet: {
    code: required('OPINET_API_CODE'),
  },
};
>>>>>>> 41250f9a6bbce0f8adcbd8279352b5defd2e06b0
