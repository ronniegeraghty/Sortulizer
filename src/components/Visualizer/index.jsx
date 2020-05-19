import React, { useState, useEffect } from "react";
import "./visualizer.css";
import Bar from "../Bar";

export default function Visualizer({ array }) {
  const [barWidth, setBarWidth] = useState({});
  useEffect(() => {
    setBarWidth({ width: 10 / array.length });
  }, [array]);
  return (
    <div className="visualizer">
      <div className="row">
        <h1>Visualizer</h1>
      </div>
      <div className="row">
        {array.map((value) => (
          <Bar key={value} number={value} width={barWidth} />
        ))}
      </div>
    </div>
  );
}
