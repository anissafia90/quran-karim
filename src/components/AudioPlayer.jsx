import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

function AudioPlayer({ surah, audioUrl, isPlaying, setIsPlaying }) {
  const audioRef = useRef(null);
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);

  // Reset currentAyahIndex when a new Surah is loaded
  useEffect(() => {
    setCurrentAyahIndex(0);
  }, [audioUrl]);

  useEffect(() => {
    if (audioRef.current && audioUrl.length > 0) {
      audioRef.current.src = audioUrl[currentAyahIndex]; // Set the current Ayah URL
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.error("Error playing audio:", err));
      }
    }
  }, [audioUrl, currentAyahIndex, isPlaying]);

  const handleAudioEnd = () => {
    if (currentAyahIndex < audioUrl.length - 1) {
      setCurrentAyahIndex((prevIndex) => prevIndex + 1); // Move to the next Ayah
    } else {
      setIsPlaying(false); // Stop playback at the end of the Surah
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold">{surah.name}</h3>
      <p className="text-gray-600">{surah.englishName}</p>
      <p className="text-gray-500 mt-2">
        Playing Ayah {currentAyahIndex + 1} of {audioUrl.length}
      </p>
      <button
        onClick={togglePlay}
        className="mt-4 p-4 bg-emerald-600 text-white rounded-full"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <audio
        ref={audioRef}
        onEnded={handleAudioEnd} // Triggered when the current Ayah finishes
        className="hidden"
      />
    </div>
  );
}

export default AudioPlayer;
