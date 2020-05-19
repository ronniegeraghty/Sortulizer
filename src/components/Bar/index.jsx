import React from "react";
import "./bar.css";
export default function Bar({ number, width }) {
  return (
    <div className="bar" style={width}>
      Number: {number} | BarWidth: {width.width}
    </div>
  );
}
