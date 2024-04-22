import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonBack from '@/components/ButtonBack';
import PlayListItem from './PlayListItem';
import Search from '@components/Search';
import Keywords from '../../components/Keywords'; // 키워드 컴포넌트 import 추가

import BtnCommon from '@/components/BtnCommon';
import styles from './PlayList.module.css';
import useCustomAxios from '@hooks/useCustomAxios.mjs';

function PlayList() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState([]); // 선택된 키워드 상태 추가

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

  // 검색 및 필터링 함수
  const filterData = (items, searchTerm, selectedKeywords) => {
    return items.filter(item => {
      // 키워드가 없는 경우를 처리하기 위해 추가
      const keywords = item.extra?.keyword || [];
      const nameMatch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const keywordMatch = selectedKeywords.every(keyword =>
        keywords.includes(keyword),
      );
      return nameMatch && keywordMatch;
    });
  };

  // 검색어 및 선택된 키워드에 따라 데이터 필터링
  const filteredData = filterData(data, searchTerm, selectedKeywords);

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

  const handleKeywordClick = keyword => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  return (
    <div className={styles.wrap}>
      <ButtonBack path={'/main'} />
      <Search onClick={handleSearchChange} />
      <Keywords
        selectedValues={selectedKeywords}
        onClick={handleKeywordClick}
      />
      <ul className={styles.wrapList}>{itemList}</ul>
      <BtnCommon onClick={handleNewPost}>플레이리스트 추가하기</BtnCommon>
    </div>
  );
}

export default PlayList;
