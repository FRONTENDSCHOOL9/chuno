import PropTypes from 'prop-types';
import styles from './youtube.module.css';

function Playlist({
  selectedVideos,
  handleDeleteButtonClick,
  handleVideoItemClick,
  handlePrevClick,
  handleNextClick,
}) {
  const changechar = /[^\w\s]/gi;

  return (
    <div className={styles.playlistadded}>
      <h2>Playlist</h2>
      <ul>
        {selectedVideos.map((video, index) => (
          <li key={video.id}>
            {video.title.replace(changechar, '')}
            <button onClick={() => handleDeleteButtonClick(video.id)}>-</button>
            <button onClick={() => handleVideoItemClick(video.id, index)}>
              Play
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePrevClick}>Prev</button>
        <button onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
}

Playlist.propTypes = {
  selectedVideos: PropTypes.array.isRequired,
  handleDeleteButtonClick: PropTypes.func.isRequired,
  handleVideoItemClick: PropTypes.func.isRequired,
  handlePrevClick: PropTypes.func.isRequired, // handlePrevClick 함수의 PropTypes를 추가합니다.
  handleNextClick: PropTypes.func.isRequired, // handleNextClick 함수의 PropTypes를 추가합니다.
};

export default Playlist;
