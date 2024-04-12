import { RecoilRoot } from 'recoil';
import Button1 from './pages/components/Button1';
import Button2 from './pages/components/Button2';
import Button3 from './pages/components/Button3';
import Mypage from './pages/components/Mypage';


function App() {
  return (
    <RecoilRoot>
        <Mypage /><br/>
    </RecoilRoot>
  );
}

export default App; 