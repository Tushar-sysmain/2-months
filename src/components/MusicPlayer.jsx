import React, { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Start muted for autoplay policy compliance
    audio.volume = 0;
    audio.muted = true;

    audio.play()
      .then(() => {
        console.log("Music started muted");
        audio.muted = false;

        // Fade in volume
        let vol = 0;
        const fadeInterval = setInterval(() => {
          if (vol < 1) {
            vol += 0.05;
            audio.volume = vol;
          } else {
            clearInterval(fadeInterval);
          }
        }, 200);
      })
      .catch(err => {
        console.warn("Autoplay blocked, waiting for user interaction", err);

        // Start music after first user click
        const startOnClick = () => {
          audio.muted = false;
          audio.play();
          document.removeEventListener("click", startOnClick);
        };
        document.addEventListener("click", startOnClick);
      });
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src="public/music.mp3" // path relative to public folder
        loop
        preload="auto"
      />
    </>
  );
}
