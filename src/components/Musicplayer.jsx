import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useOutletContext } from 'react-router-dom';
import styles from './musicplayer.module.css';
import ButtonBack from './buttons/ButtonBack';
import Loading from './loading/Loading';
import ControlPanel from './ControlPanel';
import SongList from './SongList';
import { icons } from './SvgIcons';

function MusicPlayer() {
  const {
    pause,
    pauseDark,
    play,
    playDark,
    prev,
    prevDark,
    next,
    nextDark,
    randomIC,
    randomICDark,
    norandomIC,
    norandomICDark,
    after10s,
    after10sDark,
    before10s,
    before10sDark,
    volumeIC,
    volumeICDark,
  } = icons;

  const playerRef = useRef(null);
  const { darkMode } = useOutletContext();
  const axios = useCustomAxios();
  const [isPlaying, setIsPlaying] = useState(true);

  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isListBoxOpen, setListBoxOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVolumeControlOpen, setVolumeControlOpen] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const { _id } = useParams();

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(`/products/${_id}`);
      if (res.data.item.extra) {
        setItem(res.data.item);
      } else {
        setError(new Error("Item data does not contain 'extra' property."));
      }
    } catch (error) {
      setError(error);
    }
  }, [_id, axios]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const player = playerRef.current?.getInternalPlayer();
    if (player) {
      player.setVolume(volume * 100);
    }
  }, [volume]);

  useEffect(() => {
    const player = playerRef.current;
    if (player) {
      player.seekTo(0);
      setIsPlaying(true);
    }
  }, [currentVideoIndex]);

  useEffect(() => {
    const player = playerRef.current;
    if (player) {
      setDuration(player.getDuration);
    }
    setIsPlaying(true);
  }, [duration]);

  useEffect(() => {}, []);

  const toggleListBox = () => {
    setListBoxOpen(!isListBoxOpen);
  };

  const escapeSpecialCharacters = str => {
    return str.replace(/&(?:[a-zA-Z]+|#\d+);/g, '');
  };

  const handleSongSelect = videoId => {
    const selectedIndex = item?.extra?.music.findIndex(
      video => video.id === videoId,
    );
    if (selectedIndex !== -1) {
      setCurrentVideoIndex(selectedIndex);
    }
  };

  // 다음 노래를 선택하는 함수 (랜덤으로 선택함)
  const handleVideoEnd = () => {
    setCurrentVideoIndex(prevIndex =>
      isRandom
        ? Math.floor(Math.random() * item.extra.music.length)
        : prevIndex === item.extra.music.length - 1
        ? 0
        : prevIndex + 1,
    );
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  // `재생목록`에서 노래를 랜덤으로 선택
  const handleRandomPlay = () => {
    setCurrentVideoIndex(Math.floor(Math.random() * item.extra.music.length));
  };
  // 이전곡
  const handlePrevClick = () => {
    setCurrentVideoIndex(prevIndex =>
      isRandom
        ? Math.floor(Math.random() * item.extra.music.length)
        : prevIndex === 0
        ? item.extra.music.length - 1
        : prevIndex - 1,
    );
  };
  // 다음곡
  const handleNextClick = () => {
    setCurrentVideoIndex(prevIndex =>
      isRandom
        ? Math.floor(Math.random() * item.extra.music.length)
        : prevIndex === item.extra.music.length - 1
        ? 0
        : prevIndex + 1,
    );
  };

  // 랜덤 재생 모드를 토글
  const toggleRandom = () => {
    setIsRandom(!isRandom);
  };

  // 10초 전으로 이동하는 함수
  const handleBackward10 = () => {
    const newTime = playedSeconds - 10;
    if (newTime >= 0) {
      setPlayedSeconds(newTime);
      const player = playerRef.current.getInternalPlayer();
      if (player) {
        player.seekTo(newTime);
      }
    } else {
      setPlayedSeconds(0);
      const player = playerRef.current.getInternalPlayer();
      if (player) {
        player.seekTo(0);
      }
    }
  };

  // 10초 후로 이동하는 함수
  const handleForward10 = () => {
    const newTime = playedSeconds + 10;
    if (newTime <= duration) {
      setPlayedSeconds(newTime);
      const player = playerRef.current.getInternalPlayer();
      if (player) {
        player.seekTo(newTime);
      }
    } else {
      setPlayedSeconds(duration);
      const player = playerRef.current.getInternalPlayer();
      if (player) {
        player.seekTo(duration);
      }
    }
  };

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  const handleButtonClick = () => {
    console.log('Button clicked!');
  };
  const handleKeyDown = event => {
    const musicLength = item?.extra?.music?.length ?? 1; // 옵셔널 체이닝과 nullish 병합 연산자 사용

    switch (event.key) {
      case ' ': //spacebar 일시정지/플레이
        handleCombinedClick(); // 토글 동작
        break;
      case 'n':
        setCurrentVideoIndex(prevIndex =>
          prevIndex === 0 ? musicLength + 1 : prevIndex + 1,
        ); // 다음 곡으로 이동
        break;
      case 'p':
        setCurrentVideoIndex(prevIndex =>
          prevIndex === 0 ? musicLength - 1 : prevIndex - 1,
        ); // 이전 곡으로 이동
        break;
      default:
        break;
    }
  };

  const handleCombinedClick = () => {
    //pause,play
    setIsPlaying(prevIsPlaying => !prevIsPlaying); // 상태를 토글합니다.
    handleButtonClick();
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  //아이콘 모드별 교체
  useEffect(() => {
    setAfter10sIcon(darkMode ? after10sDark : after10s);
    setBefore10sIcon(darkMode ? before10sDark : before10s);
    setPauseIcon(darkMode ? pauseDark : pause);
    setPlayIcon(darkMode ? playDark : play);
    setPrevIcon(darkMode ? prevDark : prev);
    setNextIcon(darkMode ? nextDark : next);
    setVolumeIcon(darkMode ? volumeICDark : volumeIC);
    setRandomIcon(darkMode ? randomICDark : randomIC);
    setNorandomIcon(darkMode ? norandomICDark : norandomIC);
  }, [darkMode]);

  return (
    <div className={styles.wrap}>
      <ButtonBack path={`/playlist/${_id}`} />
      {!item && !error && <Loading />}
      {error && (
        <div className={styles.error}>에러가 발생했습니다: {error.message}</div>
      )}
      {item && (
        <>
          <img
            className={styles.musicMainCover}
            src={`https://img.youtube.com/vi/${item.extra.music[currentVideoIndex].id}/maxresdefault.jpg`}
            alt=""
          />
          <ControlPanel
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            playedSeconds={playedSeconds}
            setPlayedSeconds={setPlayedSeconds}
            duration={duration}
            setDuration={setDuration}
            volume={volume}
            setVolume={setVolume}
            isVolumeControlOpen={isVolumeControlOpen}
            setVolumeControlOpen={setVolumeControlOpen}
            isRandom={isRandom}
            setIsRandom={setIsRandom}
            playerRef={playerRef}
            currentVideoIndex={currentVideoIndex}
            setCurrentVideoIndex={setCurrentVideoIndex}
            item={item}
            darkMode={darkMode}
            icons={{
              randomIcon: isRandom ? randomICDark : randomIC,
              norandomIcon: isRandom ? norandomICDark : norandomIC,
              pauseIcon: darkMode ? pauseDark : pause,
              playIcon: darkMode ? playDark : play,
              prevIcon: darkMode ? prevDark : prev,
              nextIcon: darkMode ? nextDark : next,
              after10sIcon: darkMode ? after10sDark : after10s,
              before10sIcon: darkMode ? before10sDark : before10s,
              volumeIcon: darkMode ? volumeICDark : volumeIC,
            }}
          />
          <SongList
            item={item}
            currentVideoIndex={currentVideoIndex}
            setCurrentVideoIndex={setCurrentVideoIndex}
            isListBoxOpen={isListBoxOpen}
            toggleListBox={toggleListBox}
          />
        </>
      )}
    </div>
  );
}

export default MusicPlayer;
