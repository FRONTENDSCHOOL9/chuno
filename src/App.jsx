import { RecoilRoot } from 'recoil';
import YoutubeSearch from './youtube/youtubeSearch';

function App() {
  return (
    <RecoilRoot>
      <YoutubeSearch />
    </RecoilRoot>
  );
}

export default App;
