import styles from './styles/musicplayer.module.css';
import Songlist from './Songlist';
import { useState } from 'react';

function Musicplayer() {
  const [isListBoxOpen, setListBoxOpen] = useState(false); // 초기값은 true로 설정

  const toggleListBox = () => {
    setListBoxOpen(!isListBoxOpen); // 상태를 반전시킴
  };

  if (isListBoxOpen) {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    // *FIXME - playlistitem 적용하여 화면에 보여줘야합니다.
    <div>
      <div
        className={`${styles.musicplayerWrap} ${
          isListBoxOpen ? styles.overflow : ''
        } `}
      >
        <div className={styles.musicplayerTop}>
          <button>
            <svg
              className={styles.beforeButton}
              width="11"
              height="20"
              viewBox="0 0 11 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6078 17.6212C11.1252 18.1383 11.1252 19.0347 10.6401 19.5863C10.3814 19.8621 10.058 20 9.70223 20C9.37882 20 9.0554 19.8621 8.79667 19.6208L0.388073 11.002C0.129347 10.7262 0 10.3814 0 10.0022C0 9.62298 0.129347 9.27823 0.388073 9.00243L8.79667 0.383642C9.31412 -0.133485 10.1227 -0.133483 10.6401 0.41812C11.1252 0.969722 11.1252 1.83159 10.6078 2.3832L3.16941 10.0022L10.6078 17.6212Z"
                fill="#545050"
              />
            </svg>
          </button>
          <h2>Songs</h2>
          <button></button>
        </div>
        <img className={styles.musicMainCover} src="" alt="" />
        <div className="songText">
          <div className={styles.songTitle}>Worlds Smallest Violin</div>
        </div>
        <div>
          <input className={styles.seekBar} type="range" />
        </div>
        <div className={styles.musicControl}>
          <button>
            <svg
              className={styles.prev}
              width="16"
              height="22"
              viewBox="0 0 16 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.353516 20.9564V1.10795C0.353516 0.798983 0.606557 0.546196 0.91583 0.546196H3.16509C3.47436 0.546196 3.7274 0.798983 3.7274 1.10795V9.36566L12.8884 0.892608C13.8538 0.0921148 15.3486 0.761533 15.3486 2.04419V20.0202C15.3486 21.3028 13.8538 21.9723 12.8884 21.1718L3.7274 12.7502V20.9564C3.7274 21.2654 3.47436 21.5182 3.16509 21.5182H0.91583C0.606557 21.5182 0.353516 21.2654 0.353516 20.9564Z"
                fill="#333030"
              />
            </svg>
          </button>

          <button>
            <svg
              className={styles.pause}
              width="37"
              height="42"
              viewBox="0 0 37 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.8799 17.2838L6.22568 0.528813C3.89753 -0.831877 0.332031 0.488556 0.332031 3.85405V37.356C0.332031 40.3753 3.64517 42.1949 6.22568 40.6812L34.8799 23.9343C37.436 22.4448 37.4441 18.7733 34.8799 17.2838Z"
                fill="#333030"
              />
            </svg>
          </button>

          <button>
            <svg
              className={styles.next}
              width="16"
              height="22"
              viewBox="0 0 16 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.7802 1.10795V20.9564C15.7802 21.2654 15.5272 21.5182 15.2179 21.5182H12.9686C12.6594 21.5182 12.4063 21.2654 12.4063 20.9564V12.6987L3.24528 21.1718C2.27998 21.9723 0.785156 21.3028 0.785156 20.0202V2.04419C0.785156 0.761533 2.27998 0.0921148 3.24528 0.892608L12.4063 9.31417V1.10795C12.4063 0.798983 12.6594 0.546196 12.9686 0.546196H15.2179C15.5272 0.546196 15.7802 0.798983 15.7802 1.10795Z"
                fill="#333030"
              />
            </svg>
          </button>
        </div>
      </div>

      <div>
        <div className={styles.musicplayerWrap}></div>
        <div
          className={`${styles.listBox} ${isListBoxOpen ? styles.fullBox : ''}`}
          onClick={toggleListBox}
        >
          <Songlist />
          <Songlist />
          <Songlist />
          <Songlist />
          <Songlist />
          <Songlist />
          <Songlist />
          <Songlist />
          <Songlist />
          <Songlist />
          <Songlist />
          <Songlist />
          <Songlist />
        </div>
      </div>
    </div>
  );
}

export default Musicplayer;

/* 
<div className={`toggle-container ${isOn ? "toggle--checked" : ""}`} />

<h1 className={`header-text ${fullBox ? "fullBox" : ""}`}>
<h1 className={`{styles.listBox} ${{styles.fullBox} ? "{styles.fullBox}" : ""}`}>
<h1 className={`header-text ${fullBox && "fullBox"}`}>
<h1 className={`header-text ${styles.fullBox && "styles.fullBox"}`}>
<h1 className={`header-text ${isSwitched && "switched"}`}>


*/
