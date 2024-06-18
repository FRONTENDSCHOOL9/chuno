import PropTypes from 'prop-types';
import styles from './youtube.module.css';
import cancle from '@assets/svg/buttons/cancle.svg';
import { useMemo } from 'react';

CreateList.propTypes = {
  selectedVideos: PropTypes.array.isRequired,
  handleDeleteButtonClick: PropTypes.func.isRequired,
};

function CreateList({ selectedVideos, handleDeleteButtonClick }) {
  // YouTube 썸네일 URL 생성 함수
  const generateThumbnailUrl = (videoId, quality = 'mqdefault') => {
    const baseUrl = 'https://img.youtube.com/vi/';
    const qualityOptions = {
      default: 'default.jpg',
      mqdefault: 'mqdefault.jpg',
      maxresdefault: 'maxresdefault.jpg',
    };
    const qualitySuffix = qualityOptions[quality] || qualityOptions.mqdefault;
    return `${baseUrl}${videoId}/${qualitySuffix}`;
  };

  // 특수 문자 이스케이프
  const escapeSpecialCharacters = str =>
    str.replace(/&(?:[a-zA-Z]+|#\d+);/g, '');

  // 중복 제거된 비디오 리스트
  const distinctVideos = useMemo(
    () =>
      selectedVideos.filter(
        (video, index, self) =>
          index === self.findIndex(v => v.id === video.id),
      ),
    [selectedVideos],
  );

  return (
    <div className={styles.addedWrap}>
      <p className={styles.addedNotice}>아래에 추가한 노래가 표시 됩니다. </p>
      <ul className={styles.playlistAdded}>
        {distinctVideos.map(video => (
          <li className={styles.list} key={video.id}>
            {/* 썸네일 이미지 */}
            <img
              className={styles.listThumb}
              src={generateThumbnailUrl(video.id)}
              alt={video.title}
            />
            {/* 영상 제목 */}
            <p className={styles.listTitle}>
              {escapeSpecialCharacters(video.title)}
            </p>
            {/* 삭제 버튼 */}
            <div
              className={styles.listDeleteButton}
              onClick={() => handleDeleteButtonClick(video.id)}
            >
              <img src={cancle} alt="삭제" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreateList;
