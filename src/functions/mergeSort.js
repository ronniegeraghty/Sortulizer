export const mergeStartingState = {
  type: "merge",
  sort: mergeSort,
  comparisons: 0,
};

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
      status: "paused",
    };
  }

  //extract broken down array from sort state
  let { multiDimArray } = sortState;
  //Compare numbers and current indexes
  let newMultiDimArray = compare(newArray, multiDimArray, nextIndexes);
  console.log("Compare Final Output: ", printMultiDimArray(newMultiDimArray));
  //Made a comparison
  comparisons++;
  newArray = makeOneDimArray(newMultiDimArray);
  // find the next indexes to comapare
  nextIndexes = getNextComparison(newMultiDimArray, newArray);

  let nextSortState = {
    ...sortState,
    array: newArray,
    currentIndexes: nextIndexes,
    multiDimArray: newMultiDimArray,
    comparisons: comparisons,
    status: "paused",
  };
  return nextSortState;
}

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
  if (typeof array[0] === "number") {
    return "[" + array + "]";
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
  if (typeof array[0] === "number") {
    return array;
  } else {
    return [...makeOneDimArray(array[0]), ...makeOneDimArray(array[1])];
  }
}

function getNextComparison(multiDimArray, oneDimArray) {
  // console.log(
  //   "getNextComparison -> multiDimArray",
  //   printMultiDimArray(multiDimArray)
  // );
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
  //console.log("compare -> multiDimArray", multiDimArray);
  if (typeof multiDimArray[0][0] === "object") {
    return [compare(array, multiDimArray[0], indexes), multiDimArray[1]];
  } else if (
    typeof multiDimArray[0][0] === "number" &&
    typeof multiDimArray[1][0] === "object"
  ) {
    return [multiDimArray[0], compare(array, multiDimArray[1], indexes)];
  } else if (
    typeof multiDimArray[0][0] === "number" &&
    typeof multiDimArray[1][0] === "number"
  ) {
    console.log("compare -> multiDimArray", multiDimArray);
    let resultArr = [];
    if (multiDimArray[0][0] < multiDimArray[1][0]) {
      resultArr.push(multiDimArray[0][0]);
      multiDimArray[0].splice(1).length &&
        resultArr.push(multiDimArray[0].splice[1]);
      if (multiDimArray[1].length === 1) {
        resultArr.push(multiDimArray[1][0]);
      } else {
        resultArr.push(multiDimArray[1]);
      }
    } else {
      resultArr.push(multiDimArray[1][0]);
      if (multiDimArray[0].length === 1) {
        resultArr.push(multiDimArray[0][0]);
      } else {
        resultArr.push(multiDimArray[0]);
      }
      multiDimArray[1].splice(1).length &&
        resultArr.push(multiDimArray[1].splice(1));
    }
    return resultArr;
  }

  return "Dingus!!!";
}
