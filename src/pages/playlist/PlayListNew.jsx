import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { selectedVideosState } from '@recoil/user/atoms.mjs';
import { useNavigate } from 'react-router-dom';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import Submit from '@/components/Submit';
import ButtonBack from '@/components/ButtonBack';
import Keywords from '@/components/Keywords';
import styles from './PlayList.module.css';
import SearchYoutube from '@youtube/SearchYoutube';

function PlayListNew() {
  const axios = useCustomAxios();
  const selectedVideos = useRecoilValue(selectedVideosState);
  const [selectedValues, setSelectedValues] = useState([]);
  const navigate = useNavigate();

  const [mainImage, setMainImage] = useState(null);

  const { register, handleSubmit } = useForm({
    values: {
      price: 0,
      name: '',
      quantity: 99999,
      show: true,
      extra: {},
    },
  });

  useEffect(() => {
    setSelectedValues([]);
  }, [selectedVideos]);

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      setMainImage({
        path: `/files/${file.name}`,
        name: file.name,
        originalname: file.name,
      });
    }
  };

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
    event.preventDefault();
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
      music: selectedVideos,
    };

    try {
      const res = await axios.post('/seller/products/', formData);
      console.log(res);
      navigate(`/playlist`);
      setSelectedValues([]);
      setMainImage(null);
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
            onChange={handleFileChange}
            className={styles}
            {...register('mainImages')}
          />
        </div>
        <SearchYoutube />
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
