import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import "./visualizer.css";
import CustomSlider from "./CustomSlider";
import Bar from "../Bar";

export default function Visualizer({
  array,
  currentIndexes,
  traversals,
  comparisons,
  sortSpeedCB,
}) {
  const [barWidth, setBarWidth] = useState(null);
  const [sortSpeed, setSortSpeed] = useState(100);
  const sortState = useContext(SortStateContext);

  useEffect(() => {
    setBarWidth(90 / array.length);
  }, [array, currentIndexes]);
  return (
    <div className="visualizer">
      <div className="row">
        <h1>Visualizer</h1>
      </div>
      <div className="row">
        <p className="info-data" hidden={traversals === undefined}>
          Array Traversals: {traversals}
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
        {array.map((value, index) => (
          <Bar
            key={value}
            number={value}
            width={barWidth}
            height={(value * 90) / (array.length - 1)}
            margin={5 / array.length}
            textSize={50 / array.length}
            lineHeight={1}
            sorting={currentIndexes.includes(index)}
          />
        ))}
      </div>
    </div>
  );
}

Visualizer.propTypes = {
  array: PropTypes.array,
  currentIndexes: PropTypes.array,
  traversals: PropTypes.number,
  comparisons: PropTypes.number,
  sortSpeedCB: PropTypes.func,
};
