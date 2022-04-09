function getGoogleCode() {
  const AUTHORIZE_URI = 'https://accounts.google.com/o/oauth2/v2/auth';
  const GOOGLE_CLIENT_ID =
    '779018207520-qvftar8nin7c9bqo0q4ouk4mtj7gb6lc.apps.googleusercontent.com';
  const GOOGLE_OAUTH_REDIRECTION =
    'http://localhost:8080/api/sessions/oauth/google';
  const options = {
    redirect_uri: GOOGLE_OAUTH_REDIRECTION,
    client_id: GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  };
  const qs = new URLSearchParams(options);
  return `${AUTHORIZE_URI}?${qs.toString()}`;
}

export default getGoogleCode;
