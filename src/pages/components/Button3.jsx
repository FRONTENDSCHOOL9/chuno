import styles from './styles/button.module.css';

function Button3() {
  return (
    <div className={styles.btn3Parent}>
      <a href="#" className={styles.btn3}>
        이별
      </a>
      <a href="#" className={styles.btn3}>
        운동
      </a>
      <a href="#" className={styles.btn3}>
        행복
      </a>
      <a href="#" className={styles.btn3}>
        우울
      </a>
      <a href="#" className={styles.btn3}>
        집중
      </a>
      <a href="#" className={styles.btn3}>
        사랑
      </a>
      <a href="#" className={styles.btn3}>
        분노
      </a>
    </div>
  );
}
export default Button3;
