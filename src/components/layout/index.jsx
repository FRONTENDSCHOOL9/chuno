import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import styles from './change.module.css';
function Layout() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };
  return (
    <div
      id="App"
      className={darkMode ? styles['dark-mode'] : styles['light-mode']}
    >
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
      <Outlet />
    </div>
  );
}

export default Layout;
