import { Link } from 'react-router-dom';
import styles from './styles/recommenditem.module.css';
import PropTypes from 'prop-types';

Recommendlistitem.propTypes = {
  theme: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

function Recommendlistitem({ theme, value }) {
  return (
    <Link to={`/themelist/${theme}`} className={styles.recListItem}>
      <h3 className={styles.themeTitle}>{theme}</h3>
      <img
        src={`${import.meta.env.VITE_API_SERVER}/files/${
          import.meta.env.VITE_CLIENT_ID
        }/${value}.jpg`}
        alt="테마별 이미지"
      />
    </Link>
  );
}

export default Recommendlistitem;
