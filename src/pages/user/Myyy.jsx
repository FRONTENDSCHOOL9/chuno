import ButtonBack from '@components/ButtonBack';
import { useEffect, useState } from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import styles from './mypage.module.css';
import dragon from '@assets/svg/dragon.svg';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { memberState } from '@recoil/user/atoms.mjs';

function Mypage() {
  const axios = useCustomAxios();
  const [userData, setUserData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // State to manage edit mode
  const { _id } = useParams();
  const [newName, setNewName] = useState(''); // 새로운 닉네임 state 추가
  const [newEmail, setNewEmail] = useState(''); // 새로운 이메일 state 추가

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleEmailChange = e => {
    setNewEmail(e.target.value);
  };

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

  const handleEditButtonClick = () => {
    setIsEditMode(true);
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      // 수정된 닉네임 또는 이메일이 입력되었을 때만 요청을 보냄
      if (newName || newEmail) {
        // userData에 수정된 닉네임과 이메일을 업데이트
        const updatedUserData = {
          ...userData,
          name: newName || userData.name,
          email: newEmail || userData.email,
        };

        // Fetch 통신을 이용하여 수정된 데이터를 전송합니다.
        await axios.patch(`/users/${_id}`, updatedUserData);
        console.log('Data updated successfully!');
      }

      setIsEditMode(false); // 수정 모드 비활성화
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

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

        <form
          onSubmit={handleFormSubmit}
          className={styles.mypageBodyInput}
          action=""
        >
          <h3 className={styles.mypageBodyStitle}>닉네임</h3>
          <input
            type="text"
            placeholder={userData?.name || 'Name'}
            disabled={!isEditMode} // 수정 모드가 아니면 비활성화
            onChange={handleNameChange} // 새로운 닉네임 입력 이벤트 핸들러
          />
          <button type="button" onClick={handleEditButtonClick}>
            수정하기
          </button>

          <h3 className={styles.mypageBodyStitle}>아이디</h3>
          <input
            type="text"
            placeholder={userData?.email || 'Email'}
            disabled={!isEditMode} // 수정 모드가 아니면 비활성화
            onChange={handleEmailChange} // 새로운 이메일 입력 이벤트 핸들러
          />
          <button type="button" onClick={handleEditButtonClick}>
            수정하기
          </button>

          <h3 className={styles.mypageBodyStitle}>비밀번호</h3>
          <input
            type="password"
            placeholder={userData?.password ? '••••••••' : 'Password'}
            disabled={!isEditMode} // 수정 모드가 아니면 비활성화
          />
          <button type="button" onClick={handleEditButtonClick}>
            수정하기
          </button>

          {isEditMode && <button type="submit">저장하기</button>}
        </form>
      </div>
    </div>
  );
}

export default Mypage;
