import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import styles from './styles/musicplayer.module.css';
import {
  handleSeekChange,
  // handlePrevClick,
  handleProgress,
  handleVolumeChange,
  toggleVolumeControl,
} from './handler/handle';
import pause from '@assets/svg/pause.svg';
import pauseDark from '@assets/svg/pauseDark.svg';
import play from '@assets/svg/play.svg';
import playDark from '@assets/svg/playDark.svg';
import prev from '@assets/svg/prev.svg';
import prevDark from '@assets/svg/prevDark.svg';
import next from '@assets/svg/next.svg';
import nextDark from '@assets/svg/nextDark.svg';
import randomIC from '@assets/svg/randomplay.svg';
import randomICDark from '@assets/svg/randomplayDark.svg';
import norandomIC from '@assets/svg/norandomplay.svg';
import norandomICDark from '@assets/svg/norandomplayDark.svg';
import after10s from '@assets/svg/after10s.svg';
import after10sDark from '@assets/svg/after10sDark.svg';
import before10s from '@assets/svg/before10s.svg';
import before10sDark from '@assets/svg/before10sDark.svg';
import volumeIC from '@assets/svg/buttons/volume.svg';
import volumeICDark from '@assets/svg/buttons/volumeDark.svg';
import ButtonBack from './ButtonBack';
import Loading from './loading';
import { useOutletContext } from 'react-router-dom'; /* 240523 수정 */

function MusicPlayer() {
  // const [darkMode, setDarkMode] = useState(false);
  const [after10sIcon, setAfter10sIcon] = useState(after10s);
  const [before10sIcon, setBefore10sIcon] = useState(before10s);
  const [pauseIcon, setPauseIcon] = useState(pause); //240523 수정
  const [playIcon, setPlayIcon] = useState(play); //240523 수정
  const [prevIcon, setPrevIcon] = useState(prev); //240523 수정
  const [nextIcon, setNextIcon] = useState(next); //240523 수정
  const [volumeIcon, setVolumeIcon] = useState(volumeIC); //240523 수정
  const [randomIcon, setRandomIcon] = useState(randomIC); //240523 수정
  const [norandomIcon, setNorandomIcon] = useState(norandomIC); //240523 수정

  const { darkMode } = useOutletContext(); // darkMode 상태 가져오기 240523 수정

  const playerRef = useRef(null);

  const axios = useCustomAxios();
  const [isPlaying, setIsPlaying] = useState(false);
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

  const fetchData = async () => {
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
  };

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
      setDuration(player.getDuration());
    }
  }, [duration]);

  useEffect(() => {
    setIsPlaying(true); // 최초 렌더링 시 재생 상태로 변경
  }, []);

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
    <>
      <div className={styles.wrap}>
        <ButtonBack path={`/playlist/${_id}`}></ButtonBack>
        {!item && !error && <Loading />}
        {item && (
          <div
            className={`${styles.musicplayerWrap} ${
              isListBoxOpen ? styles.overflow : ''
            }`}
          >
            <img
              className={styles.musicMainCover}
              src={`https://img.youtube.com/vi/${item.extra.music[currentVideoIndex].id}/maxresdefault.jpg`}
              alt=""
            />
            <div className={styles.controlerWapper}>
              <div className={styles.playerWrapper}>
                <ReactPlayer
                  ref={playerRef}
                  className={styles.reactPlayer}
                  playing={isPlaying}
                  url={`https://youtube.com/embed/${item.extra.music[currentVideoIndex].id}`}
                  width="0"
                  height="0"
                  controls={false}
                  onProgress={state =>
                    handleProgress(state, setPlayedSeconds, setDuration)
                  }
                  volume={volume}
                  onEnded={handleVideoEnd}
                />
              </div>
              <span>{}</span>
              <h3 className={styles.songTitle}>
                {escapeSpecialCharacters(
                  item.extra.music[currentVideoIndex].title,
                )}
              </h3>
              <div>
                <input
                  className={styles.seekBar}
                  type="range"
                  min={0}
                  max={duration}
                  step="any"
                  value={playedSeconds}
                  onChange={e => handleSeekChange(e, playerRef)}
                />
                <div className={styles.timerWrapper}>
                  {/* 현재 진행 시간 */}
                  <time dateTime="P1S" className={styles.playTime}>
                    {formatTime(playedSeconds)}
                  </time>
                  {/* 전체 재생 시간 */}
                  <time dateTime="P1S" className={styles.totalTime}>
                    {formatTime(duration)}
                  </time>
                </div>
              </div>

              <div className={styles.musicControl}>
                <div className={styles.defaultControl}>
                  <button
                    onClick={() => {
                      toggleRandom();
                      handleRandomPlay();
                    }}
                    className={isRandom ? styles.active : ''}
                  >
                    {/* 랜덤 재생 모드인 경우 '랜덤 재생 중'으로 표시 */}
                    {/* {isRandom ? '랜덤 재생 O' : '랜덤 재생 X'} */}
                    {isRandom ? (
                      <img src={randomIcon} className="randomBtn" />
                    ) : (
                      <img src={norandomIcon} className="randomBtn" />
                    )}
                  </button>
                  <div className={styles.centerControl}>
                    <button onClick={handleBackward10}>
                      {/* <img src={before10s} /> */}
                      <img src={before10sIcon} /> {/* 240523 수정 */}
                    </button>

                    <button onClick={handlePrevClick}>
                      <img src={prevIcon} className={styles.prev} alt="" />
                    </button>

                    <button onClick={isPlaying ? handlePause : handlePlay}>
                      {isPlaying ? (
                        <img src={playIcon} className={styles.play} />
                      ) : (
                        <img src={pauseIcon} className={styles.pause} />
                      )}
                    </button>

                    <button onClick={handleNextClick}>
                      <img src={nextIcon} className={styles.next} alt="" />
                    </button>

                    <button onClick={handleForward10}>
                      {/* <img src={after10s} /> */}
                      <img src={after10sIcon} /> {/* 240523 수정 */}
                    </button>
                  </div>
                  <div className={styles.volumes}>
                    <button
                      className={styles.btnVolume}
                      onClick={() =>
                        toggleVolumeControl(
                          isVolumeControlOpen,
                          setVolumeControlOpen,
                        )
                      }
                    >
                      <img src={volumeIcon} alt="" />
                    </button>
                    {isVolumeControlOpen && (
                      <div className={styles.volumeRa}>
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step="any"
                          value={volume}
                          onChange={e => handleVolumeChange(e, setVolume)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {item && (
          <div
            className={`${styles.listBox} ${
              isListBoxOpen ? styles.fullBox : ''
            }`}
            onClick={toggleListBox}
          >
            <div className={styles.curretbox}>
              <h4 className={`${styles.songlistTitle} ${styles.titleFirst}`}>
                재생중인 곡
              </h4>
              <div className={styles.currentPlay}>
                <div className={styles.thumbnail}>
                  <img
                    src={`https://img.youtube.com/vi/${item.extra.music[currentVideoIndex].id}/default.jpg`}
                    alt=""
                  />
                </div>
                <h3>
                  {escapeSpecialCharacters(
                    item.extra.music[currentVideoIndex].title,
                  )}
                </h3>
              </div>
            </div>
            <div className={styles.selectBox}>
              <h4 className={`${styles.songlistTitle} ${styles.titleSecond}`}>
                곡 목록
              </h4>
              <div className={styles.songlist}>
                {item?.extra?.music.map((video, index) => (
                  <div
                    className={styles.songlistItem}
                    key={index}
                    onClick={() => handleSongSelect(video.id)}
                  >
                    <div className={styles.thumbnail}>
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/default.jpg`}
                        alt=""
                      />
                    </div>
                    <h3>{video.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MusicPlayer;
