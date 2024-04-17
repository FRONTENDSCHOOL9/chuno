import { useEffect, useState } from 'react';
import Search from '@components/Search';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useNavigate } from 'react-router-dom';
import Button2 from '../../components/Button2';
import BoardListItem from './boardlistitem';
import styles from './board.module.css'; // CSS 모듈 불러오기

function BoardList() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const [data, setData] = useState(null); // 데이터를 상태로 관리합니다.

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/products');
        setData(res.data.item); // 데이터에서 item만 설정합니다.
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // 데이터를 가져오는 함수를 실행합니다.
  }, [axios]); // useEffect를 axios 의존성으로 설정하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

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
