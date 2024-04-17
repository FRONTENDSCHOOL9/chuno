import { memberState } from '@recoil/user/atoms.mjs';
/* import { useNavigate } from 'react-router-dom'; */
import { useRecoilState } from 'recoil';
import './mypage.css';

function Mypage() {
  /* const navigate = useNavigate(); */

  const user = useRecoilState(memberState);

  console.log(user);

  return (
    <div className="mypage">
      mypage 영역
      <img
        className="mr-3 h-6 sm:h-9"
        src="/dragonface.svg"
        alt="유저 기본 이미지"
      />
    </div>
  );
}

export default Mypage;
