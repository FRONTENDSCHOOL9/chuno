import PropTypes from 'prop-types';
import useCustomAxios from '@hooks/useCustomAxios.mjs';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonBack from '@components/ButtonBack';
import BtnPlaylistPlay from '@components/BtnPlaylistPlay';
import styles from './PlayList.module.css';

PlayListDetail.propTypes = {
  item: PropTypes.shape({
    extra: PropTypes.shape({
      keyword: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  }).isRequired,
};

function PlayListDetail() {
  const axios = useCustomAxios();
  const { _id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const changechar = /[^\w\s]/gi;

  const fetchData = async () => {
    try {
      const res = await axios.get(`/products/${_id}`);
      setItem(res.data.item);
      // console.log(res); 이 부분 삭제
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // const keywordList = item?.extra?.keyword?.map((keyword, index) => (
  //   <span key={index}>{keyword}</span>
  // ));

  return (
    <div className={styles.wrap}>
      <ButtonBack path={'/playlist'} />
      {error && <div>Error: {error.message}</div>}
      {item && (
        <section>
          <ul className={styles.wrapList}>
            <li className={styles.listitemDetail}>
              <div className={styles.thumbnail}>
                <img
                  src={`${import.meta.env.VITE_API_SERVER}/files/${
                    import.meta.env.VITE_CLIENT_ID
                  }/yongyong.png`}
                  alt={item.orginalname || 'Default Thumbnail'}
                />
              </div>
              <div className={styles.desc}>
                <h3>{item.name}</h3>
                <span>{item.seller.name}</span>
              </div>
              <span className={styles.count}>
                {item.extra.music?.length ?? 0}곡
              </span>
            </li>
          </ul>
          <div className={styles.content}>{item.content}</div>

          <div className={styles.themeList}></div>
          <div>
            {item.extra.music.map((music, index) => (
              <div key={index}>{music.title.replace(changechar, '')}</div>
            ))}
          </div>
          <div className={styles.playlistBox}>
            {/* <ul className={styles.playlist_wrap}>
              {item.extra.music.map((music, index) => (
                <li key={index} className={styles.playlist}>
                  {music}
                </li>
              ))}
            </ul> */}
            <div className={styles.btnPlay}>
              <BtnPlaylistPlay onClick={() => navigate(`/music/${_id}`)}>
                {'플레이리스트 재생'}
              </BtnPlaylistPlay>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default PlayListDetail;
