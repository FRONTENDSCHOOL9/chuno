// import useCustomAxios from '@hooks/useCustomAxios.mjs';

// import { useParams } from 'react-router-dom';

import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import ButtonBack from './ButtonBack';
import PlayListItem from '@pages/playlist/PlayListItem';
import styles from './styles/musicplayer.module.css';
import Songlist from './Songlist';

import pause from '@assets/svg/pause.svg';
import play from '@assets/svg/play.svg';
import prev from '@assets/svg/prev.svg';
import next from '@assets/svg/next.svg';

function Musicplayer() {
  // 플레이 관련
  const [isPlaying, setIsPlaying] = useState(true);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const playerRef = useRef(null);
  const [isListBoxOpen, setListBoxOpen] = useState(false);
  // const axios = useCustomAxios();
  // const { _id } = useParams();
  // const [item, setItem] = useState(null);

  // const fetchData = async () => {
  //   try {
  //     const res = await axios.get(`/products/${_id}`);
  //     setItem(res.data.item);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    const player = playerRef.current?.getInternalPlayer();
    if (player) {
      player.setVolume(volume * 100);
    }
  }, [volume]);

  const toggleListBox = () => {
    setListBoxOpen(!isListBoxOpen); // 상태를 반전시킴
  };

  if (isListBoxOpen) {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  const handleVolumeChange = e => {
    setVolume(parseFloat(e.target.value));
  };
  const handlePlayPause = () => {
    setIsPlaying(prevState => !prevState);
  };

  const handleSeekChange = e => {
    const seekTo = parseFloat(e.target.value);
    playerRef.current.seekTo(seekTo, 'seconds');
  };

  const handleProgress = state => {
    setPlayedSeconds(state.playedSeconds);
    setDuration(state.loadedSeconds);
  };

  // *FIXME - playlistitem 적용하여 화면에 보여줘야합니다.
  // *NOTE -  playlistitem에 prop을 전달하여 화면에 보여주도록 수정 하였습니다.
  return (
    <div>
      <div
        className={`${styles.musicplayerWrap} ${
          isListBoxOpen ? styles.overflow : ''
        } `}
      >
        <ButtonBack path={'/playlist'} />
        <div className={styles.musicplayerTop}>
          <PlayListItem
            item={{
              _id: 1,
              name: 'Playlist Name',
              seller: { name: 'Seller Name' },
            }}
          />
        </div>
        <img
          className={styles.musicMainCover}
          src="https://img.youtube.com/vi/g82W6uwQcJE/maxresdefault.jpg"
          alt=""
        />
        <div className="player-wrapper">
          <ReactPlayer
            ref={playerRef}
            className="react-player"
            playing={!isPlaying}
            url={`https://youtube.com/embed/g82W6uwQcJE`}
            width="0"
            height="0"
            controls={false}
            onProgress={handleProgress}
          />
        </div>
        <p className={styles.songTitle}>{}</p>
        <div>
          <input
            className={styles.seekBar}
            type="range"
            min={0}
            max={duration}
            step="any"
            value={playedSeconds}
            onChange={handleSeekChange}
          />
        </div>

        <div className={styles.musicControl}>
          <button>
            <img className={styles.prev} src={prev} alt="" />
          </button>

          <button onClick={handlePlayPause}>
            {isPlaying ? (
              <img src={pause} className={styles.pause} />
            ) : (
              <img src={play} className={styles.play} />
            )}
          </button>

          <button>
            <img className={styles.next} src={next} alt="" />
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
      <div>
        <div
          className={`${styles.listBox} ${isListBoxOpen ? styles.fullBox : ''}`}
          onClick={toggleListBox}
        >
          <h4 className={styles.songlist_title}>곡 목록</h4>
          <Songlist />
        </div>
      </div>
    </div>
  );
}

export default Musicplayer;
