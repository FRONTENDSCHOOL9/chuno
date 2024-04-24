import { createBrowserRouter } from 'react-router-dom';
import Layout from '@components/layout';
import Login from '@pages/user/Login';
import Signup from '@pages/user/Signup';
import ErrorPage from '@pages/ErrorPage';
import Mypage from '@pages/user/Mypage';
import PlayList from '@pages/playlist/PlayList';
import PlayListNew from '@pages/playlist/PlayListNew';
import PlayListDetail from '@pages/playlist/PlayListDetail';
import Empty from '@pages/playlist/Empty';
import Musicplayer from '@components/Musicplayer';
import SearchYoutube from '@youtube/SearchYoutube';
import ThemeList from '@pages/playlist/themeList';
import Mainpage from '@pages/Mainpage';
import First from '@pages/user/First';

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
        path: 'users/:_id',
        element: <Mypage />,
      },
      {
        path: 'playlist/:_id',
        element: <PlayListDetail />,
      },
      {
        path: 'playlist',
        element: <PlayList />,
      },
      {
        path: 'playlist/new',
        element: <PlayListNew />,
      },
      {
        path: 'searchyoutube',
        element: <SearchYoutube />,
      },
      {
        path: 'playlist/empty',
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
        path: 'music/:_id',
        element: <Musicplayer />,
      },
      {
        path: 'themelist/:theme',
        element: <ThemeList />,
      },
      {
        path: 'main',
        element: <Mainpage />,
      },
    ],
  },
]);

export default router;
