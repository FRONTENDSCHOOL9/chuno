import PropTypes from 'prop-types';
import styles from './button.module.css';

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageClick = page => {
    onPageChange(page);
  };

  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
