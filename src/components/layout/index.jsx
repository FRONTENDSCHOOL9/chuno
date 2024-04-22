import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div id="App">
      <Outlet />
    </div>
  );
}

export default Layout;
