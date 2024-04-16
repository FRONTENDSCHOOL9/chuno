import { Outlet } from 'react-router-dom';
import Signup from '../../pages/user/Signup';

function Layout() {
  return (
    <div>
      <Outlet />
      <Signup></Signup>
    </div>
  );
}

export default Layout;
