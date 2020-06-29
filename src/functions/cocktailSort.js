/**
 * The default starting state for cocktail sort, sets up sortState for the cocktail sort process.
 */
export const cocktailStartingState = {
  type: "cocktail",
  sort: cocktailSort,
  comparisons: 0,
  traversals: 0,
  direction: "right",
  changed: 0,
};

function cocktailSort(sortState) {
  // console.log("COCKTAIL SHAKER SORT");
  let { currentIndexes } = sortState;
  //See if the frist starting indexes have not been set up
  if (currentIndexes.length === 0) {
    currentIndexes = [0, 1];
    return { ...sortState, currentIndexes: currentIndexes };
  }

  let {
    array,
    direction,
    comparisons,
    traversals,
    status,
    changed,
  } = sortState;

  //Compare values at current indexes
  let { newArray, madeChange } = compare(array, currentIndexes);
  comparisons++;
  if (madeChange) {
    changed++;
  }

  //Get next indexes and new directions
  let { nextIndexes, newDirection, newTraversals } = getNextIndexes(
    array,
    currentIndexes,
    direction,
    traversals
  );

  //If we finished a traversal and didn't make a change then were done.
  if (traversals !== newTraversals) {
    if (changed === 0) {
      status = "finished";
      nextIndexes = [0, 1];
    } else {
      changed = 0;
    }
  }

  let nextSortState = {
    ...sortState,
    status: status,
    array: newArray,
    comparisons: comparisons,
    currentIndexes: nextIndexes,
    direction: newDirection,
    traversals: newTraversals,
    changed: changed,
  };
  return nextSortState;
}

/**
 * Compares the values in arr at indexes in indexes
 * and returns a new array with the values sorted
 * @param {number[]} arr
 * @param {number[]} indexes
 */
function compare(arr, indexes) {
  let newArr = [...arr];
  let madeChange = false;
  if (arr[indexes[0]] > arr[indexes[1]]) {
    newArr[indexes[0]] = arr[indexes[1]];
    newArr[indexes[1]] = arr[indexes[0]];
    madeChange = true;
  }
  return { newArray: newArr, madeChange: madeChange };
}

/**
 * Returns the next indexes to compare and the new direction
 * @param {number[]} arr
 * @param {number[]} indexes
 * @param {string} dir
 * @param {number} traversals
 */
function getNextIndexes(arr, indexes, dir, traversals) {
  if (
    dir === "right" &&
    indexes[0] >= arr.length - 2 - Math.floor(traversals / 2)
  ) {
    //If were moving right and at the end change dir
    dir = "left";
    traversals++;
  } else if (dir === "left" && indexes[0] <= 0 + Math.floor(traversals / 2)) {
    //If were moving left and at the end change dir
    dir = "right";
    traversals++;
  }
  if (dir === "right") {
    indexes[0]++;
    indexes[1]++;
  } else if (dir === "left") {
    indexes[0]--;
    indexes[1]--;
  }
  return { nextIndexes: indexes, newDirection: dir, newTraversals: traversals };
}
