import React, { useEffect } from "react";
import Pizzicato from "pizzicato";

function Sound({ time, soundFreqs }) {
  let soundGroup = new Pizzicato.Group([]);
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
  //   function playSound() {
  //     soundGroup.play();
  //     setTimeout(() => {
  //       soundGroup.stop();
  //     }, time);
  //   }

  useEffect(() => {
    soundGroup.play();
    return () => {
      soundGroup.stop();
    };
  }, [soundGroup]);

  return <div>{/* <button onClick={playSound}>Play</button> */}</div>;
}

export default Sound;
