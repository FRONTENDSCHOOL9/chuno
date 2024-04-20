import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import styles from './PlayList.module.css';

PlayListItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    seller: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    extra: PropTypes.shape({
      keyword: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  }).isRequired,
};

function PlayListItem({ item }) {
  const navigate = useNavigate();

  const keywordList = item.extra?.keyword.map((keyword, index) => (
    <span key={index}>{keyword}</span>
  ));

  return (
    <li
      className={styles.listitem}
      onClick={() => navigate(`/playlist/${item._id}`)}
    >
      <div className={styles.iteminformation}>
        <div className={styles.thumbnail}></div>
        <div className={styles.desc}>
          <h3>{item.name}</h3>
          <span>{item.seller.name}</span>
        </div>
      </div>
      <div className={styles.theme}></div>
      <div className={styles.themelist}>{keywordList}</div>
    </li>
  );
}

export default PlayListItem;
