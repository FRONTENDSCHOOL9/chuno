import styles from './styles/button.module.css';
import PropTypes from 'prop-types';

Submit.propTypes = {
  children: PropTypes.string,
};

function Submit({ children, ...rest }) {
  return (
    <button
      className={`${styles.comon_btn_style} ${styles.btn1} ${styles.btn_active}`}
      type="submit"
      {...rest}
    >
      {children}
    </button>
  );
}

export default Submit;
