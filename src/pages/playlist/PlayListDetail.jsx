import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import defaultThumbnail from '../../../public/yongyong.png';
import ButtonBack from '@/components/ButtonBack';

import styles from './PlayList.module.css';

function PlayListDetail() {
  const axios = useCustomAxios();
  const { _id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/products/${_id}`);
      setItem(res.data.item);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // const handleDelete = async () => {
  //   try {
  //     await axios.delete(`/products/${_id}`);
  //     alert('삭제되었습니다.');
  //     navigate('/products');
  //   } catch (error) {
  //     console.error('Error deleting post:', error);
  //   }
  // };

  return (
    <div className={styles.wrap}>
      <ButtonBack path={'/playlist'} />
      {error && <div>Error: {error.message}</div>}
      {item && (
        <section>
          <ul className={styles.wrap_list}>
            <li className={styles.listitem_detail}>
              <div className={styles.thumbnail}>
                <img
                  src={item.path || defaultThumbnail}
                  alt={item.orginalname || 'Default Thumbnail'}
                />
              </div>
              <div className={styles.desc}>
                <h3>{item.name}</h3>
                <span>{item.seller.name}</span>
              </div>
              <span className={styles.count}>15곡</span>
            </li>
          </ul>

          <div className={styles.content}>{item.content}</div>
          <div className={styles.inputsection}>
            <div className="btn3Parent">
              {['이별', '운동', '행복', '우울', '집중', '사랑', '분노'].map(
                value => (
                  <a key={value} href="#" className="btn3">
                    {value}
                  </a>
                ),
              )}
            </div>
          </div>
          <div>
            <ul className={styles.playlist_wrap}>
              <li className={styles.playlist}>1. 곡제목</li>
              <li className={styles.playlist}>2. 곡제목</li>
              <li className={styles.playlist}>3. 곡제목</li>
              <li className={styles.playlist}>4. 곡제목</li>
              <li className={styles.playlist}>5. 곡제목</li>
              <li className={styles.playlist}>6. 곡제목</li>
            </ul>
            <button className={styles.button_play}>
              플레이리스트 재생하기
            </button>
          </div>
          <div>{/* <button onClick={handleDelete}>삭제</button> */}</div>
        </section>
      )}
    </div>
  );
}

export default PlayListDetail;
