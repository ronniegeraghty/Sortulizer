import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Visualizer from "./components/Visualizer";
import { arrayCreator } from "./functions/arrayCreator";
import { bubbleStartingState, bubbleSort } from "./functions/bubbleSort";
import "./App.css";

const INITSORTSTATE = {
  array: [],
  type: "",
  status: "inactive",
  currentIndexes: [],
  sort: () => console.log("No Sort Function Yet!"),
};
const timeBetweenComparisons = 0;

const App = () => {
  // const [array, setArray] = useState([]);
  const [sortState, setSortState] = useState({ ...INITSORTSTATE });
  /**
   * When the radArr Call Back function that is passed to the navbar
   * is called, run this function to set the array state to an array
   * of size arrLen created with the arrayCreator method.
   * @param {int} arrLen
   */
  function createRandomArray(arrLen) {
    setSortState({
      ...INITSORTSTATE,
      array: arrayCreator(arrLen),
    });
  }
  /**
   * When the sortButton Call Back button is pressed on the navbar
   * this function will run to set the sortState according to the
   * selected sorting algorithm, then set status to false so the
   * sorting loop starts.
   * @param {string} sortType
   */
  function sortButton(sortType) {
    let state = {};
    switch (sortType) {
      case "bubble":
        state = JSON.parse(JSON.stringify(bubbleStartingState)); // creates new object
        state = { ...state, sort: bubbleSort };
        break;
      case "merge":
        break;
      default:
    }
    setSortState(prevState => ({
      ...state,
      array: prevState.array,
      status: "active",
    }));
  }

  useEffect(() => {
    if (sortState.status === "active") {
      setTimeout(() => {
        setSortState(prevState => ({
          ...prevState.sort(prevState),
        }));
      }, timeBetweenComparisons);
    } else if (sortState.status === "finished") {
      setSortState(prevState => ({
        ...INITSORTSTATE,
        array: prevState.array,
      }));
    }
  }, [sortState]);

  return (
    <div className="App">
      <NavBar radArrCB={createRandomArray} sortButtonCB={sortButton} />
      <Visualizer
        array={sortState.array}
        currentIndexes={sortState.currentIndexes}
      />
      <p className="footer">v1.1.0</p>
    </div>
  );
};

export default App;
