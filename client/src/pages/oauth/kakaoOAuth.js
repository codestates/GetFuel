const REST_API_KEY = '690e96bd45128ff563adf6862a6112c2';
const REDIRECT_URI = 'http://localhost:8080/api/sessions/oauth/kakao';

export const kakaoAuth = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;

// function getKakaoCode() {
//   const REST_API = '35c33014a9d32bf73c0d3e0ecc9c0b36';
//   const REDIRECT_URI = 'http://localhost:8080/api/sessions/oauth/kakao';
//   const kakaoAuth = `https://kauth.kakao.com/oauth/authorize
//     ?client_id=${REST_API}
//     &redirect_uri=${REDIRECT_URI}
//     &response_type=code`;
//   return kakaoAuth;
// }

// export default getKakaoCode;
