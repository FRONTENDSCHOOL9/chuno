import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';
import { Outlet } from 'react-router-dom';
import Login from '../../pages/user/Login';
import Signup from '../../pages/user/Signup';

function Layout() {
  return (
    <div>
      <Header />
      <Signup></Signup>
      <Login></Login>
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
