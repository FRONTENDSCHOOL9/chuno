import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import defaultThumbnail from '@public/yongyong.png';

import styles from './ProductsCommon.module.css';

ProductsItem.propTypes = {
  item: PropTypes.object.isRequired,
};

function ProductsItem({ item }) {
  const navigate = useNavigate();

  // *NOTE - 썸네일이 지정되지 않았다면 기본썸네일로 노출
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

export default ProductsItem;
