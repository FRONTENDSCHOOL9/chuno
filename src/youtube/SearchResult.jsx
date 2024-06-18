import PropTypes from 'prop-types';
import styles from './youtube.module.css';
import { useRecoilState } from 'recoil';
import { selectedVideosState } from '@recoil/user/atoms.mjs';

SearchResult.propTypes = {
  searchResult: PropTypes.array.isRequired,
  handleAddButtonClick: PropTypes.func.isRequired,
};

function SearchResult({ searchResult, handleAddButtonClick }) {
  const escapeSpecialCharacters = str =>
    str.replace(/&(?:[a-zA-Z]+|#\d+);/g, '');

  const [selectedVideos, setSelectedVideos] =
    useRecoilState(selectedVideosState);

  const handleAddButton = (videoId, videoTitle) => {
    if (!selectedVideos.some(video => video.id === videoId)) {
      const newVideo = { id: videoId, title: videoTitle };
      setSelectedVideos(prevSelectedVideos => [
        ...prevSelectedVideos,
        newVideo,
      ]);
      handleAddButtonClick(newVideo);
    }
  };

  return (
    <ul className={styles.wrapPlayer}>
      {searchResult.map(item => (
        <li className={styles.playerList} key={item.id.videoId}>
          <iframe
            className={styles.resultVideo}
            src={`https://youtube.com/embed/${item.id.videoId}`}
          ></iframe>
          <h3 className={styles.listName}>
            {escapeSpecialCharacters(item.snippet.title)}
          </h3>
          <button
            className={styles.playadd}
            onClick={() => handleAddButton(item.id.videoId, item.snippet.title)}
          >
            +
          </button>
        </li>
      ))}
    </ul>
  );
}

export default SearchResult;
