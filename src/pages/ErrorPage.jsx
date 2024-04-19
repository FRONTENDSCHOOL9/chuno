import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';
import { useRouteError } from 'react-router-dom';
import Cookie from '@assets/404error.svg';
import styles from './errorpage.module.css';


function ErrorPage() {
  const err = useRouteError();
  const message =
    err.status === 404
      ? '요청하신 페이지를 현재 보여드릴수 없어요.'
      : '예상하지 못한 에러가 발생했습니다.';
  return (
    <>
      <Header />
      <div className={styles.errorpage}>
        <img src={Cookie} className={styles.errorimage} />
        {/* <h2>에러 메세지</h2> */}
        <p className={styles.errormessage}>{message}</p>
      </div>
      <Footer />
    </>
  );
}

export default ErrorPage;
