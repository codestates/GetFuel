import axios from 'axios';
import { useEffect } from 'react';

function useAxiosPrivate(accessToken, loginFunctions) {
  const axiosPrivate = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  const refresh = axiosRefresh;

  async function axiosRefresh() {
    try {
      const refreshed = await axiosPrivate.get('/auth/refresh');
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${refreshed.data.accessToken}`;
      loginFunctions.loginHandler(refreshed.data);

      return refreshed.data.accessToken;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(async () => {
    //accessToken이 없는 경우 axiosRefresh로 accessToken 발급
    if (accessToken) return;

    accessToken = await axiosRefresh();
  }, [accessToken]);

  // accessToken이 있다는 가정 하에 실행.
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config; // 이전 요청 객체를 keep;
        if (error?.response?.status === 419 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();

          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error); // 에러가 419가 아닌경우 return
      }
    );
    // cleanUp
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  return axiosPrivate;
}

export default useAxiosPrivate;
