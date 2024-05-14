import useCustomAxios from '@hooks/useCustomAxios.mjs';
import styles from './mypage.module.css';
import { useRecoilState } from 'recoil';
import { memberState } from '@recoil/user/atoms.mjs';
import { useNavigate } from 'react-router-dom';

function Mark() {
  const axios = useCustomAxios();
  const [user] = useRecoilState(memberState);
  const navigate = useNavigate();

  //SECTION - 북마크 기능 추가했니? 아니.
  if (1) {
    return (
      <ul className={styles.mypageMarkingNone}>
        <li>아직 북마크한 곡이 없어용...</li>
      </ul>
    );
  } else {
    return (
      <ul className={styles.mypageMarking}>
        <li onClick={() => navigate('/playlist/4')}>플리1</li>
        <li>플리2</li>
        <li>플리3</li>
        <li>플리4</li>
      </ul>
    );
  }
}

export default Mark;
