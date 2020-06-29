import React, { useState, useEffect } from "react";
import WindowFocusHandler from "./components/WindowFocusHandler";
import NavBar from "./components/NavBar";
import Visualizer from "./components/Visualizer";
import Footer from "./components/Footer";
import Sound from "./components/Sound";
import arrayCreator from "./functions/arrayCreator";
import switchSortType from "./functions/switchSortType";
import checkSort from "./functions/checkSort";
import calcTimeInterval from "./functions/calcTimeInterval";
import { getScaledFrequencies } from "./functions/getFrequencies";
import "./App.css";

//Implement Statefull context
const SortStateContext = React.createContext([{}, () => {}]);

const App = () => {
  const [sortState, setSortState] = useState({
    ...switchSortType("cocktail"),
    array: arrayCreator(20),
  });
  const [sortSpeed, setSortSpeed] = useState(100);

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
      array: prevState.array,
      ...switchSortType(sortType),
    }));
  }

  /**
   * Changes the sort speed
   * @param {int} sortSpeed
   */
  function setSpeed(speed) {
    setSortSpeed(speed);
  }

  /**
   * Changes the sortState when the page is focused or unfocused.
   * @param {boolean} focus
   */
  function setFocus(focus) {
    if (focus) {
      if (sortState.prevStatus === undefined) {
        setSortState(prevState => ({
          ...prevState,
          status: "inactive",
        }));
      } else {
        setSortState(prevState => ({
          ...prevState,
          status: prevState.prevStatus,
        }));
      }
    } else {
      setSortState(prevState => ({
        ...prevState,
        status: "unfocused",
        prevStatus: prevState.status,
      }));
    }
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
    } else if (sortState.status === "paused") {
      setSortState(prevState => ({
        ...prevState,
        status: "active",
      }));
    } else if (sortState.status === "inactive") {
      setSortState(prevState => ({
        ...prevState,
        ...switchSortType(prevState.type),
        status: "active",
      }));
    }
  }

  // Acts as the sort loop based on sortState.statuse
  useEffect(() => {
    const timeout = setTimeout(() => {
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
    }, calcTimeInterval(sortSpeed));
    return () => clearTimeout(timeout);
  }, [sortState, sortSpeed]);

  return (
    <div className="App">
      <SortStateContext.Provider value={[sortState, setSortState]}>
        <WindowFocusHandler setFocusCB={setFocus} />
        <NavBar
          radArrCB={createRandomArray}
          sortTypeCB={setSortType}
          sortButtonCB={sortButton}
          arrayLength={sortState.array.length}
        />
        <Sound
          status={sortState.status}
          soundFreqs={getScaledFrequencies(sortState)}
        />
        <Visualizer sortSpeedCB={setSpeed} />
        <Footer />
      </SortStateContext.Provider>
    </div>
  );
};

export default App;
export { SortStateContext };
