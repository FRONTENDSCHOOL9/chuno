import { createBrowserRouter } from 'react-router-dom';
import BoardList from './pages/boards/boardlist';
import BoardNew from './pages/boards/boardNew';
import Login from './pages/user/Login';
import Layout from './components/layout';

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
        path: 'boards',
        element: <BoardList />,
      },
      {
        path: 'boards/new',
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
