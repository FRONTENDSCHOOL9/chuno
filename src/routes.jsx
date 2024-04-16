import { createBrowserRouter } from 'react-router-dom';
import BoardList from './pages/boards/boardlist';
import BoardNew from './pages/boards/boardNew';
import Login from './pages/user/Login';
import Layout from './components/layout';
import BoardDetail from './pages/boards/BoardDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <BoardList />,
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
        path: 'users/login',
        element: <Login />,
      },
    ],
  },
]);

export default router;
