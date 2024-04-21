import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonBack from '@/components/ButtonBack';
import PlayListItem from './PlayListItem';
import Search from '@components/Search';
import Keywords from '@components/Keywords';

import BtnCommon from '@/components/BtnCommon';
import styles from './PlayList.module.css';
import useCustomAxios from '@hooks/useCustomAxios.mjs';

function PlayList() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/products');
        const newData = res.data.item.map(item => ({
          ...item,
          keywords: item.extra.keyword.map(keyword => keyword.trim()),
        }));
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
  }, [data]);

  const filteredData =
    selectedKeywords.length > 0
      ? data?.filter(item =>
          selectedKeywords.some(keyword => item.keywords.includes(keyword)),
        )
      : data;

  const itemList = filteredData?.map(item => (
    <PlayListItem key={item._id} item={item} />
  ));

  const handleNewPost = () => {
    navigate(`/playlist/new`);
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
      <Search></Search>
      <Keywords
        selectedValues={selectedKeywords}
        onClick={handleKeywordClick}
      />
      <ul className={styles.wrap_list}>{itemList}</ul>
      <BtnCommon onClick={handleNewPost}>플레이리스트 추가하기</BtnCommon>
    </div>
  );
}

export default PlayList;
