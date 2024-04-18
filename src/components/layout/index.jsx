import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';
import { Outlet } from 'react-router-dom';
import Main from '../../pages/components/Mainpage';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
      <Main />
    </div>
  );
}

export default Layout;
