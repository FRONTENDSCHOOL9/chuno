import { Link } from 'react-router-dom';
import Recommendlistitem from './Recommendlistitem';
import Footer from './layout/Footer';
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
            <p className={styles.bodytext}>최신 업데이트</p>
          </div>
          <Link to={'/playlist'} className={styles.morebtn}>
            더보기
          </Link>
        </div>
        <div className={styles.topList}></div>
      </div>
      {/* *FIXME - 아이템리스트 렌더링 위치 입니다. */}
      <Footer />
    </div>
  );
}

export default Mainpage;
