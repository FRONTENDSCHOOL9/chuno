import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';
import { Outlet } from 'react-router-dom';
import Button1 from '../../pages/components/Button1';
import Mypage from '../../pages/components/Mypage';
import Boardlist from '../../pages/boards/boardlist';
import Empty from '../../pages/boards/empty';
import Musicplayer from '../../pages/components/Musicplayer';
import Button3 from '../../pages/components/Button3';
import Button2 from '../../pages/components/Button2';
import Button5 from '../../pages/components/Button5';
import Button4 from '../../pages/components/Button4';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
    </div>
  );
}

export default Layout;
