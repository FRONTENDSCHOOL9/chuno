import dragon from '@assets/svg/dragon.svg';
import styles from './styles/Loading.module.css';

function Loading() {
  return (
    <div className={styles.loadingWrap}>
      <div className={styles.loading}>
        <img src={dragon} alt="" />
        <p>잠깐만 기다려 주세용!</p>
      </div>
    </div>
  );
}

export default Loading;
