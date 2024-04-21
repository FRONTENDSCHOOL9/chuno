import styles from './styles/button.module.css';
import PropTypes from 'prop-types';

BtnCommon.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

function BtnCommon({ onClick, children }) {
  return (
    <button
      className={`${styles.common_btn} ${styles.btn_post} ${styles.btn_active}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export default BtnCommon;
