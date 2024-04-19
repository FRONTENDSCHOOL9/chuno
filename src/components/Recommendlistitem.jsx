import styles from './styles/recommenditem.module.css';
import PropTypes from 'prop-types';

Recommendlistitem.propTypes = {
  theme: PropTypes.string.isRequired,
};

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

export default Recommendlistitem;
