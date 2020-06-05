import React, { useEffect } from "react";
import Pizzicato from "pizzicato";

function Sound({ time, sounds }) {
  let lowWave = new Pizzicato.Sound({
    source: "wave",
    options: {
      frequency: 100,
    },
  });
  let highWave = new Pizzicato.Sound({
    source: "wave",
    options: {
      frequency: 800,
    },
  });
  var soundGroup = new Pizzicato.Group([lowWave, highWave]);
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
