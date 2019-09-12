import React, { useState } from "react";
import NavBar from "./components/navbar";
import Visualizer from "./components/visualizer";
import "./App.css";

function App() {
  const [arrayLength, setArrayLength] = useState(undefined);
  const [sortType, setSortType] = useState(undefined);

  const randomizeArray = arrLen => {
    setArrayLength(arrLen);
  };

  const sortArray = sortTY => {
    setSortType(sortTY);
    console.log("SORTING ARRAY");
  };

  return (
    <div className="App">
      <NavBar radArrCB={randomizeArray} sortArrCB={sortArray} />
      <Visualizer />
      <h1>ARRAYLENGTH: {arrayLength}</h1>
      <h1>SORTTYPE: {sortType}</h1>
    </div>
  );
}

export default App;
