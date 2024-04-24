import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles/button.module.css';
import Back from '@assets/svg/buttons/back.svg';

ButtonBack.propTypes = {
  path: PropTypes.string.isRequired,
};

function ButtonBack({ path }) {
  const navigate = useNavigate();
  return (
    <span className={styles.back} onClick={() => navigate(path)}>
      <img src={Back} alt="뒤로가기" />
    </span>
  );
}

export default ButtonBack;
