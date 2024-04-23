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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/products');
        const newData = res.data.item;
        setData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
          <Recommendlistitem id={1} theme={'이별'} value={'fury'} />
          <Recommendlistitem id={2} theme={'운동'} value={'fury'} />
          <Recommendlistitem id={3} theme={'행복'} value={'fury'} />
          <Recommendlistitem id={4} theme={'우울'} value={'fury'} />
          <Recommendlistitem id={5} theme={'집중'} value={'fury'} />
          <Recommendlistitem id={6} theme={'사랑'} value={'fury'} />
          <Recommendlistitem id={7} theme={'분노'} value={'fury'} />
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
