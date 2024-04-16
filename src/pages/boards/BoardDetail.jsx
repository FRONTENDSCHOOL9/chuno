import Button from '@components/Button';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { memberState } from '@recoil/user/atoms.mjs';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

function BoardDetail() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const { _id } = useParams();

  const user = useRecoilValue(memberState);

  // const [ data, setData ] = useState();

  // const fetchDetail = async () => {
  //   const res = await axios.get(`/posts/${ _id }`);
  //   console.log(res);
  //   setData(res.data);
  // }

  // useEffect(() => {
  //   fetchDetail();
  // }, []);

  let firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  const { data } = useQuery({
    queryKey: ['posts', _id],
    queryFn: () =>
      axios.get(`/posts/${_id}`, {
        params: { incrementView: firstRender.current },
      }),
    select: response => response.data,
    suspense: true,
  });

  // 삭제
  const handleDelete = async () => {
    await axios.delete(`/posts/${_id}`);
    alert('삭제되었습니다.');
    navigate('/boards');
  };

  const item = data?.item;

  return (
    <div className="container mx-auto mt-4 px-4">
      {item && (
        <section className="mb-8 p-4">
          <div className="font-semibold text-xl">제목 : {item.title}</div>
          <div className="text-right text-gray-400">
            작성자 : {item.user.name} 조회수 : {item.views}
          </div>
          <div className="mb-4">
            <div>
              <pre className="w-full p-2 whitespace-pre-wrap font-custom">
                {item.content}
              </pre>
            </div>
            <hr />
          </div>
          <div className="flex justify-end my-4">
            <Button onClick={() => navigate('/boards')}>목록</Button>
            {user?._id === item.user._id && (
              <Button bgColor="red" onClick={handleDelete}>
                삭제
              </Button>
            )}
          </div>
        </section>
      )}

      <Outlet context={item} />
    </div>
  );
}

export default BoardDetail;
