import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import styles from './boardnew.module.css';
import Submit from '../../components/Button1';

function BoardNew() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const [selectedValues, setSelectedValues] = useState([]);

  const handleClick = value => {
    setSelectedValues(prevValues => {
      const index = prevValues.indexOf(value);
      if (index === -1) {
        return [...prevValues, value];
      } else {
        return prevValues.filter(v => v !== value);
      }
    });
  };
  const { register, handleSubmit } = useForm({
    values: {
      price: 0,
      name: '',
      quantity: 99999,
      show: true,
      extra: {},
    },
  });

  // FIXME - 폼데이터를 post했을때 value값이 배열로 저장되는지 아님 문자열로 저장되는지 좀 더 회의가 필요합니다.
  const onSubmit = async formData => {
    formData.extra = {
      ...formData.extra,
      keyword: selectedValues.join(','),
    };

    // formData.extra = {
    //   ...formData.extra,
    //   selectedValues: selectedValues,
    // };

    try {
      const res = await axios.post('/seller/products/', formData);
      console.log(res);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.wrap}>
      <a href="/" onClick={() => navigate('/boards')}>
        {/* 네비게이션 아이콘 */}
      </a>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputsection}>
          <label htmlFor="name">제목</label>
          <input
            type="text"
            id="name"
            placeholder="제목을 입력하세요."
            className={styles}
            {...register('name', {
              required: '제목을 입력하세요.',
            })}
          />
        </div>
        <div className={styles.inputsection}>
          <label htmlFor="mainImages">썸네일을 지정해주세요</label>
          <input
            type="file"
            id="mainImages"
            className={styles}
            {...register('file')}
          />
        </div>
        {/* NOTE - 플레이리스트 추가영역입니다. */}
        플레이리스트 영역입니다.
        <div className={styles.inputsection}>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            rows="15"
            placeholder="내용을 입력하세요."
            className={styles}
            {...register('content', {
              required: '내용을 입력하세요.',
            })}
          />
        </div>
        <div className={styles.inputsection}>
          <div className={styles.inputsection}>
            <div className={styles.inputsection}>
              <div className="btn3Parent">
                {['이별', '운동', '행복', '우울', '집중', '사랑', '분노'].map(
                  value => (
                    <a
                      key={value}
                      href="#"
                      className={`btn3 ${
                        selectedValues.includes(value) ? 'active' : ''
                      }`}
                      onClick={() => handleClick(value)}
                    >
                      {value}
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.inputsection}>
          <Submit type="submit">등록 완료</Submit>
        </div>
      </form>
    </div>
  );
}

export default BoardNew;
