export const handleSongSelect = (videoId, item, setCurrentVideoIndex) => {
  const selectedIndex = item?.extra?.music.findIndex(
    video => video.id === videoId,
  );
  if (selectedIndex !== -1) {
    setCurrentVideoIndex(selectedIndex);
  }
};

export const handleVideoEnd = (item, isRandom, setCurrentVideoIndex) => {
  setCurrentVideoIndex(prevIndex =>
    isRandom
      ? Math.floor(Math.random() * item.extra.music.length)
      : prevIndex === item.extra.music.length - 1
      ? 0
      : prevIndex + 1,
  );
};

export const handlePlay = setIsPlaying => {
  setIsPlaying(true);
};

export const handlePause = setIsPlaying => {
  setIsPlaying(false);
};

export const handleRandomPlay = (item, setCurrentVideoIndex) => {
  setCurrentVideoIndex(Math.floor(Math.random() * item.extra.music.length));
};

export const handlePrevClick = (item, isRandom, setCurrentVideoIndex) => {
  setCurrentVideoIndex(prevIndex =>
    isRandom
      ? Math.floor(Math.random() * item.extra.music.length)
      : prevIndex === 0
      ? item.extra.music.length - 1
      : prevIndex - 1,
  );
};

export const handleNextClick = (item, isRandom, setCurrentVideoIndex) => {
  setCurrentVideoIndex(prevIndex =>
    isRandom
      ? Math.floor(Math.random() * item.extra.music.length)
      : prevIndex === item.extra.music.length - 1
      ? 0
      : prevIndex + 1,
  );
};

export const toggleRandom = setIsRandom => {
  setIsRandom(prev => !prev);
};

export const handleBackward10 = (
  playedSeconds,
  setPlayedSeconds,
  playerRef,
) => {
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

export const handleForward10 = (
  playedSeconds,
  setPlayedSeconds,
  duration,
  playerRef,
) => {
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

export const formatTime = seconds => {
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const handleButtonClick = () => {
  console.log('Button clicked!');
};
export const handleProgress = (state, setPlayedSeconds, setDuration) => {
  setPlayedSeconds(state.playedSeconds);
  setDuration(state.loadedSeconds);
};
export const handleVolumeChange = (e, setVolume) => {
  setVolume(parseFloat(e.target.value));
};

export const toggleVolumeControl = (
  isVolumeControlOpen,
  setVolumeControlOpen,
) => {
  setVolumeControlOpen(prevState => !prevState);
};

export const handleSeekChange = (e, playerRef) => {
  const seekTo = parseFloat(e.target.value);
  playerRef.current.seekTo(seekTo, 'seconds');
};

export const handleCombinedClick = setIsPlaying => {
  return () => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying); // 상태를 토글합니다.
    handleButtonClick();
  };
};

export const handleKeyDown = (
  event,
  item,
  setCurrentVideoIndex,
  setIsPlaying,
  setDuration,
) => {
  const musicLength = item?.extra?.music?.length ?? 1;

  switch (event.key) {
    case ' ':
      setIsPlaying(prevIsPlaying => !prevIsPlaying); // 재생/일시정지 토글
      handleButtonClick();
      break;
    case 'n':
      setCurrentVideoIndex(prevIndex =>
        prevIndex === musicLength - 1 ? 0 : prevIndex + 1,
      ); // 다음 곡으로 이동
      break;
    case 'p':
      setCurrentVideoIndex(prevIndex =>
        prevIndex === 0 ? musicLength - 1 : prevIndex - 1,
      ); // 이전 곡으로 이동
      break;
    case 'ArrowRight':
      handleForward10(setPlayedSeconds, setDuration); // 10초 앞으로 이동
      break;
    case 'ArrowLeft':
      handleBackward10(setPlayedSeconds, setDuration); // 10초 뒤로 이동
      break;
    default:
      break;
  }
};
