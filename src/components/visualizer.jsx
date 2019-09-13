import React from "react";
import Bar from "./bar";

const Visualizer = props => {
  return (
    <div>
      <h1>Array: {props.arr}</h1>
      {props.arr.map((num, key) => (
        <Bar inLine number={num} key={num} />
      ))}
    </div>
  );
};

export default Visualizer;
