import React, { useEffect, useRef } from "react";
import BackgroundMusic from "public/music.mp3"

export default function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0; // start silent
    audio.muted = true;
    audio.play()
      .then(() => {
        console.log("Music started muted");
        audio.muted = false;
        // Fade in volume
        let vol = 0;
        const fade = setInterval(() => {
          if (vol < 1) {
            vol += 0.05;
            audio.volume = vol;
          } else {
            clearInterval(fade);
          }
        }, 200);
      })
      .catch(err => {
        console.warn("Autoplay blocked — needs user click", err);
        // If blocked, attach listener for first user interaction
        const startOnClick = () => {
          audio.play();
          document.removeEventListener("click", startOnClick);
        };
        document.addEventListener("click", startOnClick);
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React Autoplay Music 🎵</h1>
      <audio ref={audioRef} src="public/music.mp3" loop preload="auto" />
    </div>
  );
}
