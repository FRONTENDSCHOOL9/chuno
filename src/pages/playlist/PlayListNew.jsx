import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Submit from '@components/buttons/Submit';
import ButtonBack from '@components/buttons/ButtonBack';
import Keywords from '@components/buttons/Keywords';
import styles from './PlayList.module.css';
import SearchYoutube from '@youtube/SearchYoutube';
import { useRecoilValue } from 'recoil';
import { selectedVideosState } from '@recoil/user/atoms.mjs';
import { useNavigate } from 'react-router-dom';
import Modal from '@components/modal/Modal';

function PlayListNew() {
  const axios = useCustomAxios();
  const selectedVideos = useRecoilValue(selectedVideosState);
  const [selectedValues, setSelectedValues] = useState([]);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 정의
  const [modalMessage, setModalMessage] = useState(''); // 모달 메시지 상태 정의

  const { register, handleSubmit } = useForm({
    values: {
      price: 0,
      name: '',
      quantity: 99999,
      show: true,
      mainImages: [],
      extra: {},
    },
  });

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

  const onSubmit = async formData => {
    try {
      if (formData.mainImages.length > 0) {
        const imageFormData = new FormData();
        imageFormData.append('attach', formData.mainImages[0]);

        const fileRes = await axios('/files', {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: imageFormData,
        });
        formData.mainImages = fileRes.data.item[0].name;
        formData.extra = {
          ...formData.extra,
          keyword: selectedValues,
          music: selectedVideos, // 선택된 비디오 목록 추가
        };
      } else {
        delete formData.mainImages;
        formData.extra = {
          ...formData.extra,
          keyword: selectedValues,
          music: selectedVideos, // 선택된 비디오 목록 추가
        };
      }

      await axios.post('/seller/products/', formData);
      setModalMessage('플레이리스트가 등록되었습니다.');
      setIsModalOpen(true);
      // 모달이 닫힌 후 이동
      setTimeout(() => {
        setIsModalOpen(false);
        navigate(`/playlist`);
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className={styles.newWrap}>
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
              accept="image/*"
              id="mainImages"
              className={styles.title}
              {...register('mainImages')}
            />
          </div>
        </form>
        <SearchYoutube></SearchYoutube>
        <form onSubmit={handleSubmit(onSubmit, { shouldFocusError: false })}>
          <div className={styles.inputSection}>
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              rows="15"
              placeholder="10글자 이상 입력해주세요."
              className={styles.title}
              {...register('content', {
                required: '10글자 이상 입력해주세요.',
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
        showCancelButton={false}
      />
    </>
  );
}

export default PlayListNew;
