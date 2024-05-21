import ButtonBack from '@components/ButtonBack';
import { useEffect, useState } from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import styles from './mypage.module.css';
import dragon from '@assets/svg/dragon.svg';
import { useRecoilState } from 'recoil';
import { memberState } from '@recoil/user/atoms.mjs';
import Bookmark from '@pages/user/Bookmark';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

function Mypage() {
  const axios = useCustomAxios();
  const { _id } = useParams();
  const [userData, setUserData] = useState();
  const [user, setUser] = useRecoilState(memberState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    values: {
      name: user?.item?.name,
      profileImage: user?.profile,
    },
  });

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

  const [disabled, setDisabled] = useState(true);

  const onSubmit = async formData => {
    if (disabled) {
      alert('이제 정보를 수정할 수 있습니다.');
      setDisabled(!disabled);
    } else {
      try {
        setUser({
          _id: user._id,
          name: formData.name,
          token: user.token,
        });

        // const res = await axios.patch(`/users/${user._id}`, formData);
        alert('작성하신 내용으로 회원 정보를 변경합니다.');
        setDisabled(!disabled);
      } catch (err) {
        console.error(err);
        if (err.response?.data.errors) {
          err.response?.data.errors.forEach(error =>
            setError(error.path, { message: error.msg }),
          );
        } else if (err.response?.data.message) {
          console.error(err);
          alert(err.response?.data.message);
        }
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
          onSubmit={handleSubmit(onSubmit)}
          className={styles.mypageBodyInput}
          action=""
        >
          <h3 htmlFor="name" className={styles.mypageBodyStitle}>
            닉네임
          </h3>
          <input
            type="text"
            id="name"
            placeholder={userData?.name || 'Name'}
            disabled={disabled}
            {...register('name', {
              minLength: {
                value: 2,
                message: '닉네임을 2글자 이상 입력하세요.',
              },
            })}
          />
          {errors.name && (
            <p className={styles.required}>{errors.name.message}</p>
          )}
          <h3 htmlFor="email" className={styles.mypageBodyStitle}>
            아이디
          </h3>
          <input
            type="text"
            id="email"
            placeholder={userData?.email || 'Email'}
            autoComplete="email"
            disabled
          />

          <div>
            <h3 className={styles.mypageBodyStitle}>내가 북마크한 곡</h3>
            <Bookmark />
          </div>
        </form>
        <button
          className={styles.confirmButton}
          onClick={handleSubmit(onSubmit)}
        >
          {disabled ? '정보 수정하기' : '수정 완료'}
        </button>
      </div>
    </div>
  );
}

export default Mypage;
