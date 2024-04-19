import ButtonBack from '@components/ButtonBack';
import styles from './mypage.module.css';
import Button4 from '@components/Button4';

import dragon from '@assets/svg/dragon.svg';

function Mypage() {
  return (
    <div className={styles.mypage}>
      <ButtonBack path={'/main'} />
      <div className={styles.mypageHead}>
        <img className={styles.mainlogo} src={dragon} alt="" />
        <div>
          <h2 className={styles.mypageHeadTitle}>마이페이지</h2>
        </div>
      </div>
      <hr className={styles.mypageHeadHr} />
      <div className={styles.mypageBody}>
        <div>
          <img
            className={styles.profileCover}
            src="././publish/profile01.png"
            alt="profile01"
          />
        </div>
        <form className={styles.mypageBodyInput} action="">
          <h3 className={styles.mypageBodyStitle}>닉네임</h3>
          <input type="text" placeholder="doglike" />
        </form>
        <form className={styles.mypageBodyInput} action="">
          <h3 className={styles.mypageBodyStitle}>아이디</h3>
          <input type="text" placeholder="doglike@naver.com" />
        </form>
        <form className={styles.mypageBodyInput} action="">
          <h3 className={styles.mypageBodyStitle}>비밀번호</h3>
          <input type="password" placeholder="••••••••" />
        </form>
      </div>
      <div>
        <h3 className={styles.mypageBodyStitle}>
          선호하는 음악장르를 선택해주세요.
        </h3>
        <h5 className={styles.mypageBodyHash}>#장르</h5>
      </div>
      <div className={styles.confirmButton}>
        <Button4 />
        {/* FIXME - 버튼 컴포넌트 통일해서 변경예정  */}
      </div>
    </div>
  );
}

export default Mypage;
