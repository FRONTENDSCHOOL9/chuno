import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const AudioVisualizer = ({ audioContext, audioSource }) => {
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);

  useEffect(() => {
    if (!audioContext || !audioSource) return;

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    audioSource.connect(analyser);
    analyserRef.current = analyser;

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
        canvasCtx.fillRect(
          x,
          canvas.height - barHeight / 2,
          barWidth,
          barHeight / 2,
        );

        x += barWidth + 1;
      }
    };

    draw();
  }, [audioContext, audioSource]);

  return <canvas ref={canvasRef} width="600" height="400" />;
};

AudioVisualizer.propTypes = {
  audioContext: PropTypes.instanceOf(window.AudioContext).isRequired,
  audioSource: PropTypes.object.isRequired,
};

export default AudioVisualizer;
