import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Visualizer from "./components/Visualizer";
import Footer from "./components/Footer";
import { arrayCreator } from "./functions/arrayCreator";
import { bubbleStartingState, bubbleSort } from "./functions/bubbleSort";
import "./App.css";

//Initial SortState: start with an array of size 20
const INITSORTSTATE = {
  array: arrayCreator(20),
  status: "inactive",
  currentIndexes: [],
};
const timeBetweenComparisons = 0;

const App = () => {
  const [sortState, setSortState] = useState({
    ...bubbleStartingState,
    ...INITSORTSTATE,
  });
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
    if (sortState.status === "active") {
      /*If sorting is already active and the button is clicked 
      again pause the sort where it is.*/
      setSortState(prevState => ({
        ...prevState,
        status: "inactive",
      }));
    } else {
      // If the sorting is inactive then start it
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
      /*If the currentIndexes are not [] then we are paused in the 
      middle of a sort and should keep the currentIndexes of the 
      prevouse sortState*/
      let newIndexes =
        sortState.currentIndexes.length === 0
          ? state.currentIndexes
          : sortState.currentIndexes;
      setSortState(prevState => ({
        ...state,
        array: prevState.array,
        status: "active",
        currentIndexes: newIndexes,
      }));
    }
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
      <NavBar
        radArrCB={createRandomArray}
        sortButtonCB={sortButton}
        sortStatus={sortState.status}
      />
      <Visualizer
        array={sortState.array}
        currentIndexes={sortState.currentIndexes}
      />
      <Footer />
    </div>
  );
};

export default App;
