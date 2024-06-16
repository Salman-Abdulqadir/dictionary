import React, { useRef, useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const AudioPlayer = ({ audioSrc }) => {
  const audioRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioComponent = audioRef.current;
    const handleCanPlayThrough = () => setIsLoading(false);
    const handleEnded = () => setIsPlaying(false);

    if (audioComponent) {
      audioComponent.addEventListener("canplaythrough", handleCanPlayThrough);
      audioComponent.addEventListener("ended", handleEnded);
      audioComponent.load();
    }

    return () => {
      if (audioComponent) {
        audioComponent.removeEventListener(
          "canplaythrough",
          handleCanPlayThrough
        );
        audioComponent.removeEventListener("ended", handleEnded);
      }
    };
  }, [audioSrc]);

  const playAudio = () => {
    const audioComponent = audioRef.current;
    if (audioComponent) {
      audioComponent.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    const audioComponent = audioRef.current;
    if (audioComponent) {
      audioComponent.pause();
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  return (
    <div>
      <audio ref={audioRef} preload="auto" src={audioSrc}></audio>
      <button
        className="btn btn-circle btn-outline btn-primary btn-lg"
        onClick={togglePlayPause}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-sm text-primary"></span>
        ) : isPlaying ? (
          <FaPause />
        ) : (
          <FaPlay />
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;
