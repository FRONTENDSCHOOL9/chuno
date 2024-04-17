import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './board.module.css'; // CSS 모듈 불러오기
import defaultThumbnail from '../../../public/yongyong.png';

BoardListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

function BoardListItem({ item }) {
  const navigate = useNavigate();

  return (
    <li
      className={styles.listitem}
      onClick={() => navigate(`/products/${item._id}`)}
    >
      <div className={styles.thumbnail}>
        <img
          src={item.path || defaultThumbnail}
          alt={item.orginalname || 'Default Thumbnail'}
        />
      </div>
      <div className={styles.desc}>
        <h3>{item.name}</h3>
        <span>{item.name}</span>
      </div>
      <span className={styles.count}>15곡</span>
    </li>
  );
}

export default BoardListItem;
