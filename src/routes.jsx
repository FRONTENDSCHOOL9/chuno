import BoardNew from '@pages/boards/boardNew';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BoardNew />,
  },
]);

export default router;
