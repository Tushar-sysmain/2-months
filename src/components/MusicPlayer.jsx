// src/components/BackgroundMusic.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * BackgroundMusic
 * - src: path relative to `public` like "/sounds/bg-music.mp3"
 * - fadeDuration: milliseconds for fade-in
 */
export default function BackgroundMusic({ src = "public/music.mp3", fadeDuration = 1200 }) {
  const audioRef = useRef(null);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    let mounted = true;

    // prepare audio element
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
      return id;
    };

    // Try to autoplay muted (this usually succeeds)
    audio.play()
      .then(() => {
        // muted autoplay worked. Some browsers allow going audible after this.
        // Try to unmute after a small delay (may still be blocked).
        setTimeout(async () => {
          if (!mounted) return;
          try {
            audio.muted = false;
            // calling play() again is harmless
            await audio.play();
            fadeIn();
            setNeedsInteraction(false);
          } catch (err) {
            // Unmuting programmatically blocked -> require gesture
            audio.muted = true;
            audio.volume = 0;
            setNeedsInteraction(true);
          }
        }, 300);
      })
      .catch(() => {
        // muted autoplay was blocked (rare) -> require gesture
        setNeedsInteraction(true);
      });

    // If blocked, attempt to start on first user gesture (click/touch/keydown).
    const startOnGesture = async () => {
      if (!mounted) return;
      try {
        audio.muted = false;
        await audio.play();
        fadeIn();
        setNeedsInteraction(false);
        try { localStorage.setItem("bg-music-enabled", "1"); } catch (e) {/* ignore */}
        removeGestureListeners();
      } catch (e) {
        // ignore, user can try pressing the on-screen button
        console.warn("Audio start on gesture failed:", e);
      }
    };

    const gestureEvents = [
      { target: document, type: "click" },
      { target: document, type: "touchstart" },
      { target: window, type: "keydown" }
    ];
    const removeGestureListeners = () => {
      gestureEvents.forEach(({ target, type }) => {
        try { target.removeEventListener(type, startOnGesture, { once: true, passive: true }); } catch (e) {}
      });
    };
    gestureEvents.forEach(({ target, type }) => {
      try { target.addEventListener(type, startOnGesture, { once: true, passive: true }); } catch (e) {}
    });

    return () => {
      mounted = false;
      removeGestureListeners();
      try {
        audio.pause();
        audio.src = "";
      } catch (e) {}
    };
  }, [src, fadeDuration]);

  // on-screen fallback button for accessibility and clarity
  const handleEnableClick = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.muted = false;
      await audio.play();
      // small fade
      const steps = 20;
      const stepTime = Math.max(10, Math.floor(fadeDuration / steps));
      let v = 0;
      audio.volume = 0;
      const id = setInterval(() => {
        v += 1 / steps;
        audio.volume = Math.min(1, v);
        if (v >= 1) clearInterval(id);
      }, stepTime);
      setNeedsInteraction(false);
      try { localStorage.setItem("bg-music-enabled", "1"); } catch (e) {}
    } catch (e) {
      console.error("Could not start audio on button press:", e);
    }
  };

  return (
    <>
      {/* The audio element must be in the DOM for some browsers */}
      <audio ref={audioRef} src={src} preload="auto" />
      {needsInteraction && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.6)",
            color: "#fff",
            zIndex: 9999,
            padding: 20,
          }}
        >
          <div style={{ textAlign: "center", maxWidth: 420 }}>
            <h2 style={{ margin: "0 0 8px" }}>Tap / Click to enable sound</h2>
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              Autoplayed audio is blocked by your browser. Tap anywhere or press the button to enable background music.
            </p>
            <button
              onClick={handleEnableClick}
              style={{
                padding: "10px 18px",
                fontSize: 16,
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
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
