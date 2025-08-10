import React from "react";
import BackgroundMusic from "./components/BackgroundMusic";
import MainAppUI from "./components/MainAppUI"; // if you have one

function App() {
  return (
    <>
      {/* This will run the background music logic */}
      <BackgroundMusic src="public/music.mp3" />

      {/* The rest of your app */}
      <MainAppUI />
    </>
  );
}

export default App;

