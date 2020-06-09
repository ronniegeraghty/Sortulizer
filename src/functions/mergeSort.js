function mergeSort(sortState) {
  console.log("MERGE SORTING");
  //Set up variables from inputs
  let { array, currentIndexes, comparisons } = sortState;
  let newArray = [...array];
  let nextIndexes = currentIndexes;

  //If merge sort just started set the init indexes
  if (currentIndexes.length === 0) {
    let multiDimArray = breakDownArray(array);
    nextIndexes = getNextComparison(multiDimArray, newArray);
    console.log("mergeSort -> nextIndexes", nextIndexes);

    return {
      ...sortState,
      currentIndexes: nextIndexes,
      multiDimArray: multiDimArray,
    };
  }

  //extract broken down array from sort state
  let { multiDimArray } = sortState;

  //Compare numbers and current indexes
  compare(newArray, multiDimArray, nextIndexes);
  //Made a comparison
  comparisons++;
  // find the next indexes to comapare
  nextIndexes = getNextComparison(multiDimArray, newArray);

  let nextSortState = {
    ...sortState,
    array: newArray,
    currentIndexes: nextIndexes,
    comparisons: comparisons,
    status: "paused",
  };
  return nextSortState;
}

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

function getNextComparison(multiDimArray, oneDimArray) {
  console.log(
    "getNextComparison -> multiDimArray",
    printMultiDimArray(multiDimArray)
  );
  if (
    typeof multiDimArray[0][0] === "number" &&
    typeof multiDimArray[1][0] === "object"
  ) {
    return getNextComparison(multiDimArray[1], oneDimArray);
  } else if (
    typeof multiDimArray[0][0] === "number" &&
    typeof multiDimArray[1][0] === "number"
  ) {
    return [
      oneDimArray.indexOf(multiDimArray[0][0]),
      oneDimArray.indexOf(multiDimArray[1][0]),
    ];
  } else if (typeof multiDimArray[0] === "object") {
    return getNextComparison(multiDimArray[0], oneDimArray);
  }
  return [0, 1, 2];
}

function compare(array, multiDimArray, indexes) {
  console.log("compare -> multiDimArray", multiDimArray);
  if (typeof multiDimArray[0][0] === "object") {
    return compare(array, multiDimArray[0], indexes);
  } else if (
    typeof multiDimArray[0][0] === "number" &&
    typeof multiDimArray[1][0] === "object"
  ) {
    return compare(array, multiDimArray[1], indexes);
  } else if (
    typeof multiDimArray[0][0] === "number" &&
    typeof multiDimArray[1][0] === "number"
  ) {
    //do comparison
  }

  return { newArray: [], newMultiDimArray: [] };
}
