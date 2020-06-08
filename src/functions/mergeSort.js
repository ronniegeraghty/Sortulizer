const mergeSort = sortState => {
  console.log("MERGE SORTING");
  //Set up variables from inputs
  let { array, currentIndexes, comparisons } = sortState;
  let newArray = [...array];

  //If merge sort just started set the init indexes
  if (currentIndexes.length === 0) {
    currentIndexes = [0, 1];
    let brokenDownArray = breakDownArray(array);
    console.log("brokenDownArray", brokenDownArray);
    console.log(printMultiDimArray(brokenDownArray));
    console.log(makeOneDimArray(brokenDownArray));
    return { ...sortState, currentIndexes: currentIndexes };
  }
  //compare elements
  if (array[currentIndexes[0]] > array[currentIndexes[1]]) {
    newArray[currentIndexes[0]] = array[currentIndexes[1]];
    newArray[currentIndexes[1]] = array[currentIndexes[0]];
  }
  //Made a comparison
  comparisons++;

  let nextIndexes = currentIndexes;
  if (currentIndexes[0] >= array.length - 2) {
    nextIndexes = [0, 1];
  } else {
    nextIndexes[0] += 2;
    nextIndexes[1] += 2;
  }

  let nextSortState = {
    ...sortState,
    array: newArray,
    currentIndexes: nextIndexes,
    comparisons: comparisons,
    status: "finished",
  };
  return nextSortState;
};

export const mergeStartingState = {
  type: "merge",
  sort: mergeSort,
  comparisons: 0,
};

function breakDownArray(array) {
  if (array.length === 1) {
    return array;
  }
  let halfLength = Math.floor(array.length / 2);
  let secondHalf = [...array];
  let firstHalf = secondHalf.splice(0, halfLength);
  return [breakDownArray(firstHalf), breakDownArray(secondHalf)];
}

function printMultiDimArray(array) {
  if (array.length === 1) {
    return "[" + array[0] + "]";
  } else {
    return (
      "[" +
      printMultiDimArray(array[0]) +
      "," +
      printMultiDimArray(array[1]) +
      "]"
    );
  }
}

function makeOneDimArray(array) {
  if (array.length === 1) {
    return array;
  } else {
    return [...makeOneDimArray(array[0]), ...makeOneDimArray(array[1])];
  }
}
