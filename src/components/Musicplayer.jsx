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
