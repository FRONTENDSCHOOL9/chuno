import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import styles from './PlayList.module.css';

// PlayListItem 컴포넌트에 대한 prop-types 정의
PlayListItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    seller: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

function PlayListItem({ item }) {
  const navigate = useNavigate();

  // 썸네일이 지정되지 않았다면 기본 썸네일로 노출
  return (
    <li
      className={styles.listitem}
      onClick={() => navigate(`/playlist/${item._id}`)}
    >
      <div className={styles.thumbnail}></div>
      <div className={styles.desc}>
        <h3>{item.name}</h3>
        <span>{item.seller.name}</span>
      </div>
      <span className={styles.count}>15곡</span>
    </li>
  );
}

export default PlayListItem;
