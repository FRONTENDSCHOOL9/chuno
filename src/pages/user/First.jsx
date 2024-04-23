import Button from '@components/Button';
import { Link, useNavigate } from 'react-router-dom';
import styles from './first.module.css';
import mainlogo from '@assets/svg/mainlogo.svg';

function First() {
  const navigate = useNavigate();

  return (
    <div className={styles.firstPage}>
      <img src={mainlogo} alt="함께들어용~" />
      <Button className={styles.login} onClick={() => navigate('/users/login')}>
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

      <div className={styles.waveWrapper}>
        <div className={`${styles.waveWrapperInner} ${styles.bgTop}`}>
          <div
            className={`${styles.wave} ${styles.waveTop}`}
            style={{
              backgroundImage: "url('http://ruelline.co.kr/img/wave1.png')",
            }}
          ></div>
        </div>
        <div className={`${styles.waveWrapperInner} ${styles.bgMiddle}`}>
          <div
            className={`${styles.wave} ${styles.waveMiddle}`}
            style={{
              backgroundImage: "url('http://ruelline.co.kr/img/wave2.png')",
            }}
          ></div>
        </div>
        <div className={`${styles.waveWrapperInner} ${styles.bgBottom}`}>
          <div
            className={`${styles.wave} ${styles.waveBottom}`}
            style={{
              backgroundImage: "url('http://ruelline.co.kr/img/wave3.png')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default First;
