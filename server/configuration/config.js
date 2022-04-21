import dotenv from "dotenv";
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  db: {
    host: required("DB_HOST"),
  },
  host: {
    port: parseInt(required("HOST_PORT", 8080)),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT,ROUNDS", 12)),
  },
  jwt: {
    access_secret: required("JWT_ACCESS_SECRET"),
    refresh_secret: required("JWT_REFRESH_SECRET"),
    access_expiresInSec: required("JWT_ACCESS_EXPIRES"),
    refresh_expiresInSec: required("JWT_REFRESH_EXPIRES"),
  },
  opinet: {
    code: required("OPINET_API_CODE"),
  },
  oauth: {
    kakaoClientId: required("KAKAO_CLIENT_ID"),
    kakaoRedirectURI: required("KAKAO_REDIRECT_URI"),
    kakaoClientSecret: required("KAKAO_CLIENT_SECRET"),
    googleClientId: required("GOOGLE_CLIENT_ID"),
    googleOauthRedirect: required("GOOGLE_OAUTH_REDIRECTION"),
    googleClientSecret: required("GOOGLE_CLIENT_SECRET"),
    mainPageURL: required("MAINPAGE"),
  },
  deploy: {
    clientURL: required("CLIENT_URL"),
  },
};
