import useState from 'react';
import useCustomAxios from '../hook/useCustomeAxios.mjs';


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
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${searchTerm}&maxResults=5&type=video`
      );
      setSearchResult(response.data.items);
    } catch (error) {
      console.error('Error searching YouTube:', error);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    searchYoutube();
  };

  const handleAddButtonClick = (videoId, videoTitle) => {
    const newVideo = { id: videoId, title: videoTitle };
    setSelectedVideos([...selectedVideos, newVideo]);
  };

  const handleVideoItemClick = (videoId) => {
    setSelectedVideoId(videoId);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleInputChange} />
      <button onClick={handleSearchClick}>Search</button>

      <ul>
        {searchResult.map((item) => (
          <li key={item.id.videoId}>
            <div>{item.snippet.title}</div>
            <iframe
              width="430"
              height="315"
              src={`https://youtube.com/embed/${item.id.videoId}`}
              frameBorder="0"
            ></iframe>
            <button
              onClick={() =>
                handleAddButtonClick(item.id.videoId, item.snippet.title)
              }
            >
              +
            </button>
          </li>
        ))}
      </ul>

      <ul>
        {selectedVideos.map((video) => (
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
