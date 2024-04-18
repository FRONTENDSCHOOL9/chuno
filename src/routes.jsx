import Layout from '@components/layout';
import { createBrowserRouter } from 'react-router-dom';
import First from '@pages/user/First';
import Login from '@pages/user/Login';
import Signup from '@pages/user/Signup';
import ErrorPage from '@pages/ErrorPage';
import Mypage from '@pages/user/Mypage';
import ProductsList from '@pages/product/ProductsList';
import ProductsNew from '@pages/product/ProductsNew';
import ProductsDetail from '@pages/product/ProductsDetail';
import Empty from '@pages/product/Empty';

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
        element: <ProductsDetail />,
      },
      {
        path: 'products',
        element: <ProductsList />,
      },
      {
        path: 'products/new',
        element: <ProductsNew />,
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
    ],
  },
]);

export default router;
