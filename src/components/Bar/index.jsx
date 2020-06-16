import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./bar.css";

export default function Bar({
  number,
  width,
  height,
  margin,
  textSize,
  sorting,
  lineHeight,
}) {
  const [color, setColor] = useState(
    sorting
      ? "linear-gradient(120deg, red, yellow)"
      : "linear-gradient(160deg, #84fab0 0%, #8fd3f4 100%)"
  );
  const [numTextHeight, setNumTextHeight] = useState(
    textSize > 10 ? 10 : textSize
  );

  useEffect(() => {
    if (sorting) {
      setColor("linear-gradient(120deg, red, yellow)");
    } else {
      setColor("linear-gradient(160deg, #84fab0 0%, #8fd3f4 100%)");
    }
    if (textSize > 10) {
      setNumTextHeight(10);
    } else {
      setNumTextHeight(textSize);
    }
  }, [sorting, color, textSize]);

  return (
    <div className="bar" style={{ width: width + "%", margin: margin + "%" }}>
      <div className="float-bottom" style={{ height: height + "%" }}>
        <p
          className="number"
          style={{ fontSize: numTextHeight + "rem", lineHeight: lineHeight }}
        >
          {number}
        </p>
        <div className="vertical-bar" style={{ backgroundImage: color }}></div>
      </div>
    </div>
  );
}

Bar.propTypes = {
  number: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.number,
  textSize: PropTypes.number,
  sorting: PropTypes.bool,
};
