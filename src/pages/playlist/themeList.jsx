import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useParams 추가
import ButtonBack from '@components/buttons/ButtonBack';
import PlayListItem from './PlayListItem';
import BtnCommon from '@components/buttons/BtnCommon';
import styles from './PlayList.module.css';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import Loading from '@components/loading/Loading';

function ThemeList() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const { theme } = useParams(); // URL 파라미터에서 테마값 가져오기
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

  const filterData = items => {
    if (!items) return [];
    return items.filter(item => item.extra?.keyword?.includes(theme));
  };

  const filteredData = filterData(data);

  const itemList = filteredData?.map(item => (
    <PlayListItem key={item._id} item={item} />
  ));

  const handleNewPost = () => {
    navigate(`/playlist/new`);
  };

  return (
    <>
      <div className={styles.contSection}>
        {data ? (
          <div className={styles.isScrolled}>
            <ButtonBack path={'/main'} />
            <BtnCommon onClick={handleNewPost}>플레이리스트 추가하기</BtnCommon>
          </div>
        ) : (
          <Loading />
        )}
        {data && (
          <>
            <ul className={styles.wrapList}>{itemList}</ul>
          </>
        )}
      </div>
    </>
  );
}

export default ThemeList;
