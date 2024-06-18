import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';

const Modal = ({ isOpen, onClose, children, message, showCancelButton }) => {
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.height = '100vh';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.height = 'auto';
      document.documentElement.style.overflow = 'auto';
      document.body.style.height = 'auto';
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.documentElement.style.height = 'auto';
      document.documentElement.style.overflow = 'auto';
      document.body.style.height = 'auto';
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

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
