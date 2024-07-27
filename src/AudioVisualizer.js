import React, { useRef, useEffect, useState } from 'react';

function AudioVisualizer({ audioSrc }) {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    if (!audioSrc) return;

    const newAudioContext = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(newAudioContext);

    return () => {
      if (newAudioContext) {
        newAudioContext.close();
      }
    };
  }, [audioSrc]);

  useEffect(() => {
    if (!audioContext || !audioSrc) return;

    const analyser = audioContext.createAnalyser();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const audio = audioRef.current;
    audio.src = audioSrc;

    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    function draw() {
      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;

      requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(new Uint8Array(analyser.frequencyBinCount));

      ctx.fillStyle = 'rgb(200, 200, 200)';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgb(0, 0, 0)';
      ctx.beginPath();

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);

      const sliceWidth = WIDTH * 1.0 / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * HEIGHT / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    }

    draw();

    return () => {
      source.disconnect();
    };
  }, [audioContext, audioSrc]);

  return (
    <div className="audio-visualizer">
      <canvas ref={canvasRef} width="800" height="200"></canvas>
      <audio ref={audioRef} controls />
    </div>
  );
}

export default AudioVisualizer;