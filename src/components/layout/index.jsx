import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';
import { Outlet } from 'react-router-dom';
import Button1 from '../../pages/components/Button1';
import Mypage from '../../pages/components/Mypage';
import Boardlist from '../../pages/boards/boardlist';
import Empty from '../../pages/boards/empty';
import Musicplayer from '../../pages/components/Musicplayer';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header /> */}
      <Outlet />
      {/* <Button1></Button1> */}
      <Musicplayer />
      {/* <Mypage /> */}
      {/* <Boardlist/> */}
      {/* <Empty/> */}
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
