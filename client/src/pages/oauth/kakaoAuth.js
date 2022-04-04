const REST_API_KEY = '35c33014a9d32bf73c0d3e0ecc9c0b36';
const REDIRECT_URI = 'http://localhost:8080/api/sessions/oauth/kakao';

export const kakaoAuth = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
const code = new URL(window.location.href).searchParams.get('code');
