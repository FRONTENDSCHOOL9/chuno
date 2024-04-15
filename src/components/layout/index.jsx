import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';
import { Outlet } from 'react-router-dom';
import Button1 from '../../pages/components/Button1';
import Mypage from '../../pages/components/Mypage';


function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      {/* <Button1></Button1> */}
      <Mypage />
      <Footer />
    </div>
  );
}

export default Layout;
