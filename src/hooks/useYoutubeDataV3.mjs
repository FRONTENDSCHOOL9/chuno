import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { memberState } from '../recoil/user/atoms.mjs';

const API_SERVER = 'https://www.googleapis.com/youtube/v3/search';

function useYoutubeDataV3() {
  // 로그인 된 사용자 정보
  const user = useRecoilValue(memberState);

  // ajax 통신에 사용할 공통 설정 지정
  const instance = axios.create({
    baseURL: API_SERVER,
    timeout: 1000 * 5,
    headers: {
      'content-type': 'application/json', // request 데이터 타입
      accept: 'application/json', // response 데이터 타입
    },
  });

  // 요청 인터셉터
  instance.interceptors.request.use(config => {
    if (user) {
      const accessToken = user.token.accessToken;
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  return instance;
}

export default useYoutubeDataV3;
