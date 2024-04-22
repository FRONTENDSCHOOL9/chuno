import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles/search.module.css';
Search.propTypes = {
  onClick: PropTypes.func.isRequired,
};
function Search({ onClick }) {
  const [keyword, setKeyword] = useState('');

  const handleChange = e => {
    setKeyword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onClick(keyword);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        placeholder="키워드를 입력해주세요."
        className={styles.search}
        type="text"
        value={keyword}
        onChange={handleChange}
      />
      <button type="submit" className={styles.searchSubmit}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5534 11.7244C15.2344 12.3742 15.2909 13.1723 15.8017 13.6852L18.9531 16.849C19.5316 17.4298 19.5307 18.3693 18.951 18.949C18.3706 19.5294 17.4294 19.5294 16.849 18.949L13.6972 15.7972C13.1882 15.2882 12.3953 15.2273 11.7486 15.5434C10.6347 16.0878 9.44513 16.36 8.18 16.36C5.92667 16.36 4 15.56 2.4 13.96C0.8 12.36 0 10.4333 0 8.18C0 5.92667 0.8 4 2.4 2.4C4 0.8 5.92667 0 8.18 0C10.4333 0 12.36 0.8 13.96 2.4C15.56 4 16.36 5.92667 16.36 8.18C16.36 9.44736 16.0911 10.6288 15.5534 11.7244ZM13.62 8.18C13.62 6.67333 13.09 5.38667 12.03 4.32C10.97 3.25333 9.68667 2.72 8.18 2.72C6.67333 2.72 5.38667 3.25333 4.32 4.32C3.25333 5.38667 2.72 6.67333 2.72 8.18C2.72 9.68667 3.25333 10.97 4.32 12.03C5.38667 13.09 6.67333 13.62 8.18 13.62C9.68667 13.62 10.97 13.09 12.03 12.03C13.09 10.97 13.62 9.68667 13.62 8.18Z"
            fill="#D2CECE"
          />
        </svg>
      </button>
    </form>
  );
}

export default Search;
