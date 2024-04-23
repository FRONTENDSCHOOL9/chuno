import PropTypes from 'prop-types';
import styles from './youtube.module.css';
import { useRecoilState } from 'recoil';
import cancle from '@assets/svg/buttons/cancle.svg';
import { selectedVideosState } from '@recoil/user/atoms.mjs';
import { set } from 'react-hook-form';

CreateList.propTypes = {
  selectedVideos: PropTypes.array.isRequired,
  setSelectedVideos: PropTypes.func.isRequired,
  handleDeleteButtonClick: PropTypes.func.isRequired,
  handleVideoItemClick: PropTypes.func.isRequired,
};

function CreateList({
  selectedVideos: selectedVideosLocal,
  setSelectedVideos: setSelectedVideosLocal,
  handleDeleteButtonClick,
}) {
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

  const [selectedVideos, setSelectedVideos] =
    useRecoilState(selectedVideosState);
  function escapeSpecialCharacters(str) {
    return str.replace(/&(?:[a-zA-Z]+|#\d+);/g, '');
  }

  const distinctVideos = selectedVideosLocal.filter(
    (video, index, self) => index === self.findIndex(v => v.id === video.id),
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
            {/* 삭제 및 재생 버튼 */}
            <div
              className={styles.listDeleteButton}
              onClick={() => {
                handleDeleteButtonClick(video.id);
                setSelectedVideos(prevSelectedVideos =>
                  prevSelectedVideos.filter(v => v.id !== video.id),
                );
              }}
            >
              <img src={cancle} alt="" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreateList;
