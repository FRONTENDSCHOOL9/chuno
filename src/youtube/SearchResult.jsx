// YouTube에서 검색 결과를 표시하는 역할을 함
// 주어진 검색 결과를 받아서 각 동영상의 제목과 추가 버튼을 포함한 목록을 렌더링
// handleAddButtonClick 함수를 props로 받아 해당 버튼이 클릭되었을 때 실행될 동작을 처리
import PropTypes from 'prop-types';
import styles from './youtube.module.css';
import { useRecoilState } from 'recoil';
import { selectedVideosState } from '@recoil/user/atoms.mjs';

SearchResult.propTypes = {
  searchResult: PropTypes.array.isRequired,
};

function SearchResult({ searchResult }) {
  const changechar = /[^\w\s]/gi;
  const [selectedVideos, setSelectedVideos] =
    useRecoilState(selectedVideosState); // Recoil atom 상태를 가져옵니다.

  const handleAddButton = (videoId, videoTitle) => {
    // 선택한 비디오를 Recoil atom에 추가합니다.
    setSelectedVideos(prevSelectedVideos => [
      ...prevSelectedVideos,
      { id: videoId, title: videoTitle },
    ]);
  };

  return (
    <ul className={styles.wrapPlayer}>
      {searchResult.map(item => (
        <li className={styles.playerList} key={item.id.videoId}>
          <iframe
            className={styles.resultvideo}
            src={`https://youtube.com/embed/${item.id.videoId}`}
          ></iframe>
          <h3 className={styles.listName}>
            {item.snippet.title.replace(changechar, '')}
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
