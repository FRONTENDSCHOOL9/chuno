// 유튜브 API 컨테이너 컴포넌트
import { useEffect, useState } from 'react';
import styles from './youtube.module.css';
import SearchResult from './SearchResult';
import CreateList from '@youtube/CreateList';
import axios from 'axios';

// 초기 KEY값이랑 복사본 KEY값 생성
const INITIAL_API_KEYS = import.meta.env.VITE_YOUTUBE_API.split(','); // 초기 KEY 값
// let으로 선언한 이유: 변수의 값을 변경하기 때문에(const는 불가능!)
let API_KEYS = [...INITIAL_API_KEYS]; // 복사본 KEY값, 이 것을 키 값으로 사용핳 것임

function SearchYoutube() {
  const axiosInstance = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
  });

  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // 매일 오후 4시에 KEY값을 원래대로 초기화(초기 KEY 값으로 설정하는 코드)
  useEffect(() => {
    // setInterval 함수는 주어진 시간 간격마다 특정한 함수를 반복적으로 실행(JavaScript의 내장 함수)
    const interval = setInterval(() => {
      const current = new Date(); // 현재 시간을 나타냄

      // 오후 4시를 계산 하는 식
      // new Date(현재 연도,현재 월[0부터 시작(ex: 1월은 0)],현재날짜,시,분,초,밀리초)
      const resetTime = new Date(
        current.getFullYear(),
        current.getMonth(),
        current.getDate(),
        16,
        0,
        0,
        0,
      ).getTime();
      const currentTime = current.getTime();

      // 현재 시간이 오후 4시와 동일하묜 키 값울 초기 값으로 리셋
      if (currentTime === resetTime) {
        restoreKeys();
      }
    }, 1000); // 1초 간격으로 체크

    return () => clearInterval(interval);
  }, []);

  const restoreKeys = () => {
    API_KEYS = [...INITIAL_API_KEYS]; // 초기 키 값으로 복구(이 부분 때문에 위에서 let을 쓴 것임)
  };
  // 403 에러가 뜨면 가장 앞의 키 값을 제거함
  const selectNextKey = () => {
    API_KEYS = API_KEYS.slice(1); // 맨 앞의 키값을 삭제 하고 적용,
    setCurrentKeyIndex(0); // 첫 번째 키를 현재 키 인덱스로 설정합니다.
  };

  const searchYoutube = async () => {
    try {
      const response = await axiosInstance.get('/search', {
        params: {
          key: API_KEYS[currentKeyIndex],
          part: 'snippet',
          q: searchTerm,
          maxResults: 10,
          type: 'video',
        },
      });
      setSearchResult(response.data.items);
    } catch (error) {
      console.error('Error searching YouTube:', error);
      if (error.response && error.response.status === 403) {
        selectNextKey();
      }
    }
  };

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchKeyPress = event => {
    if (event.key === 'Enter') {
      searchYoutube();
    }
  };

  const handleSearchClick = () => {
    searchYoutube();
  };

  const handleAddButtonClick = (videoId, videoTitle) => {
    const newVideo = { id: videoId, title: videoTitle };
    setSelectedVideos([...selectedVideos, newVideo]);
    if (selectedVideos.length === 0) {
      setCurrentVideoIndex(0);
    }
  };

  const handleVideoItemClick = (videoId, index) => {
    setCurrentVideoIndex(index);
  };

  const handleDeleteButtonClick = videoId => {
    setSelectedVideos(selectedVideos.filter(video => video.id !== videoId));
    if (selectedVideos[currentVideoIndex]?.id === videoId) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleSearchKeyPress}
        />
        <button onClick={handleSearchClick}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5534 11.7244C15.2344 12.3742 15.2909 13.1723 15.8017 13.6852L18.9531 16.849C19.5316 17.4298 19.5307 18.3693 18.951 18.949C18.3706 19.5294 17.4294 19.5294 16.849 18.949L13.6972 15.7972C13.1882 15.2882 12.3953 15.2273 11.7486 15.5434C10.6347 16.0878 9.44513 16.36 8.18 16.36C5.92667 16.36 4 15.56 2.4 13.96C0.8 12.36 0 10.4333 0 8.18C0 5.92667 0.8 4 2.4 2.4C4 0.8 5.92667 0 8.18 0C10.4333 0 12.36 0.8 13.96 2.4C15.56 4 16.36 5.92667 16.36 8.18C16.36 9.44736 16.0911 10.6288 15.5534 11.7244ZM13.62 8.18C13.62 6.67333 13.09 5.38667 12.03 4.32C10.97 3.25333 9.68667 2.72 8.18 2.72C6.67333 2.72 5.38667 3.25333 4.32 4.32C3.25333 5.38667 2.72 6.67333 2.72 8.18C2.72 9.68667 3.25333 10.97 4.32 12.03C5.38667 13.09 6.67333 13.62 8.18 13.62C9.68667 13.62 10.97 13.09 12.03 12.03C13.09 10.97 13.62 9.68667 13.62 8.18Z"
              fill="#D2CECE"
            />
          </svg>
        </button>
      </div>

      <SearchResult
        searchResult={searchResult}
        handleAddButtonClick={handleAddButtonClick}
      />

      <CreateList
        setSelectedVideos={selectedVideos}
        selectedVideos={selectedVideos}
        handleDeleteButtonClick={handleDeleteButtonClick}
        handleVideoItemClick={handleVideoItemClick}
      />

      {selectedVideos.length > 0 && <div className={styles.addedVideo}></div>}
    </div>
  );
}

export default SearchYoutube;
