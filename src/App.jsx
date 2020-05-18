import React, { useState } from "react";
import NavBar from "./components/navbar";
import Visualizer from "./components/visualizer";
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
    if (sortType === "bubble") {
    }
  }

  return (
    <div className="App">
      <NavBar radArrCB={createRandomArray} sortArrCB={sortArray} />
      <Visualizer arr={array} />
    </div>
  );
};

export default App;
