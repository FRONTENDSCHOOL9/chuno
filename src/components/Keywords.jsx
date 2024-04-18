import PropTypes from 'prop-types';
import styles from './styles/button.module.css';

Button3.propTypes = {
  selectedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
};

function Button3({ selectedValues, onClick }) {
  const handleClick = value => {
    onClick(value);
  };

  return (
    <div className={styles.btn3Parent}>
      {['이별', '운동', '행복', '우울', '집중', '사랑', '분노'].map(value => (
        <div
          key={value}
          className={`${styles.btn3} ${
            selectedValues.includes(value) ? styles.active : ''
          }`}
          onClick={() => handleClick(value)}
        >
          {value}
        </div>
      ))}
    </div>
  );
}

export default Button3;
