import React, { useRef, useState } from 'react';
import { Download } from 'lucide-react';

export default function AudioMessagePlayer({ src }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState('0:00');
  const [duracao, setDuracao] = useState('0:00');

  const formatarTempo = (segundos) => {
    const min = Math.floor(segundos / 60);
    const sec = Math.floor(segundos % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const atual = audioRef.current.currentTime;
    const total = audioRef.current.duration;
    setTempo(formatarTempo(atual));
    setDuracao(formatarTempo(total));
  };

  return (
    <div className="p-2 bg-gray-100 rounded shadow flex items-center justify-between gap-2">
      <button onClick={togglePlay} className="text-blue-600">
        {isPlaying ? '⏸' : '▶️'}
      </button>
      <div className="flex-1 text-xs text-gray-700">
        {tempo} / {duracao}
      </div>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={handleTimeUpdate}
      />
      <a href={src} download className="text-gray-500 hover:text-black">
        <Download size={16} />
      </a>
    </div>
  );
}
