import PropTypes from 'prop-types';
import { Link, useSearchParams } from 'react-router-dom';

Pagination.propTypes = {
  totalPage: PropTypes.number,
  current: PropTypes.number,
};

function Pagination({ totalPage, current=1 }){
  const [searchParams] = useSearchParams();
  const pageList = [];

  for(let page=1; page<=totalPage; page++){
    searchParams.set('page', page);
    let search = searchParams.toString();
    pageList.push((
      <li key={ page } className={ current===page ? 'text-bold text-blue-700' : '' }>
        <Link className="hover:text-blue-700" to={ `/boards?${ search }` }>{ page }</Link>
      </li>
    ));
  }

  return (
    <div>
      <ul className="flex justify-center gap-3 m-4">
        { pageList }
      </ul>
    </div>
  );
}

export default Pagination;