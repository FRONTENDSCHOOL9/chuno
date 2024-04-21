import styles from './styles/musicplayer.module.css';
import PropTypes from 'prop-types';

Songlist.propTypes = {
  handleVideoItemClick: PropTypes.func.isRequired,
};

function Songlist({ handleVideoItemClick }) {
  const handleClick = videoId => {
    // 곡을 클릭할 때 해당 곡의 ID를 전달
    handleVideoItemClick(videoId);
  };

  return (
    <div className={styles.songlist}>
      <div
        className={styles.songlist_item}
        onClick={() => handleClick('g82W6uwQcJE')}
      >
        <div className={styles.thumbnail}>
          <img
            src="https://img.youtube.com/vi/g82W6uwQcJE/maxresdefault.jpg"
            alt=""
          />
        </div>
        <h3>Worlds Smallest Violin</h3>
        <span className={styles.option}>•••</span>
      </div>
      <div
        className={styles.songlist_item}
        onClick={() => handleClick('jieuL-kj9-A')}
      >
        <div className={styles.thumbnail}>
          <img
            src="https://img.youtube.com/vi/jieuL-kj9-A/maxresdefault.jpg"
            alt=""
          />
        </div>
        <h3>Worlds Smallest Violin</h3>
        <span className={styles.option}>•••</span>
      </div>
      <div
        className={styles.songlist_item}
        onClick={() => handleClick('g82W6uwQcJE')}
      >
        <div className={styles.thumbnail}>
          <img
            src="https://img.youtube.com/vi/g82W6uwQcJE/maxresdefault.jpg"
            alt=""
          />
        </div>
        <h3>Worlds Smallest Violin</h3>
        <span className={styles.option}>•••</span>
      </div>
    </div>
  );
}

export default Songlist;
