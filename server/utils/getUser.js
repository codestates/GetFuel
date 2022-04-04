import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';
dotenv.config();

export async function getTokens({ code }) {
  const url = 'https://oauth2.googleapis.com/token';
  console.log('작동?');
  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECTURL,
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
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(`---------------Failed to fetch user`);
    throw new Error(error.message);
  }
}
