import React, { useState } from "react";
import NavBar from "./components/navbar";
import Visualizer from "./components/visualizer";
import { arrayCreator } from "./functions/arrayCreator";
import "./App.css";

function App() {
  const [arrayLength, setArrayLength] = useState(undefined);
  const [sortType, setSortType] = useState(undefined);
  const [array, setArray] = useState(undefined);

  const randomizeArray = arrLen => {
    setArrayLength(arrLen);
    setArray(arrayCreator(arrLen));
    console.log(array);
  };

  const sortArray = sortTY => {
    setSortType(sortTY);
    console.log("SORTING ARRAY");
  };

  return (
    <div className="App">
      <NavBar radArrCB={randomizeArray} sortArrCB={sortArray} />
      <h1>ARRAYLENGTH: {arrayLength}</h1>
      <h1>SORTTYPE: {sortType}</h1>
      <p>ARRAY: {array}</p>
      <Visualizer />
    </div>
  );
}

export default App;
