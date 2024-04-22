import { useRouteError } from 'react-router-dom';
import Cookie from '@assets/404error.svg';
import styles from './errorpage.module.css';
import ButtonBack from '@components/ButtonBack';

function ErrorPage() {
  const err = useRouteError();
  const message =
    err.status === 404
      ? '요청하신 페이지를 현재 보여드릴수 없어요.'
      : '예상하지 못한 에러가 발생했습니다.';
  return (
    <>
      <div id="App">
        <ButtonBack path={'/main'} />
        <div className={styles.errorPage}>
          <img src={Cookie} className={styles.errorImage} />
          {/* <h2>에러 메세지</h2> */}
          <p className={styles.errorMessage}>{message}</p>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
