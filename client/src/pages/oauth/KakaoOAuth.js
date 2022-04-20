const REST_API_KEY = '690e96bd45128ff563adf6862a6112c2';
const REDIRECT_URI = 'http://localhost:8080/api/sessions/oauth/kakao';

export const getKakaoCode = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;
