import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Visualizer from "./components/Visualizer";
import { arrayCreator } from "./functions/arrayCreator";
import { bubbleSort } from "./functions/bubbleSort";
import "./App.css";

const App = () => {
  const [array, setArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(true);
  const [madeChange, setMadeChange] = useState(0);
  const [stepDone, setStepDone] = useState(false);
  //const [sortType, setSortType] = useState(undefined);
  function createRandomArray(arrLen) {
    setArray(arrayCreator(arrLen));
  }
  function sortArray(sortType) {
    setFinished(false);
    console.log("Array Before: ", array);
    console.log("Current Index Before: ", currentIndex);

    let [newArray, nextIndex, changed, reset] = bubbleSort(array, currentIndex);
    setArray([...newArray]);
    setCurrentIndex(nextIndex);
    setMadeChange(madeChange + changed);
    //If we have reset to the beginning of the array
    if (reset) {
      console.log("RESTING!!!!!!!!!!!!!!!!");
      if (madeChange > 0) {
        // If we have made changes in this go through
        setMadeChange(0); //reset madeChanges for next go through
      } else {
        // If no changes were made in that go thorugh then we are finished
        setFinished(true);
        console.log("FINISHED!!!");
      }
    }

    console.log("Array After: ", array);
    console.log("Current Index After: ", currentIndex);
    setStepDone(!stepDone);
  }

  useEffect(() => {
    if (!finished) {
      setTimeout(sortArray, 0);
    }
  }, [stepDone]);

  return (
    <div className="App">
      <NavBar radArrCB={createRandomArray} sortArrCB={sortArray} />
      <Visualizer array={array} currentIndex={currentIndex} />
    </div>
  );
};

export default App;
