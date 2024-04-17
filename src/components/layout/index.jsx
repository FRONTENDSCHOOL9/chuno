import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
    </div>
  );
}

export default Layout;
