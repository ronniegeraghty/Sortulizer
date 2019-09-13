import React from "react";
import Bar from "./bar";
import "./visualizer.css";

const Visualizer = props => {
  return (
    <div className="visualizer">
      {props.arr.map((num, key) => (
        <Bar arrayLength={props.arr.length} number={num} key={num} />
      ))}
    </div>
  );
};

export default Visualizer;
