import Button from '@components/Button';
import { Link, useNavigate } from 'react-router-dom';
import styles from './first.module.css';
import mainlogo from '@assets/svg/mainlogo.svg';

function First() {
  const navigate = useNavigate();

  return (
    <div id="App">
      <div className={styles.firstPage}>
        <img src={mainlogo} alt="함께들어용~" />
        <Button
          className={styles.login}
          onClick={() => navigate('/users/login')}
        >
          로그인
        </Button>
        <Button
          className={styles.signup}
          onClick={() => navigate('/users/signup')}
        >
          회원가입
        </Button>
        <Link to="/main" className={styles.unsign}>
          비회원으로 시작하기
        </Link>
      </div>
    </div>
  );
}

export default First;
