import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const audioRef = useRef(null);
  const [showPlayButton, setShowPlayButton] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try muted autoplay
    audio.muted = true;
    audio.play()
      .then(() => {
        console.log("Music autoplayed (muted).");
        // Optional: unmute after short delay
        setTimeout(() => {
          audio.muted = false;
        }, 500); // fade-in effect can be added here
      })
      .catch(() => {
        console.log("Autoplay blocked. Showing play button.");
        setShowPlayButton(true);
      });
  }, []);

  const handlePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = false;
    audio.play();
    setShowPlayButton(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to My React Site 🎵</h1>
      {showPlayButton && (
        <button onClick={handlePlay}>Play Music</button>
      )}
      <audio ref={audioRef} src="public/bg.mp3" loop />
    </div>
  );
}
