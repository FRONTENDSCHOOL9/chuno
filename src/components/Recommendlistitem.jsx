// Recommendlistitem.jsx
import styles from './styles/recommenditem.module.css';
import PropTypes from 'prop-types';

function Recommendlistitem({ theme }) {
  return (
    <>
      <ul className={styles.recwrap_list}>
        <li className={styles.reclistitem}>
          <h3>{theme}</h3>
        </li>
      </ul>
    </>
  );
}

Recommendlistitem.propTypes = {
  id: PropTypes.number.isRequired,
  theme: PropTypes.string.isRequired,
};

export default Recommendlistitem;
