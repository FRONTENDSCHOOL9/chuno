import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Submit from '../../components/Submit';

import ButtonBack from '@/components/ButtonBack';
import Keywords from '@/components/Keywords';

import styles from './ProductsCommon.module.css';

function ProductsNew() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
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

  const onSubmit = async formData => {
    formData.extra = {
      ...formData.extra,
      keyword: selectedValues.join(','),
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
        <div className={styles.inputsection}>
          <label htmlFor="mainImages">썸네일을 지정해주세요</label>
          <input
            type="file"
            id="mainImages"
            className={styles}
            {...register('file')}
          />
        </div>
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

export default ProductsNew;
