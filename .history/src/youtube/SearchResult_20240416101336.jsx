import React from 'react';
import styles from './youtube.module.css';

function SearchResult({ searchResult, handleAddButtonClick }) {
  const changechar = /[^\w\s]/gi;

  return (
    <ul className={styles.wrap_player}>
      {searchResult.map(item => (
        <li className={styles.playerlist} key={item.id.videoId}>
          {/*// 특수문자 매치 */}
          <iframe
            width="100"
            height="140"
            src={`https://youtube.com/embed/${item.id.videoId}`}
          ></iframe>
          <h3 className={styles.listname}>
            {item.snippet.title.replace(changechar, '')}
          </h3>{' '}
          <button
            className={styles.playadd}
            onClick={() =>
              handleAddButtonClick(item.id.videoId, item.snippet.title)
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
