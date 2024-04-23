import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Submit from '@/components/Submit';
import ButtonBack from '@/components/ButtonBack';
import Keywords from '@/components/Keywords';
import styles from './PlayList.module.css';
import SearchYoutube from '@youtube/SearchYoutube';
import { useRecoilValue } from 'recoil';
import { selectedVideosState } from '@recoil/user/atoms.mjs';
import { useNavigate } from 'react-router-dom';

function PlayListNew() {
  const axios = useCustomAxios();
  const selectedVideos = useRecoilValue(selectedVideosState);
  const [selectedValues, setSelectedValues] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅 추가

  const [mainImage, setMainImage] = useState(null); // 파일 상태 추가

  const { register, handleSubmit } = useForm({
    values: {
      price: 0,
      name: '',
      quantity: 99999,
      show: true,
      extra: {},
    },
  });

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      // 파일 정보를 상태에 저장
      setMainImage({
        path: `/files/${file.name}`,
        name: file.name,
        originalname: file.name,
      });
    }
  };

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
    if (mainImage) {
      formData.mainImages = {
        path: mainImage.path,
        name: mainImage.name,
        originalname: mainImage.originalname,
      };
    }
    formData.extra = {
      ...formData.extra,
      keyword: selectedValues,
      music: selectedVideos, // 선택된 비디오 목록 추가
    };

    try {
      const res = await axios.post('/seller/products/', formData);
      console.log(res);
      navigate(`/playlist`); // 등록 후 플레이리스트 페이지로 이동
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.wrap}>
      <ButtonBack path={'/playlist'} />
      <form onSubmit={handleSubmit(onSubmit, { shouldFocusError: false })}>
        <div className={styles.inputSection}>
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
        <div className={styles.inputSection}>
          <label htmlFor="mainImages">썸네일을 지정해주세요</label>
          <input
            type="file"
            id="mainImages"
            onChange={handleFileChange} // 파일 변경 핸들러 추가
            className={styles}
            {...register('mainImages')}
          />
        </div>
        <SearchYoutube></SearchYoutube>
        <div className={styles.inputSection}>
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
        <div className={styles.inputSection}>
          <Keywords selectedValues={selectedValues} onClick={handleClick} />
        </div>
        <div className={styles.inputSection}>
          <Submit type="submit">등록 완료</Submit>
        </div>
      </form>
    </div>
  );
}

export default PlayListNew;
// PlayListNew.jsx
