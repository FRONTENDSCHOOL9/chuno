import PropTypes from 'prop-types';
import styles from './styles/button.module.css';

Keywords.propTypes = {
  selectedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
};

function Keywords({ selectedValues, onClick }) {
  const handleClick = value => {
    onClick(value);
  };

  return (
    <div className={styles.keywordsObj}>
      {[
        '리듬타용',
        '놀러가용',
        '행복해용',
        '우울해용',
        '집중해용',
        '멍때려용',
        '화가나용',
        '내꿈꿔용',
        '움직여용',
      ].map(value => (
        <div
          key={value}
          className={`${styles.keywords} ${
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

export default Keywords;
