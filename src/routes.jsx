import { createBrowserRouter } from 'react-router-dom';
import BoardNew from './pages/boards/boardNew';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BoardNew />,
  },
]);

export default router;
