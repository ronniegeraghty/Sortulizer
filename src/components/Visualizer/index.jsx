import React, { useState, useEffect } from "react";
import "./visualizer.css";
import Bar from "../Bar";

export default function Visualizer({ array, currentIndexes, traversals }) {
  const [barWidth, setBarWidth] = useState(null);

  useEffect(() => {
    setBarWidth(90 / array.length);
  }, [array, currentIndexes]);
  return (
    <div className="visualizer">
      <div className="row">
        <h1>Visualizer</h1>
      </div>
      <div className="row">
        <p>Array Traversals: {traversals}</p>
      </div>
      <div className="bar-row row">
        {array.map((value, index) => (
          <Bar
            key={value}
            number={value}
            width={barWidth}
            height={(value * 100) / array.length}
            margin={5 / array.length}
            textSize={50 / array.length}
            sorting={currentIndexes.includes(index)}
          />
        ))}
      </div>
    </div>
  );
}
