import React, { useEffect } from "react";
import Pizzicato from "pizzicato";

function Sound({ time, soundFreqs }) {
  let soundGroup = new Pizzicato.Group([]);
  soundFreqs.forEach(soundFreq => {
    let sound = new Pizzicato.Sound({
      source: "wave",
      options: {
        frequency: soundFreq,
      },
    });
    soundGroup.addSound(sound);
  });
  function playSound() {
    soundGroup.play();
    setTimeout(() => {
      soundGroup.stop();
    }, time);
  }
  useEffect(() => {
    soundGroup.play();
    const timeout = setTimeout(() => {
      soundGroup.stop();
    }, time);
    return () => clearTimeout(timeout);
  }, [soundGroup, time]);

  return (
    <div>
      <button onClick={playSound}>Play</button>
    </div>
  );
}

export default Sound;
