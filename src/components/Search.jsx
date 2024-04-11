import Submit from "@components/Submit";
import { useState } from "react";
import PropTypes from 'prop-types';

Search.propTypes = {
  onClick: PropTypes.func
};

function Search({ onClick }){
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <form>
      <input className="border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" type="text" value={ keyword } onChange={ handleChange } />
      <Submit onClick={ (e) => { e.preventDefault(); onClick(keyword); }}>검색</Submit>
    </form>
  );
}

export default Search;