// Recommendlistitem.jsx
import styles from './styles/recommenditem.module.css';
import PropTypes from 'prop-types';

Recommendlistitem.propTypes = {
  value: PropTypes.string,
};

function Recommendlistitem({ theme }) {
  return (
    <div className={styles.recListItem}>
      <h3>{theme}</h3>
    </div>
  );
}

Recommendlistitem.propTypes = {
  id: PropTypes.number.isRequired,
  theme: PropTypes.string.isRequired,
};

export default Recommendlistitem;
