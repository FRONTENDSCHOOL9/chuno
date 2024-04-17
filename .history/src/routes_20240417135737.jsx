<<<<<<< HEAD
import Layout from '@components/layout';
import { createBrowserRouter } from 'react-router-dom';
import First from '@pages/user/First';
import Login from '@pages/user/Login';
import Signup from '@pages/user/Signup';
import ErrorPage from '@pages/ErrorPage';
import Mypage from '@pages/user/Mypage';
=======
import { createBrowserRouter } from 'react-router-dom';
import YoutubeSearch from './youtube/youtubeSearch';
>>>>>>> feature/player

const router = createBrowserRouter([
  {
    path: '/',
<<<<<<< HEAD
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
        path: 'users/login',
        element: <Login />,
      },
      {
        path: 'users/signup',
        element: <Signup />,
      },
    ],
=======
    element: <YoutubeSearch />,
>>>>>>> feature/player
  },
]);

export default router;
