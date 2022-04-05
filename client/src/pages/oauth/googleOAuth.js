function getGoogleCode() {
  const AUTHORIZE_URI = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: process.env.REACT_APP_GOOGLE_OAUTH_REDIRECTION,
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
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
