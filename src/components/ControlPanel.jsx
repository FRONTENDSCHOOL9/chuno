import styles from './musicplayer.module.css';
import * as handle from './handler/handle';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player/youtube';
import { useCallback, useEffect } from 'react';

ControlPanel.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  playedSeconds: PropTypes.number.isRequired,
  setPlayedSeconds: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  setDuration: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  setVolume: PropTypes.func.isRequired,
  isVolumeControlOpen: PropTypes.bool.isRequired,
  setVolumeControlOpen: PropTypes.func.isRequired,
  isRandom: PropTypes.bool.isRequired,
  setIsRandom: PropTypes.func.isRequired,
  playerRef: PropTypes.object.isRequired,
  currentVideoIndex: PropTypes.number.isRequired,
  setCurrentVideoIndex: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  icons: PropTypes.shape({
    randomIcon: PropTypes.string.isRequired,
    norandomIcon: PropTypes.string.isRequired,
    before10sIcon: PropTypes.string.isRequired,
    prevIcon: PropTypes.string.isRequired,
    pauseIcon: PropTypes.string.isRequired,
    playIcon: PropTypes.string.isRequired,
    nextIcon: PropTypes.string.isRequired,
    after10sIcon: PropTypes.string.isRequired,
    volumeIcon: PropTypes.string.isRequired,
  }).isRequired,
};

function ControlPanel({
  isPlaying,
  setIsPlaying,
  playedSeconds,
  setPlayedSeconds,
  duration,
  volume,
  setVolume,
  isVolumeControlOpen,
  setVolumeControlOpen,
  isRandom,
  setIsRandom,
  playerRef,
  currentVideoIndex,
  setCurrentVideoIndex,
  item,
  icons,
  setDuration,
}) {
  const escapeSpecialCharacters = useCallback(str => {
    return str.replace(/&(?:[a-zA-Z]+|#\d+);/g, '');
  }, []);

  useEffect(() => {
    const handleKeyDown = event => {
      handle.handleKeyDown(
        event,
        item,
        setCurrentVideoIndex,
        setIsPlaying,
        setDuration,
      );
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, setCurrentVideoIndex, setIsPlaying, setDuration]);

  return (
    <>
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
            handle.handleProgress(state, setPlayedSeconds, setDuration)
          }
          onDuration={setDuration}
          volume={volume}
          muted={true}
          onEnded={handle.handleVideoEnd}
        />
      </div>
      <h3 className={styles.songTitle}>
        {escapeSpecialCharacters(item.extra.music[currentVideoIndex].title)}
      </h3>
      <div className={styles.musicControl}>
        <div>
          <input
            className={styles.seekBar}
            type="range"
            min={0}
            max={duration}
            step="any"
            value={playedSeconds}
            onChange={e => handle.handleSeekChange(e, playerRef)}
          />
          <div className={styles.timerWrapper}>
            <time dateTime="P1S" className={styles.playTime}>
              {handle.formatTime(playedSeconds)}
            </time>
            <time dateTime="P1S" className={styles.totalTime}>
              {handle.formatTime(duration)}
            </time>
          </div>
        </div>
        <div className={styles.defaultControl}>
          <button
            onClick={() => {
              handle.toggleRandom(setIsRandom);
              handle.handleRandomPlay(item, setCurrentVideoIndex);
            }}
            className={isRandom ? styles.active : ''}
          >
            <img
              src={isRandom ? icons.randomIcon : icons.norandomIcon}
              className="randomBtn"
            />
          </button>
          <div className={styles.centerControl}>
            <button
              onClick={() =>
                handle.handleBackward10(
                  playedSeconds,
                  setPlayedSeconds,
                  playerRef,
                )
              }
            >
              <img src={icons.before10sIcon} />
            </button>
            <button
              onClick={() =>
                handle.handlePrevClick(item, isRandom, setCurrentVideoIndex)
              }
            >
              <img src={icons.prevIcon} className={styles.prev} alt="" />
            </button>
            <button
              onClick={() =>
                isPlaying
                  ? handle.handlePause(setIsPlaying)
                  : handle.handlePlay(setIsPlaying)
              }
            >
              <img
                src={isPlaying ? icons.pauseIcon : icons.playIcon}
                className={isPlaying ? styles.pause : styles.play}
              />
            </button>
            <button
              onClick={() =>
                handle.handleNextClick(item, isRandom, setCurrentVideoIndex)
              }
            >
              <img src={icons.nextIcon} className={styles.next} alt="" />
            </button>
            <button
              onClick={() =>
                handle.handleForward10(
                  playedSeconds,
                  setPlayedSeconds,
                  duration,
                  playerRef,
                )
              }
            >
              <img src={icons.after10sIcon} />
            </button>
          </div>
          <div className={styles.volumes}>
            <button
              className={styles.btnVolume}
              onClick={() =>
                handle.toggleVolumeControl(
                  isVolumeControlOpen,
                  setVolumeControlOpen,
                )
              }
            >
              <img src={icons.volumeIcon} alt="" />
            </button>
            {isVolumeControlOpen && (
              <div className={styles.volumeRa}>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={volume}
                  onChange={e => handle.handleVolumeChange(e, setVolume)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ControlPanel;
