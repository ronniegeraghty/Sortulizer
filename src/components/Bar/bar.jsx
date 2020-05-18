import React, { useState, useEffect } from "react";
import "./bar.css";

const Bar = (props) => {
  const [barStyle, setBarStyle] = useState({
    width: window.innerWidth / (props.arrayLength * 1.2),
  });
  const [verticalSize, setVerticalSize] = useState({
    height: (props.number / props.arrayLength) * (window.innerHeight / 1.7),
  });
  const [numFontSize, setNumFontSize] = useState(
    window.innerWidth / (props.arrayLength * 1.5)
  );

  useEffect(() => {
    let resizeBars = () => {
      setBarStyle({
        width: window.innerWidth / (props.arrayLength * 1.2),
      });
      setVerticalSize({
        height: (props.number / props.arrayLength) * (window.innerHeight / 1.7),
      });
      setNumFontSize(window.innerWidth / (props.arrayLength * 1.5));
    };
    resizeBars();
    window.addEventListener("resize", resizeBars);
    return () => window.removeEventListener("resize", resizeBars);
  }, [props.arrayLength, props.number]); //runs on update to props.arrayLength and window resizing

  return (
    <span className="bar">
      <p className="number" style={{ fontSize: numFontSize }}>
        {props.number}
      </p>
      <div className="vertical" style={verticalSize}></div>{" "}
      <p className="invisible">S</p>
    </span>
  );
};

export default Bar;
