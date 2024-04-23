import PropTypes from 'prop-types';
import styles from './youtube.module.css';
import { useRecoilState } from 'recoil';
import { selectedVideosState } from '@recoil/user/atoms.mjs';

CreateList.propTypes = {
  selectedVideos: PropTypes.array.isRequired,
  handleDeleteButtonClick: PropTypes.func.isRequired,
  handleVideoItemClick: PropTypes.func.isRequired,
};

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

function CreateList({ handleDeleteButtonClick }) {
  const [selectedVideos, setSelectedVideos] =
    useRecoilState(selectedVideosState);
  const changechar = /[^\w\s]/gi;

  const distinctVideos = selectedVideos.filter(
    (video, index, self) => index === self.findIndex(v => v.id === video.id),
  );

  return (
    <div className={styles.added_wrap}>
      <p className={styles.added_notice}>아래에 추가한 노래가 표시 됩니다. </p>
      <ul className={styles.playlistadded}>
        {distinctVideos.map(video => (
          <li className={styles.list} key={video.id}>
            {/* 썸네일 이미지 */}
            <img
              className={styles.list_thumb}
              src={generateThumbnailUrl(video.id)}
              alt={video.title}
            />
            {/* 영상 제목 */}
            <p className={styles.list_title}>
              {video.title.replace(changechar, '')}
            </p>
            {/* 삭제 및 재생 버튼 */}
            <div
              className={styles.list_delete_button}
              onClick={() => {
                handleDeleteButtonClick(video.id);
                setSelectedVideos(prevSelectedVideos =>
                  prevSelectedVideos.filter(v => v.id !== video.id),
                );
              }}
            >
              -
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreateList;
