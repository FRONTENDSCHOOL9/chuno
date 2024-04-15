import { Outlet } from 'react-router-dom';
import BoardNew from '@/pages/boards/boardNew';
import Login from '@pages/user/Login';

function Layout() {
  return (
    <div>
      {/* <Header /> */}
      <Outlet />
      <Login />
      <BoardNew />
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
