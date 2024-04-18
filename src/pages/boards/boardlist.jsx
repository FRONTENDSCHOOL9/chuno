import { useEffect, useState } from 'react';
import Search from '@components/Search';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useNavigate } from 'react-router-dom';
import Button2 from '../../components/Button2';
import BoardListItem from './boardlistitem';
import styles from './board.module.css';

function BoardList() {
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
    <BoardListItem key={item._id} item={item} />
  ));
  const handleNewPost = () => {
    navigate(`/products/new`);
  };

  return (
    <div>
      <Search></Search>
      {/* 데이터가 존재하는 경우에만 BoardListItem을 렌더링합니다. */}
      <ul className={styles.wrap_list}>{itemList}</ul>
      <Button2 onClick={handleNewPost}>플레이리스트 추가하기</Button2>
    </div>
  );
}

export default BoardList;
