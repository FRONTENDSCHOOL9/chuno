import ButtonBack from '@components/ButtonBack';
import { useEffect, useState } from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import styles from './mypage.module.css';
import dragon from '@assets/svg/dragon.svg';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { memberState } from '@recoil/user/atoms.mjs';
import Bookmark from '@pages/user/Bookmark';

function Mypage() {
  const axios = useCustomAxios();
  const [userData, setUserData] = useState(null);
  const { _id } = useParams();
  const [user] = useRecoilState(memberState);

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

  const fetchData = async () => {
    try {
      const res = await axios.get(`/users/${_id}/_id`);
      const { data } = res;
      const { item } = data;
      setUserData(item);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [disabled, setDisabled] = useState(true);

  const toggleDisabled = async () => {
    if (disabled) {
      alert('이제 정보를 수정할 수 있습니다.');
      setDisabled(!disabled);
    } else {
      //ANCHOR - 회원 정보 수정 기능 통신 삽입 예정.
      try {
        /* const res = await axios.patch(`/users/${user._id}`, formData); */

        alert('작성하신 내용으로 회원 정보를 변경합니다.');
        setDisabled(!disabled);
      } catch (error) {
        console.error('Error updating data:', error);
      }
    }
  };

  return (
    <div className={styles.mypage}>
      <div className={styles.mypageHead}>
        <ButtonBack path={'/main'} />
        <img className={styles.mainlogo} src={dragon} alt="" />
        <div>
          <h2 className={styles.mypageHeadTitle}>마이페이지</h2>
        </div>
      </div>
      <hr className={styles.mypageHeadHr} />
      <div className={styles.mypageBody}>
        <div className={styles.profileWrap}>
          <img src={profileImage} alt="유저 프로필 이미지" />
        </div>

        <form
          /*  onSubmit={handleFormSubmit} */
          className={styles.mypageBodyInput}
          action=""
        >
          <h3 className={styles.mypageBodyStitle}>닉네임</h3>
          <input
            type="text"
            placeholder={userData?.name || 'Name'}
            disabled={disabled}
          />

          <h3 className={styles.mypageBodyStitle}>아이디</h3>
          <input
            type="text"
            placeholder={userData?.email || 'Email'}
            autoComplete="email"
            disabled
          />
        </form>
        <form className={styles.mypageBodyInput}>
          <h3 className={styles.mypageBodyStitle}>내가 북마크한 곡</h3>
          <Bookmark />
        </form>
        <button className={styles.confirmButton} onClick={toggleDisabled}>
          {disabled ? '정보 수정하기' : '수정 완료'}
        </button>
      </div>
    </div>
  );
}

export default Mypage;
