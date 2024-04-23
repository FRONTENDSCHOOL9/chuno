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
      <img src={`http://ruelline.co.kr/img/${value}.jpg`} alt="" />
    </Link>
  );
}

export default Recommendlistitem;
