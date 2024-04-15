import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
  },
]);

export default router;
