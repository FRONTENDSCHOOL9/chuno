import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import { RecoilRoot } from 'recoil';
import YoutubeSearch from './youtube/youtubeSearch';

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
      <YoutubeSearch></YoutubeSearch>
    </RecoilRoot>
  );
}

export default App;
