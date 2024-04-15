import { createBrowserRouter } from 'react-router-dom';
import YoutubeSearch from './youtube/youtubeSearch';

const router = createBrowserRouter([
  {
    path: '/',
    element: <YoutubeSearch />,
  },
]);

export default router;
