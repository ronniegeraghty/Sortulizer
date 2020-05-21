import React, { useState, useEffect } from "react";
import "./bar.css";

export default function Bar({
  number,
  width,
  height,
  margin,
  textSize,
  sorting,
}) {
  const [color, setColor] = useState(
    sorting
      ? "linear-gradient(120deg, red, yellow)"
      : "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)"
  );

  useEffect(() => {
    if (sorting) {
      setColor("linear-gradient(120deg, red, yellow)");
    } else {
      setColor("linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)");
    }
  }, [sorting, color]);

  return (
    <div className="bar" style={{ width: width + "%", margin: margin + "%" }}>
      <div className="float-bottom" style={{ height: height + "%" }}>
        <p className="number" style={{ fontSize: textSize + "rem" }}>
          {number}
        </p>
        <div className="vertical-bar" style={{ backgroundImage: color }}></div>
      </div>
    </div>
  );
}
