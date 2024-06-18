import { useState } from 'react';
import styles from './musicplayer.module.css';
import * as handle from './handler/handle';

import PropTypes from 'prop-types';
SongList.propTypes = {
  item: PropTypes.string.isRequired,
  currentVideoIndex: PropTypes.string.number,
  setCurrentVideoIndex: PropTypes.string.number,
};
// escapeSpecialCharacters 함수 정의
const escapeSpecialCharacters = str => {
  return str.replace(/&(?:[a-zA-Z]+|#\d+);/g, '');
};

function SongList({ item, currentVideoIndex, setCurrentVideoIndex }) {
  const [isListBoxOpen, setIsListBoxOpen] = useState(false);

  const toggleListBox = () => {
    setIsListBoxOpen(!isListBoxOpen);
  };

  return (
    <div
      className={`${styles.listBox} ${isListBoxOpen ? styles.fullBox : ''}`}
      onClick={toggleListBox}
    >
      <div className={styles.curretbox}>
        <h4 className={`${styles.songlistTitle} ${styles.titleFirst}`}>
          재생중인 곡
        </h4>
        <div className={styles.currentPlay}>
          {/* 썸네일 이미지가 있는지 확인하여 렌더링 */}
          {item.extra.music[currentVideoIndex] && (
            <div className={styles.thumbnail}>
              <img
                src={`https://img.youtube.com/vi/${item.extra.music[currentVideoIndex].id}/default.jpg`}
                alt=""
              />
            </div>
          )}
          {/* 곡 정보가 있는지 확인하여 렌더링 */}
          {item.extra.music[currentVideoIndex] && (
            <h3>
              {escapeSpecialCharacters(
                item.extra.music[currentVideoIndex].title,
              )}
            </h3>
          )}
        </div>
      </div>
      <div className={styles.selectBox}>
        <h4 className={`${styles.songlistTitle} ${styles.titleSecond}`}>
          곡 목록
        </h4>
        <div className={styles.songlist}>
          {item?.extra?.music.map((video, index) => (
            <div
              className={styles.songlistItem}
              key={index}
              onClick={() =>
                handle.handleSongSelect(video.id, item, setCurrentVideoIndex)
              }
            >
              <div className={styles.thumbnail}>
                {/* 썸네일 이미지가 있는지 확인하여 렌더링 */}
                {video && (
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/default.jpg`}
                    alt=""
                  />
                )}
              </div>
              {/* 곡 정보가 있는지 확인하여 렌더링 */}
              {video && <h3>{escapeSpecialCharacters(video.title)}</h3>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SongList;
