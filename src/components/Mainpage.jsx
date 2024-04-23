import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import Recommendlistitem from './Recommendlistitem';
import Header from './layout/Header';
import styles from './styles/mainpage.module.css';
import PlayListItem from '@pages/playlist/PlayListItem';

function Mainpage() {
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
    <div>
      <Header />
      <div className={styles.mainTop}>
        <span className={styles.miniTitle}>주인장 PICK!</span>
        <h2 className={styles.bodyText}>추천 플레이리스트</h2>
        <div className={styles.recommendList}>
          <Recommendlistitem theme={'이별'} value={'broken'} />
          <Recommendlistitem theme={'운동'} value={'exercise'} />
          <Recommendlistitem theme={'행복'} value={'happy'} />
          <Recommendlistitem theme={'우울'} value={'sad'} />
          <Recommendlistitem theme={'집중'} value={'conp'} />
          <Recommendlistitem theme={'사랑'} value={'love'} />
          <Recommendlistitem theme={'분노'} value={'anger'} />
        </div>
      </div>
      <div className={styles.contents}>
        <div className={styles.pickTop}>
          <div>
            <span className={styles.miniTitle}>Most Pick!</span>
            <h2 className={styles.bodyText}>최신 업데이트</h2>
          </div>
          <Link to={'/playlist'} className={styles.moreBtn}>
            더보기
          </Link>
        </div>
        <ul className={styles.topList}>{itemList}</ul>
      </div>
    </div>
  );
}

export default Mainpage;
