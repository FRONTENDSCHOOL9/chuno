import styles from './board2.module.css';

function Boardlistitem() {
  return (
    <>
      <ul className={styles.wrap_list}>
        <li className={styles.listitem}>
          <div className={styles.thumbnail}>
            <img src="" alt="" />
          </div>
          <div className={styles.desc}>
            <h3>반려동물도 함께 듣는 곡</h3>
            <span>by doglike</span>
          </div>
          <span className={styles.count}>15곡</span>
        </li>
      </ul>
    </>
  );
}

export default Boardlistitem;
