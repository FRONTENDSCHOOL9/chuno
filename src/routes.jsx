import Layout from '@components/layout';
import { createBrowserRouter } from 'react-router-dom';
import First from '@pages/user/First';
import Login from '@pages/user/Login';
import Signup from '@pages/user/Signup';
import ErrorPage from '@pages/ErrorPage';
import Mypage from '@pages/user/Mypage';
import BoardList from '@pages/boards/boardlist';
import BoardNew from '@pages/boards/boardNew';
import BoardDetail from '@pages/boards/BoardDetail';
import Empty from '@pages/boards/empty';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <First />,
      },
      {
        path: 'users/mypage',
        element: <Mypage />,
      },
      {
        path: 'products/:_id',
        element: <BoardDetail />,
      },
      {
        path: 'products',
        element: <BoardList />,
      },
      {
        path: 'products/new',
        element: <BoardNew />,
      },
      {
        path: 'products/empty',
        element: <Empty />,
      },
      {
        path: 'users/login',
        element: <Login />,
      },
      {
        path: 'users/signup',
        element: <Signup />,
      },
      {
        path: 'users/mypage',
        element: <Mypage />,
      },
    ],
  },
]);

export default router;
