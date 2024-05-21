import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'saveUser',
  storage: sessionStorage,
});

export const memberState = atom({
  key: 'userState',
  default: null,
  effects: [persistAtom],
});

export const selectedVideosState = atom({
  key: 'selectedVideosState',
  default: [],
});

export const bookmarkIdsState = atom({
  key: 'bookmarkIdsState',
  default: [], // 초기값은 빈 배열로 설정
});
