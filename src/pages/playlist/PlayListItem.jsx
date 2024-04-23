import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './PlayList.module.css';

PlayListItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    mainImages: PropTypes.arrayOf(PropTypes.string).isRequired,
    seller: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    extra: PropTypes.shape({
      keyword: PropTypes.array,
    }),
  }).isRequired,
};

function PlayListItem({ item }) {
  const navigate = useNavigate();

  let thumbnail = item?.mainImages;
  if (thumbnail) {
    thumbnail = `${import.meta.env.VITE_API_SERVER}/files/${
      import.meta.env.VITE_CLIENT_ID
    }/${thumbnail}`;
  } else {
    thumbnail = `${import.meta.env.VITE_API_SERVER}/files/${
      import.meta.env.VITE_CLIENT_ID
    }/yongyong.png`;
  }

  // item.extra.keyword가 있는 경우에만 map 함수 호출
  const keywordList =
    item.extra?.keyword &&
    item.extra.keyword.map((keyword, index) => (
      <span key={index}>{keyword}</span>
    ));

  return (
    <li
      className={styles.listitem}
      onClick={() => navigate(`/playlist/${item._id}`)}
    >
      <div className={styles.itemInformation}>
        <div className={styles.thumbnail}>
          <img src={thumbnail} alt={item.name || 'Default Thumbnail'} />
        </div>
        <div className={styles.desc}>
          <h3>{item.name}</h3>
          <span>{item.seller.name}</span>
        </div>
      </div>
      <div className={styles.theme}></div>
      <div className={styles.themeList}>{keywordList}</div>
    </li>
  );
}

export default PlayListItem;
