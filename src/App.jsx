import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import { RouterProvider } from 'react-router-dom';


function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
