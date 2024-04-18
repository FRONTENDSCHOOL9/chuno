import styles from './styles/recommenditem.module.css';

function Recommendlistitem() {
  return (
    <>
      <ul className={styles.recwrap_list}>
        <li className={styles.reclistitem}>
          <h3>#휴식</h3>
          <h3>#쉼터</h3>
          <h3>#산책</h3>
        </li>
      </ul>
    </>
  );
}

export default Recommendlistitem;
