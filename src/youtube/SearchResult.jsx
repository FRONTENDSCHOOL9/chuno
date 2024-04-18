// YouTube에서 검색 결과를 표시하는 역할을 함
// 주어진 검색 결과를 받아서 각 동영상의 제목과 추가 버튼을 포함한 목록을 렌더링
// handleAddButtonClick 함수를 props로 받아 해당 버튼이 클릭되었을 때 실행될 동작을 처리
import PropTypes from 'prop-types';
import styles from './youtube.module.css';

SearchResult.propTypes = {
  searchResult: PropTypes.array.isRequired, // 배열이어야 하며 필수
  handleAddButtonClick: PropTypes.func.isRequired, // 함수이어야 하며 필수
};

function SearchResult({ searchResult, handleAddButtonClick }) {
  const changechar = /[^\w\s]/gi;

  const handleAddButton = (videoId, videoTitle) => {
    // handleAddButtonClick 함수를 호출할 때 클릭된 버튼의 정보를 전달
    handleAddButtonClick(videoId, videoTitle);
  };

  return (
    <ul className={styles.wrap_player}>
      {searchResult.map(item => (
        <li className={styles.playerlist} key={item.id.videoId}>
          <iframe
            className={styles.resultvideo}
            src={`https://youtube.com/embed/${item.id.videoId}`}
          ></iframe>
          <h3 className={styles.listname}>
            {item.snippet.title.replace(changechar, '')}
          </h3>{' '}
          <button
            className={styles.playadd}
            onClick={
              () => handleAddButton(item.id.videoId, item.snippet.title) // 클릭 이벤트 핸들러에서 함수를 호출하도록 수정
            }
          >
            +
          </button>
        </li>
      ))}
    </ul>
  );
}

export default SearchResult;
