import React, { useEffect } from "react";
import Pizzicato from "pizzicato";

function Sound({ status, soundFreqs }) {
  let soundGroup = {
    play: () => {},
    stop: () => {},
  };
  try {
    soundGroup = new Pizzicato.Group([]);
    soundFreqs.forEach(soundFreq => {
      let sound = new Pizzicato.Sound({
        source: "wave",
        options: {
          type: "square",
          frequency: soundFreq,
        },
      });
      soundGroup.addSound(sound);
    });
    soundGroup.volume = 0.3;
  } catch (error) {}

  //   function playSound() {
  //     soundGroup.play();
  //     setTimeout(() => {
  //       soundGroup.stop();
  //     }, 1000);
  //   }

  useEffect(() => {
    if (status === "active" || status === "finished") {
      soundGroup.play();
    }
    return () => {
      soundGroup.stop();
    };
  }, [status, soundGroup]);

  return <div> {/* <button onClick={playSound}>Play</button> */}</div>;
}

export default Sound;
