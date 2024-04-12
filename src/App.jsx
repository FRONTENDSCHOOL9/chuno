
import { RecoilRoot } from 'recoil';
import Boardlist from './pages/boards/boardlist';



function App() {
  return (
    <RecoilRoot>
        <Boardlist />
        <h1 className='text-blue-400'>123123</h1>
    </RecoilRoot>
  );
}

export default App;