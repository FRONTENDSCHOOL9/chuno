import { RecoilRoot } from 'recoil';
import Button1 from './pages/components/Button1';
import Button2 from './pages/components/Button2';
import Button3 from './pages/components/Button3';
import Mypage from './pages/components/Mypage';
import Button4 from './pages/components/Button4';
import Button5 from './pages/components/Button5';



function App() {
  return (
    <RecoilRoot>
{/*         <Button1 />
        <Button2 />
        <Button3 />
        <Button4 />
        <Button5 /> */}
        <Mypage />
    </RecoilRoot>
  );
}

export default App;