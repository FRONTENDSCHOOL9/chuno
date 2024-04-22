import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import styles from './styles/musicplayer.module.css';
import {
  handlePlayPause,
  handleSeekChange,
  handlePrevClick,
  handleNextClick,
  handleProgress,
  handleVolumeChange,
  toggleVolumeControl,
} from './handler/handle';
import pauseIcon from '@assets/svg/pause.svg';
import playIcon from '@assets/svg/play.svg';
import prevIcon from '@assets/svg/prev.svg';
import nextIcon from '@assets/svg/next.svg';
import volumeIcon from '@assets/svg/buttons/volume.svg';
import ButtonBack from './ButtonBack';

function MusicPlayer() {
  const playerRef = useRef(null);

  const axios = useCustomAxios();
  const [isPlaying, setIsPlaying] = useState(true);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isListBoxOpen, setListBoxOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVolumeControlOpen, setVolumeControlOpen] = useState(false);
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const { _id } = useParams();

  const fetchData = async () => {
    try {
      const res = await axios.get(`/products/${_id}`);
      if (res.data.item.extra) {
        setItem(res.data.item);
        console.log(res.data.item);
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

  const toggleListBox = () => {
    setListBoxOpen(!isListBoxOpen);
  };

  const handleSongSelect = videoId => {
    const selectedIndex = item?.extra?.music.findIndex(
      video => video.id === videoId,
    );
    if (selectedIndex !== -1) {
      setCurrentVideoIndex(selectedIndex);
    }
  };
  const changechar = /[^\w\s]/gi;

  return (
    <div className={styles.wrap}>
      <ButtonBack path={`/playlist/${_id}`} />
      {!item && !error && <div>Loading...</div>}
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
          <div className={styles.playerWrapper}>
            <ReactPlayer
              // ref={playerRef}
              className={styles.reactPlayer}
              playing={!isPlaying}
              url={
                item
                  ? `https://youtube.com/embed/${item.extra.music[currentVideoIndex].id}`
                  : ''
              }
              width="0"
              height="0"
              controls={false}
              onProgress={state =>
                handleProgress(state, setPlayedSeconds, setDuration)
              }
              volume={volume}
            />
          </div>
          <h3 className={styles.songTitle}>
            {item.extra.music[currentVideoIndex].title.replace(changechar, '')}
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
          </div>

          <div className={styles.musicControl}>
            <div className={styles.defaultControl}>
              <button
                onClick={() =>
                  handlePrevClick(
                    item?.extra?.music,
                    [currentVideoIndex],
                    setCurrentVideoIndex,
                  )
                }
              >
                <img className={styles.prev} src={prevIcon} alt="" />
              </button>

              <button onClick={() => handlePlayPause(isPlaying, setIsPlaying)}>
                {isPlaying ? (
                  <img src={pauseIcon} className={styles.pause} />
                ) : (
                  <img src={playIcon} className={styles.play} />
                )}
              </button>

              <button
                onClick={() =>
                  handleNextClick(
                    item?.extra?.music,
                    currentVideoIndex,
                    setCurrentVideoIndex,
                  )
                }
              >
                <img className={styles.next} src={nextIcon} alt="" />
              </button>
            </div>
            <div className={styles.volumes}>
              <button
                className={styles.btnVolume}
                onClick={() =>
                  toggleVolumeControl(isVolumeControlOpen, setVolumeControlOpen)
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
      )}
      {item && (
        <div
          className={`${styles.listBox} ${isListBoxOpen ? styles.fullBox : ''}`}
          onClick={toggleListBox}
        >
          <h4 className={styles.songlistTitle}>재생중인 곡</h4>
          <div className={styles.currentPlay}>
            <div className={styles.thumbnail}>
              <img
                src={`https://img.youtube.com/vi/${item.extra.music[currentVideoIndex].id}/maxresdefault.jpg`}
                alt=""
              />
            </div>
            <h3>
              {item.extra.music[currentVideoIndex].title.replace(
                changechar,
                '',
              )}
            </h3>
          </div>
          <h4 className={styles.songlistTitle}>곡 목록</h4>
          <div className={styles.songlist}>
            {item?.extra?.music.map((video, index) => (
              <div
                className={styles.songlistItem}
                key={index}
                onClick={() => handleSongSelect(video.id)}
              >
                <div className={styles.thumbnail}>
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt=""
                  />
                </div>
                <h3>{video.title}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MusicPlayer;
