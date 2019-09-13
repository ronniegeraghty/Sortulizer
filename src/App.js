import React, { useState } from "react";
import NavBar from "./components/navbar";
import Visualizer from "./components/visualizer";
import { arrayCreator } from "./functions/arrayCreator";
import "./App.css";

function App() {
  const [arrayLength, setArrayLength] = useState(undefined); //Remove arrayLength Not needed anymore
  const [sortType, setSortType] = useState(undefined);
  const [array, setArray] = useState(undefined || []);

  const randomizeArray = arrLen => {
    setArrayLength(arrLen); //Remove arrayLength
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
      <Visualizer arr={array} />
    </div>
  );
}

export default App;
