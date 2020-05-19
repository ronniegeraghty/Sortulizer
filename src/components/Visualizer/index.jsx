import React, { useState, useEffect } from "react";
import "./visualizer.css";
import Bar from "../Bar";

export default function Visualizer({ array }) {
  const [barWidth, setBarWidth] = useState(null);

  useEffect(() => {
    setBarWidth(100 / array.length);
  }, [array]);
  return (
    <div className="visualizer">
      <div className="row">
        <h1>Visualizer</h1>
      </div>
      <div className="bar-row row">
        {array.map((value, index) => (
          <Bar
            key={value}
            number={value}
            width={barWidth}
            height={(value * 100) / array.length}
            startPos={0}
            endPos={50}
            // endPos={(index * 100) / array.length}
          />
        ))}
      </div>
    </div>
  );
}
