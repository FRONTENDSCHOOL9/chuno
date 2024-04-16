import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './board.css';

BoardListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

function BoardListItem({ item }) {
  const navigate = useNavigate();

  return (
    <>
      <ul className="wrap_list">
        <li
          className="listitem"
          onClick={() => navigate(`/products/${item._id}`)}
        >
          <div className="thumbnail">
            <img src={`${item.path}`} alt={`${item.orginalname}`} />
          </div>
          <div className="desc">
            <h3>{item.name}</h3>
            <span>{item.name}</span>
          </div>
          <span className="count">15곡</span>
        </li>
      </ul>
    </>
  );
}

export default BoardListItem;
