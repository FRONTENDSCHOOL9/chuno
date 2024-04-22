import { useState } from 'react';
import styles from './youtube.module.css';
import SearchResult from './SearchResult';
import CreateList from '@youtube/CreateList'; // 이 줄을 수정했습니다.
// import ReactPlayer from 'react-player';

import axios from 'axios'; // axios를 import

// 환경 변수 설정
const API_KEYS = import.meta.env.VITE_YOUTUBE_API.split(',');
const MAX_API_KEYS = API_KEYS.length;

function SearchYoutube() {
  // const playerRef = useRef(null);
  const axiosInstance = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
  });

  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const selectNextKey = () => {
    setCurrentKeyIndex(prevIndex => (prevIndex + 1) % MAX_API_KEYS);
  };

  const searchYoutube = async () => {
    try {
      const response = await axiosInstance.get('/search', {
        params: {
          key: API_KEYS[currentKeyIndex],
          part: 'snippet',
          q: searchTerm,
          maxResults: 5,
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
          onKeyDown={handleSearchKeyPress} // onKeyPress -> onKeyDown으로 변경
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
        selectedVideos={selectedVideos}
        handleDeleteButtonClick={handleDeleteButtonClick}
        handleVideoItemClick={handleVideoItemClick}
      />

      {selectedVideos.length > 0 && (
        <div className={styles.addedVideo}>
          {/* <div className="playerWrapper">
            <ReactPlayer
              ref={playerRef}
              className="reactPlayer"
              url={`https://youtube.com/embed/${selectedVideos[currentVideoIndex]?.id}`}
              width="0"
              height="0"
              controls={false}
            />
          </div> */}
        </div>
      )}
    </div>
  );
}

export default SearchYoutube;
