import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Visualizer from "./components/Visualizer";
import { arrayCreator } from "./functions/arrayCreator";
import "./App.css";

const App = () => {
  const [array, setArray] = useState([]);
  //const [sortType, setSortType] = useState(undefined);
  function createRandomArray(arrLen) {
    setArray(arrayCreator(arrLen));
  }
  function sortArray(sortType) {
    console.log("SORTING ARRAY");
    console.log(`SORT TYPE: ${sortType}`);
  }

  return (
    <div className="App">
      <NavBar radArrCB={createRandomArray} sortArrCB={sortArray} />
      <Visualizer array={array} />
    </div>
  );
};

export default App;
