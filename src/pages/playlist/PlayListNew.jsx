import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Submit from '@/components/Submit';
import ButtonBack from '@/components/ButtonBack';
import Keywords from '@/components/Keywords';
import styles from './PlayList.module.css';
/* import { Link } from 'react-router-dom'; */
import SearchYoutube from '@youtube/SearchYoutube';
import { useRecoilValue } from 'recoil';
import { selectedVideosState } from '@recoil/user/atoms.mjs';

function PlayListNew() {
  const axios = useCustomAxios();
  const selectedVideos = useRecoilValue(selectedVideosState);
  const [selectedValues, setSelectedValues] = useState([]);

  const { register, handleSubmit } = useForm({
    values: {
      price: 0,
      name: '',
      quantity: 99999,
      show: true,
      extra: {},
    },
  });

  // 버튼 클릭 핸들러
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

  const onSubmit = async (formData, event) => {
    event.preventDefault(); // 기본 제출 동작 중지

    formData.extra = {
      ...formData.extra,
      keyword: selectedValues,
      music: selectedVideos, // 선택된 비디오 목록 추가
    };

    try {
      const res = await axios.post('/seller/products/', formData);
      console.log(res);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.wrap}>
      <ButtonBack path={'/playlist'} />
      <form onSubmit={handleSubmit(onSubmit, { shouldFocusError: false })}>
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
        <div className={styles.inputsection}>
          <label htmlFor="mainImages">썸네일을 지정해주세요</label>
          <input
            type="file"
            id="mainImages"
            className={styles}
            {...register('file')}
          />
        </div>
        <SearchYoutube></SearchYoutube>
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
          <Keywords selectedValues={selectedValues} onClick={handleClick} />
        </div>
        <div className={styles.inputsection}>
          <Submit type="submit">등록 완료</Submit>
        </div>
      </form>
    </div>
  );
}

export default PlayListNew;
