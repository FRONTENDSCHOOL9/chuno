import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
        <Button1 />
        <Button2 />
        <Button3 />
        <Button4 />
        <Button5 />
    </RecoilRoot>
  );
}

export default App;
