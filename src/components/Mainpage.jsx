import { Link } from 'react-router-dom';
import Recommendlistitem from './Recommendlistitem';
import Header from './layout/Header';
import styles from './styles/mainpage.module.css';

function Mainpage() {
  return (
    <div>
      <Header />
      <form className={styles.mainpageInput} action="">
        <input type="text" placeholder="키워드 검색" />
      </form>
      <div>
        <h5 className={styles.miniTitle}>주인장 PICK!</h5>
        <p className={styles.bodyText}>추천 플레이리스트</p>
        <div className={styles.recommendList}>
          <Recommendlistitem theme={'이별'} />
          <Recommendlistitem theme={'운동'} />
          <Recommendlistitem theme={'행복'} />
          <Recommendlistitem theme={'우울'} />
          <Recommendlistitem theme={'집중'} />
          <Recommendlistitem theme={'사랑'} />
          <Recommendlistitem theme={'분노'} />
        </div>
      </div>
      <div>
        <div className={styles.pickTop}>
          <div>
            <h5 className={`${styles.miniTitle} ${styles.miniTitle2}`}>
              Most Pick!
            </h5>
            <p className={styles.bodytext}>최신 업데이트</p>
          </div>
          <Link to={'/playlist'} className={styles.moreBtn}>
            더보기
          </Link>
        </div>
        <div className={styles.topList}></div>
      </div>
      {/* *FIXME - 아이템리스트 렌더링 위치 입니다. */}
    </div>
  );
}

export default Mainpage;
