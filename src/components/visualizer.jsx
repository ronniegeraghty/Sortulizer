import React from "react";
import Bar from "./bar";

const Visualizer = props => {
  return (
    <div>
      {props.arr.map((num, key) => (
        <Bar arrayLength={props.arr.length} number={num} key={num} />
      ))}
    </div>
  );
};

export default Visualizer;
