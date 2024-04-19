import { useForm } from 'react-hook-form';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { Link, useNavigate } from 'react-router-dom';
import Submit from '@components/Submit';
import styles from './auth.module.css';

function Signup() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm();

  const onSubmit = async formData => {
    try {
      // 비밀번호 확인
      if (formData.password !== formData.passwordCheck) {
        setError('passwordCheck', { message: '비밀번호가 일치하지 않습니다.' });
        return; // 비밀번호가 일치하지 않으면 함수를 종료
      }

      formData.type = 'seller';

      // 이미지 먼저 업로드
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
        // profileImage 속성을 제거
        delete formData.profileImage;
      }

      const res = await axios.post('/users', formData);
      alert(
        res.data.item.name +
          '님 회원가입이 완료 되었습니다.\n로그인 후에 이용하세요.',
      );
      navigate('/users/login');
    } catch (err) {
      // AxiosError(네트워크 에러-response가 없음, 서버의 4xx, 5xx 응답 상태 코드를 받았을 때-response 있음)
      if (err.response?.data.errors) {
        // API 서버가 응답한 에러
        err.response?.data.errors.forEach(error =>
          setError(error.path, { message: error.msg }),
        );
      } else if (err.response?.data.message) {
        alert(err.response?.data.message);
      }
    }
  };

  return (
    <div className={styles.authpage}>
      <div className={styles.authpage_wrap}>
        <div className={styles.pagename}>
          <Link to="/">
            <svg
              width="50"
              height="50"
              viewBox="0 0 89 89"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.125 44.7114C11.125 46.1409 12.3877 47.2812 13.9062 47.2812C15.4248 47.2812 16.6597 46.1159 16.6875 44.7114V38.7261C16.6875 37.2966 15.4248 36.1562 13.9062 36.1562C12.3571 36.1562 11.125 37.3216 11.125 38.7261V44.7114ZM38.9375 38.9375C38.9375 38.1999 39.2305 37.4924 39.7521 36.9709C40.2737 36.4493 40.9811 36.1562 41.7188 36.1562C42.4564 36.1562 43.1638 36.4493 43.6854 36.9709C44.207 37.4924 44.5 38.1999 44.5 38.9375V44.5C44.5 45.2376 44.207 45.9451 43.6854 46.4666C43.1638 46.9882 42.4564 47.2812 41.7188 47.2812C40.9811 47.2812 40.2737 46.9882 39.7521 46.4666C39.2305 45.9451 38.9375 45.2376 38.9375 44.5V38.9375Z"
                fill="#619AE0"
              />
              <path
                d="M23.2234 6.50813C23.3219 6.16802 23.4865 5.85065 23.7077 5.57417C23.9289 5.29768 24.2024 5.0675 24.5126 4.89677C24.8228 4.72604 25.1636 4.61811 25.5156 4.57915C25.8675 4.54019 26.2237 4.57097 26.5637 4.66972C29.192 5.43178 31.214 6.675 32.4933 8.38547C33.0932 9.17274 33.5216 10.0769 33.7511 11.0396C33.9805 12.0024 34.0059 13.0026 33.8256 13.9758C33.2026 17.3856 30.107 20.47 26.3357 20.47C23.788 20.47 21.5714 19.4632 20.0222 18.7595C19.6801 18.6066 19.3714 18.4647 19.0988 18.3535C17.5191 17.7082 16.1285 17.38 13.9341 18.2422C12.0011 18.9987 11.1194 20.9345 11.3558 24.2386C11.4448 25.4568 11.684 26.6861 11.9955 27.8264C12.1652 27.8181 12.3404 27.8125 12.5156 27.8125H14.4542C15.5529 27.8123 16.6272 28.1374 17.5413 28.747L20.3115 30.5938H27.1533C27.6702 30.594 28.1769 30.4502 28.6166 30.1785C29.0562 29.9069 29.4115 29.5181 29.6426 29.0557L36.3037 15.7363C36.9967 14.3507 38.0619 13.1854 39.3798 12.3709C40.6978 11.5565 42.2165 11.1251 43.7658 11.125H48.6719C49.9632 11.125 51.2289 11.4846 52.3273 12.1634C53.4258 12.8423 54.3135 13.8136 54.8909 14.9686C55.4684 16.1236 55.7129 17.4165 55.5969 18.7026C55.4809 19.9886 55.0091 21.217 54.2344 22.25H56.5845L59.6578 14.8519C61.2988 10.9025 65.034 8.34375 69.1391 8.34375H82.1665C82.7505 8.34375 83.1733 8.98344 82.9341 9.53969L82.3 11.125C80.9761 14.4903 77.85 16.6875 74.3818 16.6875H69.1363C68.7644 16.6968 68.4028 16.8115 68.0936 17.0183C67.7844 17.2251 67.5403 17.5155 67.3897 17.8556L65.4984 22.25H75.7056C76.5508 22.2501 77.3849 22.4429 78.1445 22.8136C78.9041 23.1843 79.5692 23.7233 80.0894 24.3895C80.6095 25.0558 80.971 25.8318 81.1463 26.6586C81.3216 27.4855 81.3062 28.3414 81.1012 29.1614L80.7619 30.5103C80.4894 31.6033 80.0611 32.6241 79.502 33.5474H82.5253C84.1384 33.5474 84.9588 35.066 84.9588 36.6791V40.3281C84.9588 46.75 80.0444 52.0233 72.7213 52.7575H81.5657C83.596 52.7575 85.2648 53.8979 85.2648 55.9282V66.0853C85.2648 76.5289 79.3101 83.2178 72.8326 83.2178H66.6777C66.2083 84.1225 65.4994 84.8809 64.6283 85.4102C63.7572 85.9394 62.7574 86.2191 61.7382 86.2188H23.8631C22.8188 86.219 21.8085 85.8477 21.013 85.1711C20.2175 84.4944 19.6888 83.5568 19.5215 82.526C19.3542 81.4952 19.5593 80.4384 20.1 79.545C20.6407 78.6516 21.4817 77.9797 22.4725 77.6497L31.7007 74.5737C32.8903 74.1777 33.9754 73.5188 34.8754 72.6458C35.7753 71.7729 36.4669 70.7083 36.8988 69.5313H19.8581C17.5688 69.531 15.3149 68.9655 13.2965 67.885C11.2782 66.8045 9.55781 65.2424 8.28813 63.3374L5.11472 58.5815C3.59177 56.2957 2.77981 53.6102 2.78125 50.8635V37.5469C2.78125 34.265 4.4055 31.3642 6.89194 29.6008C6.41839 27.9779 6.11271 26.3106 5.97969 24.6252C5.68766 20.5701 6.63885 15.3108 11.9649 13.2221C15.8587 11.6952 18.7484 12.3877 21.1347 13.3611C21.7549 13.617 22.2834 13.8506 22.7562 14.0592C24.1552 14.6794 25.0535 15.0799 26.3357 15.0799C27.1617 15.0799 28.302 14.2094 28.5217 13.0107C28.5694 12.7675 28.5635 12.5169 28.5044 12.2762C28.4453 12.0356 28.3345 11.8107 28.1796 11.6173C27.7986 11.1083 26.9336 10.388 25.0646 9.84563C24.3784 9.64667 23.7992 9.18333 23.4545 8.55748C23.1097 7.93163 23.0248 7.19449 23.2234 6.50813ZM43.7685 16.6875C43.2522 16.6878 42.7461 16.8318 42.3069 17.1034C41.8678 17.3751 41.5129 17.7636 41.2821 18.2255L34.468 31.8481H34.4513L33.7004 33.2387C33.2232 34.1216 32.5159 34.859 31.6537 35.3726C30.7914 35.8863 29.8063 36.157 28.8026 36.1563H20.3115C19.2127 36.1565 18.1385 35.8313 17.2243 35.2218L14.4542 33.375H12.5156C11.4092 33.375 10.348 33.8145 9.56567 34.5969C8.78329 35.3793 8.34375 36.4404 8.34375 37.5469V50.8663C8.34423 51.5326 8.42453 52.1965 8.58294 52.8438H36.1563L33.0385 55.9615C32.2635 56.7367 31.3434 57.3516 30.3308 57.7711C29.3181 58.1906 28.2328 58.4064 27.1367 58.4063H11.6868L12.9189 60.253C13.6805 61.3955 14.7123 62.3324 15.9228 62.9806C17.1333 63.6288 18.485 63.9682 19.8581 63.9688H38.6844C38.9292 63.9688 39.1711 63.991 39.402 64.0299L39.4993 63.9688H45.3232C46.8585 64.0856 49.5368 65.2871 47.9738 69.1447C46.3134 73.2387 43.1344 78.4758 41.0207 80.6563H61.7354L63.8325 71.2139C63.9215 70.8162 63.966 70.4129 63.966 70.0069V42.6394C63.966 41.6312 63.692 40.642 63.1733 39.7774L62.6198 38.8568C61.9542 37.7472 60.9225 36.9043 59.7023 36.4733C58.9875 36.223 58.4035 35.6056 58.4035 34.8491C58.4035 34.4581 58.5588 34.0832 58.8352 33.8067C59.1117 33.5303 59.4866 33.375 59.8775 33.375H69.9679C71.2083 33.3748 72.4131 32.96 73.3907 32.1966C74.3683 31.4331 75.0627 30.3648 75.3635 29.1614L75.7001 27.8125H42.5142C42.3957 27.8123 42.2793 27.7818 42.1759 27.7239C42.0726 27.666 41.9857 27.5827 41.9236 27.4819C41.8615 27.381 41.8261 27.266 41.821 27.1476C41.8158 27.0293 41.8409 26.9116 41.894 26.8057L44.4611 21.6715C44.7922 21.0094 45.3012 20.4527 45.9309 20.0636C46.5607 19.6746 47.2864 19.4686 48.0266 19.4688H48.6719C49.0407 19.4688 49.3944 19.3222 49.6552 19.0615C49.916 18.8007 50.0625 18.4469 50.0625 18.0781C50.0625 17.7093 49.916 17.3556 49.6552 17.0948C49.3944 16.834 49.0407 16.6875 48.6719 16.6875H43.7658H43.7685Z"
                fill="#619AE0"
              />
            </svg>
          </Link>
          <h2>회원이 되어주세용</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.auth_input}>
            <div className={styles.signuplabel}>
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
          <div className={styles.auth_input}>
            <div className={styles.signuplabel}>
              <label htmlFor="email">아이디</label>
              <label className={styles.essential} htmlFor="name">
                *
              </label>
            </div>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
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
          <div className={styles.auth_input}>
            <div className={styles.signuplabel}>
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
              {...register('password', {
                required: '비밀번호를 입력하세요.',
              })}
            />
            {errors.password && (
              <p className={styles.required}>{errors.password.message}</p>
            )}
          </div>
          <div className={styles.auth_input}>
            <div className={styles.signuplabel}>
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
          <div className={styles.auth_input}>
            <div className={styles.signuplabel}>
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
          <div className={styles.btn_auth}>
            <Submit>회원가입</Submit>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
