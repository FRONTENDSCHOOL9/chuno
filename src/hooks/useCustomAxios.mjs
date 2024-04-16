import { memberState } from '@recoil/user/atoms.mjs';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const API_SERVER = import.meta.env.VITE_API_SERVER;
const REFRESH_URL = '/auth/refresh';

function useCustomAxios() {
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인 된 사용자 정보
  const [user, setUser] = useRecoilState(memberState);

  // ajax 통신에 사용할 공통 설정 지정
  const instance = axios.create({
    baseURL: API_SERVER,
    timeout: 1000 * 10,
    headers: {
      'content-type': 'application/json', // request 데이터 타입
      accept: 'application/json', // response 데이터 타입
      'client-id': '09-chuno', // 프로젝트 식별을 위한 id
    },
  });

  // 요청 인터셉터
  instance.interceptors.request.use(config => {
    if (user) {
      let token = user.token.accessToken;
      if (config.url === REFRESH_URL) {
        token = user.token.refreshToken;
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // 응답 인터셉터
  instance.interceptors.response.use(
    res => res,
    async err => {
      const { config, response } = err;
      if (response?.status === 401) {
        // 인증 되지 않음
        if (config.url === REFRESH_URL) {
          // refresh 토큰 인증 실패
          const gotoLogin = confirm(
            '로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?',
          );
          gotoLogin &&
            navigate('/users/login', { state: { from: location.pathname } });
        } else {
          // refresh 토큰으로 access 토큰 재발급 요청
          const accessToken = await getAccessToken(instance);
          if (accessToken) {
            setUser({ ...user, token: { accessToken } });
            config.headers.Authorization = `Bearer ${accessToken}`;
            // 갱신된 accessToken으로 재요청
            return axios(config);
          }
        }
      } else {
        return Promise.reject(err);
      }
    },
  );

  // accessToken 갱신 요청
  async function getAccessToken(instance) {
    try {
      const {
        data: { accessToken },
      } = await instance.get(REFRESH_URL);
      return accessToken;
    } catch (err) {
      console.error(err);
    }
  }

  return instance;
}

export default useCustomAxios;
