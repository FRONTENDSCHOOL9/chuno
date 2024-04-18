import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import styles from './board.module.css';
import Submit from '../../components/Button1';
import YoutubeSearch from '../../youtube/youtubeSearch';
import ButtonBack from '../../components/ButtonBack';

function BoardNew() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const [selectedValues, setSelectedValues] = useState([]);
  const [youtubeData, setYoutubeData] = useState([]);

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

  const onSubmit = async formData => {
    formData.extra = {
      ...formData.extra,
      keyword: selectedValues.join(','),
      youtubeIds: youtubeData ? youtubeData.map(item => item.id).join(',') : '', // youtubeData가 null이 아닌 경우에만 map 함수 호출
    };

    try {
      const res = await axios.post('/seller/products/', formData);
      console.log(res);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleYoutubeData = data => {
    setYoutubeData(data);
    setSelectedValues(prevValues => {
      const newValues = data.map(item => item.id);
      return [...prevValues, ...newValues];
    });
  };

  return (
    <div className={styles.wrap}>
      <ButtonBack path={'/products'} />
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
            className={styles.title}
            {...register('name', {
              required: '제목을 입력하세요.',
            })}
          />
        </div>
        {/* <div className={styles.inputsection}>
          <label htmlFor="mainImages">썸네일을 지정해주세요</label>
          <input
            type="file"
            id="mainImages"
            className={styles}
            {...register('file')}
          />
        </div> */}
        <YoutubeSearch handleYoutubeData={handleYoutubeData} />
        {youtubeData && (
          <div>
            <ul>
              {youtubeData.map(item => (
                <li key={item.id}>{item.title}</li>
              ))}
            </ul>
          </div>
        )}
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
          <div className="btn3Parent">
            {['이별', '운동', '행복', '우울', '집중', '사랑', '분노'].map(
              value => (
                <div
                  key={value}
                  href="#"
                  className={`btn3 ${
                    selectedValues.includes(value) ? 'active' : ''
                  }`}
                  onClick={() => handleClick(value)}
                >
                  {value}
                </div>
              ),
            )}
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
