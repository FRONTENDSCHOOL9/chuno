import styles from './styles/modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children, message, showCancelButton }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalText}>
          {message && <p className={styles.modalMessage}>{message}</p>}
          {children}
          {/* <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button> */}
        </div>
        {showCancelButton && (
          <button className={styles.cancelButton} onClick={onClose}>
            확인
          </button>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  message: PropTypes.string,
  showCancelButton: PropTypes.bool,
};

export default Modal;
