import { useState, useRef } from 'react';
import useCustomAxios from '../hook/useCustomAxios.mjs';
import styles from './youtube.module.css';
import ReactPlayer from 'react-player/youtube';

const API_KEY = import.meta.env.VITE_YOUTUBE_API;

const changechar = /[^\w\s]/gi; // 특수 문자를 제거하는 정규식

function YoutubeSearch() {
  const axiosInstance = useCustomAxios();
  const playerRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

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
      <ul className={styles.wrap_player}>
        {searchResult.map(item => (
          <li className={styles.playerlist} key={item.id.videoId}>
            {/*// 특수문자 매치 */}
            <iframe
              width="100"
              height="140"
              src={`https://youtube.com/embed/${item.id.videoId}`}
            ></iframe>
            <h3 className={styles.listname}>
              {item.snippet.title.replace(changechar, '')}
            </h3>{' '}
            <button
              className={styles.playadd}
              onClick={() =>
                handleAddButtonClick(item.id.videoId, item.snippet.title)
              }
            >
              +
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.playlistadded}>
        <h2>Playlist</h2>
        <ul>
          {selectedVideos.map((video, index) => (
            <li key={video.id}>
              {video.title.replace(changechar, '')} {/*// 특수문자 매치 */}
              <button onClick={() => handleDeleteButtonClick(video.id)}>
                -
              </button>{' '}
              {/*// 리스트에서 삭제하는 버튼 */}
              <button onClick={() => handleVideoItemClick(video.id, index)}>
                Play
              </button>{' '}
              {/*// 비디오 재생 버튼 */}
            </li>
          ))}
        </ul>
        <div>
          <button onClick={handlePrevClick}>Prev</button>
          <button onClick={handleNextClick}>Next</button>
        </div>
      </div>

      {selectedVideos.length > 0 && (
        <div className={styles.addedvideo}>
          <div className="player-wrapper">
            <ReactPlayer
              ref={playerRef}
              className="react-player"
              playing={true}
              url={`https://youtube.com/embed/${selectedVideos[currentVideoIndex]?.id}`}
              width="100%"
              height="100%"
              controls={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default YoutubeSearch;
