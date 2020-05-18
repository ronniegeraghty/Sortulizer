import React, { useState, useEffect } from "react";
import "./visualizer.css";
import Movable from "../Movable/Movable";

const Visualizer = (props) => {
  return (
    <div className="visualizer">
      <Movable oldPos={0} newPos={100} />
    </div>
  );
};

export default Visualizer;
