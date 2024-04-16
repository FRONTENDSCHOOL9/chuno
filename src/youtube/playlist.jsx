// 이 컴포넌트는 재생 목록을 표시하고 상호작용할 수 있는 기능을 제공합
// 주어진 selectedVideos 배열에서 각 동영상의 제목을 표시하고, 삭제 및 재생 버튼을 포함한 목록을 렌더링
// 이전과 다음 버튼을 통해 재생 목록을 옮길 수 있는 기능을 제공

// 중복된 key 값 워닝 제거
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
          <li key={index}>
            {' '}
            {/* 인덱스를 key로 사용 */}
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
  selectedVideos: PropTypes.array.isRequired, // 배열이어야 하며 필수
  handleDeleteButtonClick: PropTypes.func.isRequired, // 함수이어야 하며 필수
  handleVideoItemClick: PropTypes.func.isRequired, // 함수이어야 하며 필수
  handlePrevClick: PropTypes.func.isRequired, // 함수이어야 하며 필수
  handleNextClick: PropTypes.func.isRequired, // 함수이어야 하며 필수
};

export default Playlist;
