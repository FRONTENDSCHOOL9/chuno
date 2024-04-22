import { useForm } from 'react-hook-form';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { memberState } from '@recoil/user/atoms.mjs';
import { useSetRecoilState } from 'recoil';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Submit from '@components/Submit';
import styles from './auth.module.css';

import dragon from '@assets/svg/dragon.svg';
import passwordvisible from '@assets/svg/passwordvisible.svg';
import passwordnonvisible from '@assets/svg/passwordnonvisible.svg';

function Login() {
  const [pwType, setpwType] = useState({
    type: 'password',
    visible: false,
  });

  const handlePasswordType = () => {
    setpwType(prevState => ({
      type: prevState.visible ? 'password' : 'text',
      visible: !prevState.visible,
    }));
  };

  const location = useLocation();
  const setUser = useSetRecoilState(memberState);
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    values: {
      email: 'dragon@test.com',
      password: '11111111',
    },
  });

  const onSubmit = async formData => {
    try {
      const res = await axios.post('/users/login', formData);
      setUser({
        _id: res.data.item._id,
        name: res.data.item.name,
        profile: res.data.item.profileImage,
        token: res.data.item.token,
      });
      alert(res.data.item.name + '님 로그인 되었습니다.');
      navigate(location.state?.from ? location.state?.from : '/main');
    } catch (err) {
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach(error =>
          setError(error.path, { message: error.msg }),
        );
      } else if (err.response?.data.message) {
        alert(err.response?.data.message);
      }
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authPageWrap}>
        <div className={styles.pageName}>
          <Link to="/">
            <div className={styles.logo}>
              <img src={dragon} alt="" />
            </div>
          </Link>
          <h2>로그인용</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.authInput}>
            <label className={styles.signupLabel} htmlFor="email">
              아이디
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              placeholder="이메일을 입력하세요"
              {...register('email', {
                required: '이메일은 필수로 입력해주세요.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '이메일 형식이 아닙니다.',
                },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className={styles.authInput}>
            <label className={styles.signupLabel} htmlFor="password">
              비밀번호
            </label>
            <div className={styles.pwVisibility}>
              <span onClick={handlePasswordType}>
                {pwType.visible ? (
                  <img className={styles.eyeIcon} src={passwordvisible} />
                ) : (
                  <img className={styles.eyeIcon} src={passwordnonvisible} />
                )}
              </span>
              <input
                type={pwType.type}
                id="password"
                autoComplete="current-password"
                placeholder="비밀번호를 입력하세요"
                {...register('password', {
                  required: '비밀번호를 입력하세요.',
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
          </div>
          <div className={styles.btnAuth}>
            <Submit>로그인</Submit>
            <Link to="/users/signup">회원가입</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
