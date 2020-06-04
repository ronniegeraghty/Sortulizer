import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Visualizer from "./components/Visualizer";
import Footer from "./components/Footer";
import arrayCreator from "./sort-functions/arrayCreator";
import switchSortType from "./sort-functions/switchSortType";
import checkSort from "./sort-functions/checkSort";
import "./App.css";

const timeBetweenComparisons = 0;

const App = () => {
  const [sortState, setSortState] = useState({
    ...switchSortType("bubble"),
    array: arrayCreator(20),
  });

  /**
   * Create a randomly shuffeled array and put it in the sortState
   * @param {int} arrLen
   */
  function createRandomArray(arrLen) {
    setSortState(prevState => ({
      ...switchSortType(prevState.type),
      array: arrayCreator(arrLen),
    }));
  }

  /**
   * Changes the sort type in the sortState
   * @param {string} sortType
   */
  function setSortType(sortType) {
    setSortState(prevState => ({
      ...prevState,
      ...switchSortType(sortType),
    }));
  }

  /**
   * Change the sortState.status based on current status when sort button is pressed.
   * @param {string} sortType
   */
  function sortButton() {
    if (sortState.status === "active") {
      setSortState(prevState => ({
        ...prevState,
        status: "paused",
      }));
    } else if (
      sortState.status === "paused" ||
      sortState.status === "inactive"
    ) {
      setSortState(prevState => ({
        ...prevState,
        status: "active",
      }));
    }
  }

  // Acts as the sort loop based on sortState.statuse
  useEffect(() => {
    setTimeout(() => {
      if (sortState.status === "active") {
        setSortState(prevState => ({
          ...prevState,
          ...prevState.sort(prevState),
        }));
      } else if (sortState.status === "finished") {
        setSortState(prevState => ({
          ...prevState,
          ...checkSort(prevState),
        }));
      } else if (sortState.status === "checked") {
        setSortState(prevState => ({
          ...switchSortType(prevState.type),
          array: prevState.array,
          traversals: prevState.traversals,
          comparisons: prevState.comparisons,
        }));
      }
    }, timeBetweenComparisons);
  }, [sortState]);

  return (
    <div className="App">
      <NavBar
        radArrCB={createRandomArray}
        sortTypeCB={setSortType}
        sortButtonCB={sortButton}
        sortStatus={sortState.status}
      />
      <Visualizer
        array={sortState.array}
        currentIndexes={sortState.currentIndexes}
        traversals={sortState.traversals}
        comparisons={sortState.comparisons}
      />
      <Footer />
    </div>
  );
};

export default App;
