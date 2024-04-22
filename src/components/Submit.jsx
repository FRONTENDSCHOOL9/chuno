import styles from './styles/button.module.css';
import PropTypes from 'prop-types';

Submit.propTypes = {
  children: PropTypes.string,
};

function Submit({ children, ...rest }) {
  return (
    <button
      className={`${styles.commonBtn} ${styles.submitBtn} ${styles.btnActive}`}
      type="submit"
      {...rest}
    >
      {children}
    </button>
  );
}

export default Submit;
