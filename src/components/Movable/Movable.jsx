import React from "react";
import "./movable.css";
import { useSpring, animated } from "react-spring";
import Bar from "../Bar/bar";

const Movable = ({ oldPos, newPos }) => {
  const props = useSpring({
    from: {
      left: oldPos + "px",
    },
    to: async (next) => {
      await next({
        left: newPos + "px",
      });
    },
  });
  return (
    <animated.div className="script-box" style={props}>
      <Bar arrayLength={5} number={5} />
    </animated.div>
  );
};

export default Movable;
