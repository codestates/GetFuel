import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';
dotenv.config();

export async function getGoogleTokens({ code }) {
  const url = 'https://oauth2.googleapis.com/token';
  const GOOGLE_CLIENT_ID =
    '779018207520-qvftar8nin7c9bqo0q4ouk4mtj7gb6lc.apps.googleusercontent.com';
  const GOOGLE_OAUTH_REDIRECTION =
    'http://localhost:8080/api/sessions/oauth/google';
  const values = {
    code,
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_OAUTH_REDIRECTION,
    grant_type: 'authorization_code',
  };
  console.log({ values });

  try {
    const res = await axios.post(url, qs.stringify(values), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch auth tokens`);
    throw new Error(error.message);
  }
}

export async function getGoogleUser({ id_token, access_token }) {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(`---------------Failed to fetch user`);
    throw new Error(error.message);
  }
}
