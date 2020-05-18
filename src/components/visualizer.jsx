import React, { useState, useEffect } from "react";
import Bar from "./bar";
import "./visualizer.css";

const Visualizer = (props) => {
  const [array, setArray] = useState(props.arr);
  useEffect(() => {
    if (array !== props.arr) {
      setArray(props.arr);
    }
  }, [array, props.arr]);

  return (
    <div className="visualizer">
      {array.map((num, key) => (
        <Bar arrayLength={array.length} number={num} key={key} />
      ))}
    </div>
  );
};

export default Visualizer;
