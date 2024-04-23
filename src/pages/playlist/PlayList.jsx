import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonBack from '@/components/ButtonBack';
import PlayListItem from './PlayListItem';
import Search from '@components/Search';
import BtnCommon from '@components/BtnCommon';
import styles from './PlayList.module.css';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import Pagination from '@components/pagination';
import Keywords from '../../components/Keywords';
import Loading from '@components/loading';

function PlayList() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get('/products');
      const newData = res.data.item;
      setData(newData);
      setTotalPages(Math.ceil(newData.length / itemsPerPage));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterData = (items, searchTerm, selectedKeywords) => {
    if (!items) return []; // 데이터가 없는 경우 빈 배열 반환
    return items.filter(item => {
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

  const filteredData = filterData(data, searchTerm, selectedKeywords);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  const itemList = currentItems?.map(item => (
    <PlayListItem key={item._id} item={item} />
  ));

  const handleNewPost = () => {
    navigate(`/playlist/new`);
  };

  const handleSearchChange = keyword => {
    setSearchTerm(keyword);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleKeywordClick = keyword => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  return (
    <>
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
          <Search onClick={handleSearchChange} />
          <Keywords
            selectedValues={selectedKeywords}
            onClick={handleKeywordClick}
          />
          <ul className={styles.wrapList}>{itemList}</ul>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
}

export default PlayList;
