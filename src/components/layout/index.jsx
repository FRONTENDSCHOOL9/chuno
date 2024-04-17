<<<<<<< HEAD
import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';
=======
>>>>>>> feature/board
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
<<<<<<< HEAD
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <Footer />
=======
    <div>
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}
>>>>>>> feature/board
    </div>
  );
}

export default Layout;
