import { useState } from 'react';
import useCustomAxios from '../hook/useCustomAxios.mjs';
import styles from './youtube.module.css';

const API_KEY = 'AIzaSyBj9A3NV5_Q6Ev-v38ZtPBvURuGV3ufyOE';

function YoutubeSearch() {
  const axiosInstance = useCustomAxios();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

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

  const handleSearchClick = () => {
    searchYoutube();
  };

  const handleAddButtonClick = (videoId, videoTitle) => {
    const newVideo = { id: videoId, title: videoTitle };
    setSelectedVideos([...selectedVideos, newVideo]);
  };

  const handleVideoItemClick = videoId => {
    setSelectedVideoId(videoId);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.searchbar}>
        <input
          type="text"
          placeholder="추가하고 싶은 노래를 검색해용"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>

      <ul className={styles.wrap_player}>
        {searchResult.map(item => (
          <li className={styles.playerlist} key={item.id.videoId}>
            <iframe
              width="140"
              height="180"
              src={`https://youtube.com/embed/${item.id.videoId}`}
            ></iframe>
            <h2 className={styles.listname}>{item.snippet.title}</h2>
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

      <ul className={styles.playlistadded}>
        {selectedVideos.map(video => (
          <li key={video.id} onClick={() => handleVideoItemClick(video.id)}>
            {video.title}
          </li>
        ))}
      </ul>

      {selectedVideoId && (
        <div>
          <iframe
            width="430"
            height="315"
            src={`https://youtube.com/embed/${selectedVideoId}`}
            frameBorder="0"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default YoutubeSearch;
