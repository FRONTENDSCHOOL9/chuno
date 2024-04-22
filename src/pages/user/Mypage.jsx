import ButtonBack from '@components/ButtonBack';
import { useEffect, useState } from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import styles from './mypage.module.css';
import Button4 from '@components/Button4';

import dragon from '@assets/svg/dragon.svg';
import { useParams } from 'react-router-dom';

function Mypage() {
  const axios = useCustomAxios();
  const [userData, setUserData] = useState(null);
  const { _id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/users/${_id}/_id`);
        const { data } = res;
        const { item } = data;
        console.log(res);
        setUserData(item);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [_id]);

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
            src={`${import.meta.env.VITE_API_SERVER}/files/${
              import.meta.env.VITE_CLIENT_ID
            }/yongyong.png`}
            alt=""
          />
        </div>
        <form className={styles.mypageBodyInput} action="">
          <h3 className={styles.mypageBodyStitle}>닉네임</h3>
          <input type="text" placeholder={userData?.name || 'Name'} />
        </form>
        <form className={styles.mypageBodyInput} action="">
          <h3 className={styles.mypageBodyStitle}>아이디</h3>
          <input type="text" placeholder={userData?.email || 'Email'} />
        </form>
        <form className={styles.mypageBodyInput} action="">
          <h3 className={styles.mypageBodyStitle}>비밀번호</h3>
          <input
            type="password"
            placeholder={userData?.password ? '••••••••' : 'Password'}
          />
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
