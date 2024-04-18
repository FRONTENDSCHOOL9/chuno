import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonBack from '@/components/ButtonBack';
import PlayListItem from './PlayListItem';
import Search from '@components/Search';

import BtnCommon from '@/components/BtnCommon';
import styles from './PlayList.module.css';

function PlayList() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/products');
        const newData = res.data.item;
        if (JSON.stringify(data) !== JSON.stringify(newData)) {
          setData(newData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [axios, data]);

  const itemList = data?.map(item => (
    <PlayListItem key={item._id} item={item} />
  ));

  const handleNewPost = () => {
    navigate(`/playlist/new`);
  };

  return (
    <div className={styles.wrap}>
      <ButtonBack path={'/main'} />
      <Search></Search>
      {/* 데이터가 존재하는 경우에만 BoardListItem을 렌더링합니다. */}
      <ul className={styles.wrap_list}>{itemList}</ul>
      <BtnCommon onClick={handleNewPost}>플레이리스트 추가하기</BtnCommon>
    </div>
  );
}

export default PlayList;
