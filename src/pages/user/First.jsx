import Button from '@components/Button';
import { Link, useNavigate } from 'react-router-dom';
import styles from './first.module.css';
import mainlogo from '@assets/svg/mainlogo.svg';

function First() {
  const navigate = useNavigate();

  return (
    <div className={styles.firstPage}>
      <div className={styles.loginSection}>
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

      <div className={styles.waveWrapper}>
        <div className={styles.bgTop}>
          <div className={`${styles.wave} ${styles.waveTop}`}>
            <img
              src={`${import.meta.env.VITE_API_SERVER}/files/${
                import.meta.env.VITE_CLIENT_ID
              }/wave1.png`}
            />
          </div>
        </div>
        <div className={styles.bgMiddle}>
          <div className={`${styles.wave} ${styles.waveMiddle}`}>
            <img
              src={`${import.meta.env.VITE_API_SERVER}/files/${
                import.meta.env.VITE_CLIENT_ID
              }/wave2.png`}
            />
          </div>
        </div>
        <div className={styles.bgBottom}>
          <div className={`${styles.wave} ${styles.waveBottom}`}>
            <img
              src={`${import.meta.env.VITE_API_SERVER}/files/${
                import.meta.env.VITE_CLIENT_ID
              }/wave3.png`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default First;
