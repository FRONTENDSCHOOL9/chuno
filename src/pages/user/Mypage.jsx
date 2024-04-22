import ButtonBack from '@components/ButtonBack';
import { useEffect, useState } from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import styles from './mypage.module.css';
import Button4 from '@components/Button4';
import dragon from '@assets/svg/dragon.svg';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { memberState } from '@recoil/user/atoms.mjs';

//FIXME - fetch 이용해서 회원정보 수정

function Mypage() {
  const axios = useCustomAxios();
  const [userData, setUserData] = useState(null);
  const { _id } = useParams();

  const [user, setUser] = useRecoilState(memberState);
  let profileImage = user?.profile;
  if (profileImage && !profileImage.startsWith('http')) {
    profileImage = `${import.meta.env.VITE_API_SERVER}/files/${
      import.meta.env.VITE_CLIENT_ID
    }/${profileImage}`;
  } else if (!profileImage) {
    profileImage = `${import.meta.env.VITE_API_SERVER}/files/${
      import.meta.env.VITE_CLIENT_ID
    }/yongyong.png`;
  }

  useEffect(() => {
    const fetchData = async formData => {
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
  }, []);

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
        <div className={styles.profileWrap}>
          <img
            className={styles.profileCover}
            src={profileImage}
            alt="유저 프로필 이미지"
          />
        </div>

        <form className={styles.mypageBodyInput} action="">
          <h3 className={styles.mypageBodyStitle}>닉네임</h3>
          <input type="text" placeholder={userData?.name || 'Name'} />

          <h3 className={styles.mypageBodyStitle}>아이디</h3>
          <input
            type="text"
            placeholder={userData?.email || 'Email'}
            autoComplete="email"
          />

          <h3 className={styles.mypageBodyStitle}>비밀번호</h3>
          <input
            type="password"
            placeholder={userData?.password ? '••••••••' : 'Password'}
            autoComplete="new-password"
          />
        </form>
      </div>
    </div>
  );
}

export default Mypage;
