import Boardlistitem from '../boards/boardlistitem';
import Recommendlistitem from './Recommendlistitem';
import styles from './styles/mainpage.module.css';

function Mainpage() {
  return (
    <div>
      <form className={styles.mainpageInput} action="">
        <input type="text" placeholder="키워드 검색" />
      </form>
      <div>
        <h5 className={styles.minititle}>주인장 PICK!</h5>
        <p className={styles.bodytext}>추천 플레이리스트</p>
        <div className={styles.recommendList}>
          <Recommendlistitem />
          <Recommendlistitem />
          <Recommendlistitem />
          <Recommendlistitem />
          <Recommendlistitem />
          <Recommendlistitem />
        </div>
      </div>
      <div>
        <div className={styles.picktop}>
          <div>
            <h5 className={`${styles.minititle} ${styles.minititle2}`}>
              Most Pick!
            </h5>
            <p className={styles.bodytext}>TOP 조회수</p>
          </div>
          <button className={styles.morebtn}>더보기</button>
        </div>
        <div className={styles.topList}>
          <Boardlistitem />
          <Boardlistitem />
          <Boardlistitem />
          <Boardlistitem />
          <Boardlistitem />
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
