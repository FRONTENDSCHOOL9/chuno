import { /* React, */ useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import Recommendlistitem from '@components/Recommendlistitem';
import Header from '@components/layout/Header';
import styles from './mainpage.module.css';
import PlayListItem from '@pages/playlist/PlayListItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import './mainpageStyles.css';
import { Navigation, Pagination, Autoplay, Scrollbar } from 'swiper/modules';

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
  }, []);

  useEffect(() => {
    console.log('Swiper data:', data);
  }, [data]);

  const itemList = data
    ?.slice(0, 5)
    .map(item => <PlayListItem key={item._id} item={item} />);

  return (
    <>
      <Header />
      <div className={styles.mainTop}>
        <span className={styles.miniTitle}>주인장 PICK!</span>
        <h2 className={styles.bodyText}>추천 플레이리스트</h2>
        <div className="recommendList">
          <Swiper
            slidesPerView={3}
            spaceBetween={10}
            loop={true}
            autoplay={true}
            freeMode={true}
            navigation={true}
            pagination={{ clickable: true }}
            scrollbar={true}
            /* breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
            }} */
            modules={[Pagination, Navigation, Autoplay, Scrollbar]}
            className={styles.mySwiper}
          >
            <SwiperSlide className={styles.mySwiperList}>
              <Recommendlistitem
                theme={'리듬타용'}
                value={'rythmn'}
                className={styles.mySwiperItem}
              />
            </SwiperSlide>
            <SwiperSlide className={styles.mySwiperList}>
              <Recommendlistitem
                theme={'놀러가용'}
                value={'play'}
                className={styles.mySwiperItem}
              />
            </SwiperSlide>
            <SwiperSlide className={styles.mySwiperList}>
              <Recommendlistitem
                theme={'행복해용'}
                value={'happy'}
                className={styles.mySwiperItem}
              />
            </SwiperSlide>
            <SwiperSlide className={styles.mySwiperList}>
              <Recommendlistitem
                theme={'우울해용'}
                value={'sad'}
                className={styles.mySwiperItem}
              />
            </SwiperSlide>
            <SwiperSlide className={styles.mySwiperList}>
              <Recommendlistitem
                theme={'집중해용'}
                value={'conp'}
                className={styles.mySwiperItem}
              />
            </SwiperSlide>
            <SwiperSlide className={styles.mySwiperList}>
              <Recommendlistitem
                theme={'멍때려용'}
                value={'mung'}
                className={styles.mySwiperItem}
              />
            </SwiperSlide>
            <SwiperSlide className={styles.mySwiperList}>
              <Recommendlistitem
                theme={'화가나용'}
                value={'anger'}
                className={styles.mySwiperItem}
              />
            </SwiperSlide>
            <SwiperSlide className={styles.mySwiperList}>
              <Recommendlistitem
                theme={'내꿈꿔용'}
                value={'dream'}
                className={styles.mySwiperItem}
              />
            </SwiperSlide>
            <SwiperSlide className={styles.mySwiperList}>
              <Recommendlistitem
                theme={'움직여용'}
                value={'act'}
                className={styles.mySwiperItem}
              />
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
