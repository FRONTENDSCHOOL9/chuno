import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function BoardDetail() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const { _id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/products/${_id}`);
        setItem(res.data.item);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [_id, axios]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/products/${_id}`);
      alert('삭제되었습니다.');
      navigate('/products');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      {error && <div>Error: {error.message}</div>}
      {item && (
        <section>
          <div>제목 : {item.name}</div>
          <div>작성자 : {item.seller.name}</div>
          <div>
            <div>{item.content}</div>
          </div>
          <div>
            <button onClick={handleDelete}>삭제</button>
            <button onClick={() => navigate('/products')}>목록</button>
          </div>
        </section>
      )}
    </div>
  );
}

export default BoardDetail;
