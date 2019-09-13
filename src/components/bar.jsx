import React, { useState, useEffect } from "react";
import "./bar.css";

const Bar = props => {
  const [barStyle, setBarStyle] = useState({
    width: window.innerWidth / props.arrayLength
  });

  const [verticalSize, setVerticalSize] = useState({
    height: props.number * 10
  });

  let resizeBars = () => {
    setBarStyle({
      width: window.innerWidth / props.arrayLength
    });
  };

  useEffect(() => {
    resizeBars();
    window.addEventListener("resize", resizeBars);
    return () => window.removeEventListener("resize", resizeBars);
  }, [props.arrayLength]);

  return (
    <span className="bar" style={barStyle}>
      {console.log("NUM: " + props.number)}
      {console.log("ARRAYLENGTH: " + props.arrayLength)}
      {console.log("BARSTYLE: " + JSON.stringify(barStyle))}
      <p className="number">{props.number}</p>
      <div className="vertical" style={verticalSize}></div>{" "}
    </span>
  );
};

export default Bar;
