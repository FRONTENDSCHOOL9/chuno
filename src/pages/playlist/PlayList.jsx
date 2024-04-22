import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonBack from '@/components/ButtonBack';
import PlayListItem from './PlayListItem';
import Search from '@components/Search';
import styles from './PlayList.module.css';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import Pagination from '@components/pagination';

function PlayList() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
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

    fetchData();
  }, [axios, itemsPerPage]);


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



  return (
    <>
      <div className={styles.isScrolled}>
        <ButtonBack path={'/main'} />
        <BtnCommon onClick={handleNewPost}>플레이리스트 추가하기</BtnCommon>
      </div>
      <Search onClick={handleSearchChange} />
      <ul className={styles.wrapList}>{itemList}</ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default PlayList;
