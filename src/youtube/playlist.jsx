import PropTypes from 'prop-types';
import styles from './youtube.module.css';

// YouTube 썸네일 URL 생성 함수
function generateThumbnailUrl(videoId, quality = 'mqdefault') {
  const baseUrl = 'https://img.youtube.com/vi/';
  const qualityOptions = {
    default: 'default.jpg',
    mqdefault: 'mqdefault.jpg',
    maxresdefault: 'maxresdefault.jpg',
  };
  const qualitySuffix = qualityOptions[quality] || qualityOptions.mqdefault;
  return `${baseUrl}${videoId}/${qualitySuffix}`;
}

function Playlist({
  selectedVideos,
  handleDeleteButtonClick,
  handleVideoItemClick,
  handlePrevClick,
  handleNextClick,
}) {
  const changechar = /[^\w\s]/gi;

  const distinctVideos = selectedVideos.filter(
    (video, index, self) => index === self.findIndex(v => v.id === video.id),
  );

  return (
    <div className={styles.playlistadded}>
      <h2>Playlist</h2>
      <ul>
        {distinctVideos.map(video => (
          <li key={video.id}>
            {/* 영상 제목 */}
            {video.title.replace(changechar, '')}
            {/* 썸네일 이미지 */}
            <img src={generateThumbnailUrl(video.id)} alt={video.title} />
            {/* 삭제 및 재생 버튼 */}
            <button onClick={() => handleDeleteButtonClick(video.id)}>-</button>
            <button onClick={() => handleVideoItemClick(video.id)}>Play</button>
          </li>
        ))}
      </ul>
      <div>
        {/* 이전 및 다음 버튼 */}
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
  handlePrevClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired,
};

export default Playlist;
