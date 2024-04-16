import { useState, useRef, useEffect } from 'react';
import useCustomAxios from '../hook/useCustomAxios.mjs';
import styles from './youtube.module.css';
import ReactPlayer from 'react-player/youtube';
import SearchResult from './SearchResult'; // SearchResult 컴포넌트 임포트
import Playlist from './Playlist'; // Playlist 컴포넌트 임포트

const API_KEY = import.meta.env.VITE_YOUTUBE_API;

function YoutubeSearch() {
  const axiosInstance = useCustomAxios();
  const playerRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5); // 초기 볼륨은 0.5로 설정
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const player = playerRef.current?.getInternalPlayer(); // playerRef.current가 null이 아닌 경우에만 getInternalPlayer()를 호출합니다.
    if (player) {
      player.setVolume(volume * 100);
    }
  }, [volume]);

  const searchYoutube = async () => {
    try {
      const response = await axiosInstance.get(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${searchTerm}&maxResults=5&type=video`,
      );
      setSearchResult(response.data.items);
    } catch (error) {
      console.error('Error searching YouTube:', error);
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
    setSelectedVideos(selectedVideos.filter(video => video.id !== videoId)); // 리스트에서 삭제하는 함수
    if (selectedVideos[currentVideoIndex]?.id === videoId) {
      // 삭제된 동영상이 현재 플레이 중인 동영상이면 다음 동영상으로 변경
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handlePrevClick = () => {
    setCurrentVideoIndex(prev =>
      prev === 0 ? selectedVideos.length - 1 : prev - 1,
    );
  };

  const handleNextClick = () => {
    setCurrentVideoIndex(prev =>
      prev === selectedVideos.length - 1 ? 0 : prev + 1,
    );
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = e => {
    setVolume(parseFloat(e.target.value));
  };

  const handleSeekChange = e => {
    const seekTo = parseFloat(e.target.value);
    playerRef.current.seekTo(seekTo, 'seconds');
  };

  const handleProgress = state => {
    setPlayedSeconds(state.playedSeconds);
    setDuration(state.loadedSeconds);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.searchbar}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleSearchKeyPress}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>

      {/* SearchResult 컴포넌트 추가 */}
      <SearchResult
        searchResult={searchResult}
        handleAddButtonClick={handleAddButtonClick}
      />

      {/* Playlist 컴포넌트 추가 */}
      <Playlist
        selectedVideos={selectedVideos}
        handleDeleteButtonClick={handleDeleteButtonClick}
        handleVideoItemClick={handleVideoItemClick}
      />

      {selectedVideos.length > 0 && (
        <div className={styles.addedvideo}>
          <div className="player-wrapper">
            <ReactPlayer
              ref={playerRef}
              className="react-player"
              playing={isPlaying}
              url={`https://youtube.com/embed/${selectedVideos[currentVideoIndex]?.id}`}
              width="100%"
              height="100%"
              controls={false}
              onProgress={handleProgress}
            />
          </div>
          <div className={styles.controls}>
            <button onClick={handlePlayPause}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={volume}
              onChange={handleVolumeChange}
            />
            <input
              type="range"
              min={0}
              max={duration}
              step="any"
              value={playedSeconds}
              onChange={handleSeekChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default YoutubeSearch;
