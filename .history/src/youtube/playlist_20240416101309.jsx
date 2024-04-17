import React from 'react';
import styles from './youtube.module.css';

function Playlist({
  selectedVideos,
  handleDeleteButtonClick,
  handleVideoItemClick,
}) {
  const changechar = /[^\w\s]/gi;

  return (
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
  );
}

export default Playlist;
