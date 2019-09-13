import React, { useState } from "react";
import "./bar.css";

const Bar = props => {
  const style = {
    height: props.number * 10
  };
  return (
    <span className="bar">
      <p className="number">{props.number}</p>
      <div className="vertical" style={style}></div>{" "}
    </span>
  );
};

export default Bar;
