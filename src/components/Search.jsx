import { useState } from 'react';
import PropTypes from 'prop-types';

Search.propTypes = {
  onClick: PropTypes.func,
};

function Search({ onClick }) {
  const [keyword, setKeyword] = useState('');

  const handleChange = e => {
    setKeyword(e.target.value);
  };

  return (
    <form className="searchform">
      <input
        placeholder="키워드를 입력해주세요."
        className="search"
        type="text"
        value={keyword}
        onChange={handleChange}
      />
      <button
        className="searchsubmit"
        onClick={e => {
          e.preventDefault();
          onClick(keyword);
        }}
      >
        검색
      </button>
    </form>
  );
}

export default Search;
