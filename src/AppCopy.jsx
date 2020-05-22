import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Visualizer from "./components/Visualizer";
import { arrayCreator } from "./functions/arrayCreator";
import { bubbleStartingState } from "./functions/bubbleSort";
import "./App.css";

const INITSORTSTATE = {
  array: [],
  type: "",
  finished: true,
  currentIndexes: [],
  sort: () => console.log("No Sort Function Yet!"),
};

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
    console.log("Creating New Array!!!!!!");
    setSortState({
      ...INITSORTSTATE,
      array: arrayCreator(arrLen),
    });
  }
  /**
   * When the sortButton Call Back button is pressed on the navbar
   * this function will run to set the sortState according to the
   * selected sorting algorithm, then set finished to false so the
   * sorting loop starts.
   * @param {string} sortType
   */
  function sortButton(sortType) {
    console.log("Starting New Sort!!!!!!!");
    let state = {};
    switch (sortType) {
      case "bubble":
        state = bubbleStartingState;
        break;
      case "merge":
        break;
      default:
    }
    setSortState({
      ...sortState,
      ...state,
      finished: false,
    });
  }

  useEffect(() => {
    console.log(sortState);
    if (!sortState.finished) {
      setTimeout(() => {
        setSortState({ ...sortState.sort(sortState) });
      }, 100);
    }
  }, [sortState]);

  return (
    <div className="App">
      <NavBar radArrCB={createRandomArray} sortButtonCB={sortButton} />
      <Visualizer
        array={sortState.array}
        currentIndexes={sortState.currentIndexes}
      />
    </div>
  );
};

export default App;
// function sortArray(sortType) {
//   setFinished(false);
//   console.log("Array Before: ", array);
//   console.log("Current Index Before: ", currentIndexes);

//   let [newArray, nextIndex, changed, reset] = bubbleSort(array, currentIndexes);
//   setArray([...newArray]);
//   setcurrentIndexes(nextIndex);
//   setMadeChange(madeChange + changed);
//   //If we have reset to the beginning of the array
//   if (reset) {
//     console.log("RESTING!!!!!!!!!!!!!!!!");
//     if (madeChange > 0) {
//       // If we have made changes in this go through
//       setMadeChange(0); //reset madeChanges for next go through
//     } else {
//       // If no changes were made in that go thorugh then we are finished
//       setFinished(true);
//       console.log("FINISHED!!!");
//     }
//   }

//   console.log("Array After: ", array);
//   console.log("Current Index After: ", currentIndexes);
//   setStepDone(!stepDone);
// }
