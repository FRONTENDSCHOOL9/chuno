import styles from './styles/musicplayer.module.css';

function Songlist() {
  return (
    <>
      <div className={styles.wrap_list}>
        <div className={styles.thumbnail}>
          <img src="" alt="" />
        </div>
        <h3 className={styles.songTitle}>Worlds Smallest Violin</h3>
        <span className={styles.count}>•••</span>
      </div>
    </>
  );
}

export default Songlist;
