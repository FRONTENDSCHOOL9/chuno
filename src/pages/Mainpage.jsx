import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import Recommendlistitem from '@components/Recommendlistitem';
import Header from '@components/layout/Header';
import styles from './mainpage.module.css';
import PlayListItem from '@pages/playlist/PlayListItem';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

/* swiper  import end */

export default function Mainpage() {
  const axios = useCustomAxios();
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get('/products');
      const newData = res.data.item;
      setData(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, {});

  const itemList = data
    ?.slice(0, 5)
    .map(item => <PlayListItem key={item._id} item={item} />);

  return (
    <>
      <Header />
      <div className={styles.mainTop}>
        <span className={styles.miniTitle}>주인장 PICK!</span>
        <h2 className={styles.bodyText}>추천 플레이리스트</h2>
        <div className={styles.recommendList}>
          <Swiper
            slidesPerView={3}
            spaceBetween={10}
            loop={true}
            autoplay={{ delay: 500 }} // 3초마다 슬라이드가 자동으로 전환됨
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className={styles.mySwiper}
          >
            <SwiperSlide>
              {' '}
              <Recommendlistitem theme={'리듬타용'} value={'rythmn'} />
            </SwiperSlide>
            <SwiperSlide>
              {' '}
              <Recommendlistitem theme={'놀러가용'} value={'play'} />
            </SwiperSlide>
            <SwiperSlide>
              {' '}
              <Recommendlistitem theme={'행복해용'} value={'happy'} />
            </SwiperSlide>
            <SwiperSlide>
              {' '}
              <Recommendlistitem theme={'우울해용'} value={'sad'} />
            </SwiperSlide>
            <SwiperSlide>
              {' '}
              <Recommendlistitem theme={'집중해용'} value={'conp'} />
            </SwiperSlide>
            <SwiperSlide>
              {' '}
              <Recommendlistitem theme={'멍때려용'} value={'mung'} />
            </SwiperSlide>
            <SwiperSlide>
              {' '}
              <Recommendlistitem theme={'화가나용'} value={'anger'} />
            </SwiperSlide>
            <SwiperSlide>
              {' '}
              <Recommendlistitem theme={'내꿈꿔용'} value={'dream'} />
            </SwiperSlide>
            <SwiperSlide>
              {' '}
              <Recommendlistitem theme={'움직여용'} value={'act'} />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className={styles.contents}>
        <div className={styles.pickTop}>
          <div>
            <span className={styles.miniTitle}>NEW!</span>
            <h2 className={styles.bodyText}>최신 업데이트</h2>
          </div>
          <Link to={'/playlist'} className={styles.moreBtn}>
            더보기
          </Link>
        </div>
        <ul className={styles.topList}>{itemList}</ul>
      </div>
    </>
  );
}
