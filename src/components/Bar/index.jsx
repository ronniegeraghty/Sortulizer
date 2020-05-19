import React from "react";
import "./bar.css";
import { useSpring, animated } from "react-spring";
export default function Bar({ number, width, height, startPos, endPos }) {
  const animatedProps = useSpring({
    to: [{ left: endPos + "%" }],
    from: { left: startPos + "%" },
  });
  return (
    <animated.div style={animatedProps}>
      <div className="bar" style={{ width: width + "%" }}>
        <p className="number">{number}</p>
        <div className="vertical-bar" style={{ height: height + "%" }}>
          {number}
        </div>
      </div>
    </animated.div>
  );
}
