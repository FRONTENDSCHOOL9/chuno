import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi'; // 아이콘 추가
import styles from './change.module.css';

function Layout() {
  const [darkMode, setDarkMode] = useState(false);
  const [icon, setIcon] = useState(<FiSun />); // 초기 아이콘 설정

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    // darkMode 상태 변경에 따라 배경색을 변경
    const root = document.getElementById('root');
    root.style.backgroundColor = darkMode ? '#333' : '#fff';

    // 아이콘 변경
    setIcon(prevIcon => (darkMode ? <FiMoon /> : <FiSun />));
  }, [darkMode]);

  return (
    <div
      id="App"
      className={darkMode ? styles['dark-mode'] : styles['light-mode']}
    >
      <button className={styles.btntheme} onClick={toggleDarkMode}>
        {icon}
      </button>{' '}
      {/* 아이콘 표시 */}
      <Outlet />
    </div>
  );
}

export default Layout;
