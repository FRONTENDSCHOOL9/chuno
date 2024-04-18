import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import { RecoilRoot } from 'recoil';
import Button1 from './pages/components/Button1';
import Button2 from './pages/components/Button2';
import Button3 from './pages/components/Button3';
import Mypage from './pages/components/Mypage';



function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
