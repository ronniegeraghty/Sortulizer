import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import "./visualizer.css";
import { SortStateContext } from "../../App";
import CustomSlider from "./CustomSlider";
import Bar from "../Bar";

export default function Visualizer({ sortSpeedCB }) {
  const [sortState, setSortState] = useContext(SortStateContext);
  const [barWidth, setBarWidth] = useState(null);
  const [sortSpeed, setSortSpeed] = useState(100);

  useEffect(() => {
    setBarWidth(90 / sortState.array.length);
  }, [sortState.array, sortState.currentIndexes]);
  return (
    <div className="visualizer">
      <div className="row">
        <h1>Visualizer</h1>
      </div>
      <div className="row">
        <p className="info-data" hidden={sortState.traversals === undefined}>
          Array Traversals: {sortState.traversals}
        </p>
      </div>
      <div className="row">
        <p className="info-data">Comparisons: {sortState.comparisons}</p>
      </div>
      <div className="row">
        <p className="info-data sort-speed-data">Sort Speed: </p>
        <CustomSlider
          className="sort-speed-data"
          valueLabelDisplay="auto"
          min={1}
          max={100}
          value={sortSpeed}
          onChange={(e, value) => {
            setSortSpeed(value);
            sortSpeedCB(value);
          }}
        />
      </div>

      <div className="bar-row row">
        {sortState.array.map((value, index) => (
          <Bar
            key={value}
            number={value}
            width={barWidth}
            height={(value * 90) / (sortState.array.length - 1)}
            margin={5 / sortState.array.length}
            textSize={50 / sortState.array.length}
            lineHeight={1}
            sorting={sortState.currentIndexes.includes(index)}
          />
        ))}
      </div>
    </div>
  );
}

Visualizer.propTypes = {
  sortSpeedCB: PropTypes.func,
};
