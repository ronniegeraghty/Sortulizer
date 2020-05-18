import React, { useState, useEffect } from "react";
import NavBar from "./components/navbar";
import Visualizer from "./components/visualizer";
import { arrayCreator } from "./functions/arrayCreator";
import { bubbleSort } from "./functions/bubbleSort";
import "./App.css";

function App() {
  //The type of sorting to do
  const [sortType, setSortType] = useState(undefined);
  //The array to be sorted through
  const [array, setArray] = useState([]);

  useEffect(() => {
    console.log(`ARRAY: ${array}`);
  }, [array]);

  //Create random array of certain length
  const randomizeArray = (arrLen) => {
    setArray(arrayCreator(arrLen));
  };
  //Sort Array with call back function from the navbar component
  const sortArrayCB = (sortTY) => {
    if (sortTY === "bubble") {
      console.log("BUBBLE SORT!");
      let currentIndex = 0;
      while (currentIndex < array.length - 1) {
        console.log("Sorting");
        currentIndex++;
      }
    }
  };

  return (
    <div className="App">
      <NavBar radArrCB={randomizeArray} sortArrCB={sortArrayCB} />
      <Visualizer arr={array} />
    </div>
  );
}

export default App;
