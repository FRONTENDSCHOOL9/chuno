import styles from './styles/musicplayer.module.css';

function Songlist() {
  return (
    <div className={styles.songlist}>
      <div className={styles.thumbnail}>
        <img
          src="https://img.youtube.com/vi/g82W6uwQcJE/maxresdefault.jpg"
          alt=""
        />
      </div>
      <h3 className={styles.songlist_item}>Worlds Smallest Violin</h3>
      <span className={styles.option}>•••</span>
    </div>
  );
}

export default Songlist;
