export const handlePlayPause = (isPlaying, setIsPlaying) => {
  setIsPlaying(prevState => !prevState);
};

export const handleSeekChange = (e, playerRef) => {
  const seekTo = parseFloat(e.target.value);
  playerRef.current.seekTo(seekTo, 'seconds');
};

export const handlePrevClick = (
  selectedVideos,
  currentVideoIndex,
  setCurrentVideoIndex,
) => {
  setCurrentVideoIndex(prev =>
    prev === 0 ? selectedVideos.length - 1 : prev - 1,
  );
};

export const handleNextClick = (
  selectedVideos,
  currentVideoIndex,
  setCurrentVideoIndex,
) => {
  setCurrentVideoIndex(prev =>
    prev === selectedVideos.length - 1 ? 0 : prev + 1,
  );
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
