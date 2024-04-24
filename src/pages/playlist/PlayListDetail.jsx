// 게시물(플레이 리스트)를 하나씩 확인하는 부분
import PropTypes from 'prop-types';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonBack from '@components/ButtonBack';
import BtnPlaylistPlay from '@components/BtnPlaylistPlay';
import styles from './PlayList.module.css';
import Loading from '@components/loading';

PlayListDetail.propTypes = {
  item: PropTypes.shape({
    mainImages: PropTypes.arrayOf(PropTypes.shape).isRequired,
    extra: PropTypes.shape({
      keyword: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  }),
};

function PlayListDetail() {
  const axios = useCustomAxios();
  const { _id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const escapeSpecialCharacters = str => {
    return str.replace(/&(?:[a-zA-Z]+|#\d+);/g, '');
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`/products/${_id}`);
      setItem(res.data.item);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let thumbnail = item?.mainImages;
  if (thumbnail) {
    thumbnail = `${import.meta.env.VITE_API_SERVER}/files/${
      import.meta.env.VITE_CLIENT_ID
    }/${thumbnail}`;
  } else if (!thumbnail) {
    thumbnail = `${import.meta.env.VITE_API_SERVER}/files/${
      import.meta.env.VITE_CLIENT_ID
    }/yong.png`;
  }

  return (
    <>
      {isLoading && <Loading />} {/* 로딩 상태 표시 */}
      {error && <div>Error: {error.message}</div>}
      {item && (
        <section className={styles.detailWrap}>
          <ButtonBack path={'/playlist'} />
          <div className={styles.titleWrap}>
            <div className={styles.titles}>
              <h3>{item.name}</h3>
              <span>{item.seller.name}</span>
            </div>
            <span className={styles.count}>
              {item.extra.music?.length ?? 0}곡
            </span>
          </div>
          <div className={styles.bgWrap}>
            <img
              className={styles.thumbBg}
              src={thumbnail}
              alt={item.name || 'Default Thumbnail'}
            />
          </div>

          <div className={styles.themeList}></div>
          <div className={styles.content}>
            <div className={styles.description}>{item.content}</div>

            <ul className={styles.songs}>
              {item.extra.music.map((music, index) => (
                <li key={index}>
                  <img
                    src={`https://img.youtube.com/vi/${music.id}/maxresdefault.jpg`}
                    alt=""
                  />
                  <span>{`${index + 1 + '.'}  ${escapeSpecialCharacters(
                    music.title,
                  )}`}</span>
                </li>
              ))}
            </ul>
            <div className={styles.btnPlay}>
              <BtnPlaylistPlay onClick={() => navigate(`/music/${_id}`)}>
                {'플레이리스트 재생'}
              </BtnPlaylistPlay>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default PlayListDetail;
