import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonBack from '@/components/ButtonBack';
import PlayListItem from './PlayListItem';
import Search from '@components/Search';

import BtnCommon from '@/components/BtnCommon';
import styles from './PlayList.module.css';
import useCustomAxios from '@hooks/useCustomAxios.mjs';

function PlayList() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  // 검색기능
  const filteredData = data?.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const itemList = filteredData?.map(item => (
    <PlayListItem key={item._id} item={item} />
  ));

  const handleNewPost = () => {
    navigate(`/playlist/new`);
  };

  // 검색어가 변경될 때마다 검색어 상태를 업데이트
  const handleSearchChange = keyword => {
    setSearchTerm(keyword);
  };

  // const handleKeywordClick = keyword => {
  //   if (selectedKeywords.includes(keyword)) {
  //     setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
  //   } else {
  //     setSelectwqedKeywords([...selectedKeywords, keyword]);
  //   }
  // };

  return (
    <div className={styles.wrap}>
      <ButtonBack path={'/main'} />
      <Search onClick={handleSearchChange} />
      {/* <Keywords
        selectedValues={selectedKeywords}
        onClick={handleKeywordClick}
      /> */}
      <ul className={styles.wrapList}>{itemList}</ul>
      <BtnCommon onClick={handleNewPost}>플레이리스트 추가하기</BtnCommon>
    </div>
  );
}

export default PlayList;
