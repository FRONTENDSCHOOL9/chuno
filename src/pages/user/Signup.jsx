import { useForm } from 'react-hook-form';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useNavigate } from 'react-router-dom';
import Submit from '@components/Submit';

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

//FIXME - 이미지를 업로드하면 회원가입이 안됩니다, 이미지를 보내는 과정에서 뭔가 오류가 있는 것 같은데 잘 모르겠어요... 뭘 어떻게 고쳐야 할까나~
      // 이미지 먼저 업로드
      // 이미지 먼저 업로드
      if(formData.profileImage.length > 0){ // 프로필 이미지를 추가한 경우
        const imageFormData = new FormData();
        imageFormData.append('attach', formData.profileImage[0]);
  
        const fileRes = await axios('/files', {
          method: 'post',
          headers: {
            // 파일 업로드시 필요한 설정
            'Content-Type': 'multipart/form-data'
          },
          data: imageFormData
        });
  
        // 서버로부터 응답받은 이미지 이름을 회원 정보에 포함
        formData.profileImage = fileRes.data.file.name;
      }else{
        // profileImage 속성을 제거
        delete formData.profileImage;
      }

      const res = await axios.post('/users', formData);
      alert( res.data.item.name + '님 회원가입이 완료 되었습니다.\n로그인 후에 이용하세요.');
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
    <div className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8 shadow-md rounded-lg w-full max-w-md dark:bg-gray-600">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            회원가입
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
              htmlFor="name"
            >
              닉네임
            </label>
            <input
              type="text"
              id="name"
              placeholder="사용할 닉네임을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700"
              {...register('name', {
                required: '닉네임을 입력하세요.',
                minLength: {
                  value: 2,
                  message: '닉네임을 2글자 이상 입력하세요.',
                },
              })}
            />
            {errors.name && 
              <p className="ml-2 mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            }
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
              htmlFor="email"
            >
              아이디
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700"
              {...register('email', {
                required: '이메일을 입력하세요.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '이메일 형식이 아닙니다.',
                },
              })}
            />
            {errors.email && 
              <p className="ml-2 mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            }
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700"
              {...register('password', {
                required: '비밀번호를 입력하세요.',
              })}
            />
            {errors.password && (
              <p className="ml-2 mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
              htmlFor="passwordCheck"
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              id="passwordCheck"
              placeholder="비밀번호를 한 번 더 입력하세요"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                errors.passwordCheck
                  ? 'border-red-500'
                  : 'focus:border-blue-500'
              } dark:bg-gray-700`}
              {...register('passwordCheck', {
                required: '비밀번호를 다시 확인해주세요.',
                validate: value =>
                  value === getValues('password') ||
                  '비밀번호가 일치하지 않습니다.',
              })}
            />
            {errors.passwordCheck && (
              <p className="ml-2 mt-1 text-sm text-red-500">
                {errors.passwordCheck.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
              htmlFor="profileImage"
            >
              프로필 이미지
            </label>
            <input
              type="file"
              accept="image/*"
              id="profileImage"
              placeholder="이미지를 선택하세요"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              {...register('profileImage')}
            />
          </div>
          <div className="mt-14 flex justify-center items-center">
            <Submit>회원가입</Submit>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
