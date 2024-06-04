import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { Link, useNavigate } from 'react-router-dom';
import Submit from '@components/Submit';
import styles from './auth.module.css';
import dragon from '@assets/svg/dragon.svg';
import Modal from '@components/Modal';

function Signup() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm();

  const onSubmit = async formData => {
    try {
      if (formData.password !== formData.passwordCheck) {
        setError('passwordCheck', { message: '비밀번호가 일치하지 않습니다.' });
        return;
      }

      formData.type = 'seller';

      if (formData.profileImage.length > 0) {
        const imageFormData = new FormData();
        imageFormData.append('attach', formData.profileImage[0]);

        const fileRes = await axios('/files', {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: imageFormData,
        });
        formData.profileImage = fileRes.data.item[0].name;
      } else {
        delete formData.profileImage;
      }

      const res = await axios.post('/users', formData);
      setModalMessage(
        res.data.item.name +
          '님 회원가입이 완료 되었습니다.\n로그인 후에 이용하세요.',
      );
      setModalOpen(true);
    } catch (err) {
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach(error =>
          setError(error.path, { message: error.msg }),
        );
      } else if (err.response?.data.message) {
        setModalMessage(err.response?.data.message);
        setModalOpen(true);
      }
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate('/users/login');
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authPageWrap}>
        <div className={styles.pageName}>
          <Link to="/">
            <img src={dragon} alt="" />
          </Link>
          <h2>회원이 되어주세용</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Form fields */}
          <div className={styles.authInput}>
            <div className={styles.signupLabel}>
              <label htmlFor="name">닉네임</label>
              <label className={styles.essential} htmlFor="name">
                *
              </label>
            </div>
            <input
              type="text"
              id="name"
              placeholder="사용할 닉네임을 입력하세요"
              {...register('name', {
                required: '닉네임을 입력하세요.',
                minLength: {
                  value: 2,
                  message: '닉네임을 2글자 이상 입력하세요.',
                },
              })}
            />
            {errors.name && (
              <p className={styles.required}>{errors.name.message}</p>
            )}
          </div>
          {/* Other form fields */}
          <div className={styles.authInput}>
            <div className={styles.signupLabel}>
              <label htmlFor="email">아이디</label>
              <label className={styles.essential} htmlFor="name">
                *
              </label>
            </div>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              autoComplete="email"
              {...register('email', {
                required: '이메일을 입력하세요.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '이메일 형식이 아닙니다.',
                },
              })}
            />
            {errors.email && (
              <p className={styles.required}>{errors.email.message}</p>
            )}
          </div>
          <div className={styles.authInput}>
            <div className={styles.signupLabel}>
              <label htmlFor="password">비밀번호</label>
              <label className={styles.essential} htmlFor="name">
                *
              </label>
            </div>
            <input
              type="password"
              id="password"
              maxLength="24"
              placeholder="비밀번호를 입력하세요"
              autoComplete="current-password"
              {...register('password', {
                required: '비밀번호를 입력하세요.',
              })}
            />
            {errors.password && (
              <p className={styles.required}>{errors.password.message}</p>
            )}
          </div>
          <div className={styles.authInput}>
            <div className={styles.signupLabel}>
              <label htmlFor="passwordCheck">비밀번호 확인</label>
              <label className={styles.essential} htmlFor="name">
                *
              </label>
            </div>
            <input
              type="password"
              id="passwordCheck"
              maxLength="24"
              placeholder="비밀번호를 한 번 더 입력하세요"
              {...register('passwordCheck', {
                required: '비밀번호를 다시 확인해주세요.',
                validate: value =>
                  value === getValues('password') ||
                  '비밀번호가 일치하지 않습니다.',
              })}
            />
            {errors.passwordCheck && (
              <p className={styles.required}>{errors.passwordCheck.message}</p>
            )}
          </div>
          <div className={styles.authInput}>
            <div className={styles.signupLabel}>
              <label htmlFor="profileImage">프로필 이미지</label>
            </div>
            <input
              type="file"
              accept="image/*"
              id="profileImage"
              placeholder="이미지를 선택하세요"
              {...register('profileImage')}
            />
          </div>
          <div className={styles.btnAuth}>
            <Submit>회원가입</Submit>
          </div>
        </form>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          message={modalMessage}
          showCancelButton={true}
        />
      </div>
    </div>
  );
}

export default Signup;
