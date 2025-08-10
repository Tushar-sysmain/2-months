import React, { useEffect, useRef, useState } from "react";

export default function BackgroundMusic({ src = "/sounds/bg-music.mp3", fadeDuration = 1200 }) {
  const audioRef = useRef(null);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    let mounted = true;

    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audio.muted = true;

    const fadeIn = (duration = fadeDuration) => {
      const steps = 30;
      const stepTime = Math.max(10, Math.floor(duration / steps));
      let v = 0;
      audio.volume = 0;
      const id = setInterval(() => {
        v += 1 / steps;
        audio.volume = Math.min(1, v);
        if (v >= 1) clearInterval(id);
      }, stepTime);
    };

    audio.play()
      .then(() => {
        setTimeout(async () => {
          if (!mounted) return;
          try {
            audio.muted = false;
            await audio.play();
            fadeIn();
            setNeedsInteraction(false);
          } catch {
            audio.muted = true;
            audio.volume = 0;
            setNeedsInteraction(true);
          }
        }, 300);
      })
      .catch(() => {
        setNeedsInteraction(true);
      });

    const startOnGesture = async () => {
      if (!mounted) return;
      try {
        audio.muted = false;
        await audio.play();
        fadeIn();
        setNeedsInteraction(false);
        removeGestureListeners();
      } catch {}
    };

    const gestureEvents = [
      { target: document, type: "click" },
      { target: document, type: "touchstart" },
      { target: window, type: "keydown" }
    ];
    const removeGestureListeners = () => {
      gestureEvents.forEach(({ target, type }) => {
        target.removeEventListener(type, startOnGesture);
      });
    };
    gestureEvents.forEach(({ target, type }) => {
      target.addEventListener(type, startOnGesture, { once: true, passive: true });
    });

    return () => {
      mounted = false;
      removeGestureListeners();
      audio.pause();
    };
  }, [src, fadeDuration]);

  const handleEnableClick = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.muted = false;
      await audio.play();
      audio.volume = 0;
      const steps = 20;
      const stepTime = Math.max(10, Math.floor(fadeDuration / steps));
      let v = 0;
      const id = setInterval(() => {
        v += 1 / steps;
        audio.volume = Math.min(1, v);
        if (v >= 1) clearInterval(id);
      }, stepTime);
      setNeedsInteraction(false);
    } catch (e) {
      console.error("Could not start audio:", e);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" />
      {needsInteraction && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.6)",
            color: "#fff",
            zIndex: 9999
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h2>Tap to Enable Sound</h2>
            <button
              onClick={handleEnableClick}
              style={{
                padding: "10px 18px",
                fontSize: 16,
                borderRadius: 8,
                border: "none",
                cursor: "pointer"
              }}
            >
              Enable Sound
            </button>
          </div>
        </div>
      )}
    </>
  );
}
