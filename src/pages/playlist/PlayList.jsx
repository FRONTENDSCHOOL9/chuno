import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useCustomAxios from '@hooks/useCustomAxios.mjs';

import ButtonBack from '@components/buttons/ButtonBack';
import PlayListItem from './PlayListItem';
import Search from '@components/search/Search';
import BtnCommon from '@components/buttons/BtnCommon';
import Pagination from '@components/buttons/pagination';
import Keywords from '@components/buttons/Keywords';
import Loading from '@components/loading/Loading';

import styles from './PlayList.module.css';

function PlayList() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

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
  }, [axios]);

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(item => {
      const keywords = item.extra?.keyword || [];
      const nameMatch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const keywordMatch = selectedKeywords.every(keyword =>
        keywords.includes(keyword),
      );
      return nameMatch && keywordMatch;
    });
  }, [data, searchTerm, selectedKeywords]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / itemsPerPage);
  }, [filteredData.length, itemsPerPage]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredData, currentPage, itemsPerPage]);

  const handleNewPost = () => {
    navigate('/playlist/new');
  };

  const handleSearchChange = keyword => {
    setSearchTerm(keyword);
    setCurrentPage(1); // 검색 시 페이지를 첫 페이지로 설정
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleKeywordClick = keyword => {
    setSelectedKeywords(prevKeywords => {
      const updatedKeywords = prevKeywords.includes(keyword)
        ? prevKeywords.filter(k => k !== keyword)
        : [...prevKeywords, keyword];
      setCurrentPage(1);
      return updatedKeywords;
    });
  };

  return (
    <div className={styles.contSection}>
      {data ? (
        <>
          <div className={styles.isScrolled}>
            <ButtonBack path="/main" />
            <BtnCommon onClick={handleNewPost}>플레이리스트 추가하기</BtnCommon>
          </div>
          <Search onClick={handleSearchChange} />
          <Keywords
            selectedValues={selectedKeywords}
            onClick={handleKeywordClick}
          />
          <ul className={styles.wrapList}>
            {currentItems.map(item => (
              <PlayListItem key={item._id} item={item} />
            ))}
          </ul>
          {selectedKeywords.length === 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default PlayList;
