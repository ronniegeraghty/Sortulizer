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
    //console.log("mergeSort -> nextIndexes", nextIndexes);

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
  let newMultiDimArray = compare(multiDimArray);

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

function printMultiDimArray(array, firstCall = true) {
  let printString = "[";
  array.forEach(element => {
    if (typeof element !== "object") {
      printString = printString + element + ",";
    } else if (typeof element === "object") {
      printString = printString + printMultiDimArray(element, false);
    }
  });
  if (printString.charAt(printString.length - 1) === ",") {
    printString = printString.substring(0, printString.length - 1);
  }
  printString = printString + "],";
  if (firstCall) {
    printString = printString.substring(0, printString.length - 1);
  }
  return printString;
}

function makeOneDimArray(array) {
  if (typeof array[0] !== "object") {
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

function compare(multiDimArray) {
  let firstObjectIndex = findIndexOfFirstObject(multiDimArray);
  if (firstObjectIndex !== -1) {
    //dive into object
  } else {
    // I have array of numbers so array should be sorted
    console.log("DONE");
  }
  // if (multiDimArray.length === 3) {
  //   //sorting two halfs
  //   return ["Array Length 3"];
  // } else if (multiDimArray.length === 2) {
  //   //start sorting next to halfs
  //   if (!isArrayOfNums(multiDimArray[0])) {
  //     //dive deeper
  //     return [compare(multiDimArray[0]), multiDimArray[1]];
  //   } else if (!isArrayOfNums(multiDimArray[1])) {
  //     //dive deeper
  //     return [multiDimArray[0], compare(multiDimArray[1])];
  //   } else if (
  //     isArrayOfNums(multiDimArray[0]) &&
  //     isArrayOfNums(multiDimArray[1])
  //   ) {
  //     //compare
  //     let resultArray = [];
  //     if (multiDimArray[0][0] < multiDimArray[1][0]) {
  //       resultArray.push(multiDimArray[0][0]);
  //       if (multiDimArray[0].length === 1) {
  //         //array only had one value so push the rest of the other array
  //         resultArray.push(...multiDimArray[1]);
  //       } else {
  //         // push what's left of the other two arrays as arrays
  //         resultArray.push([...multiDimArray[0].splice(1)]);
  //         resultArray.push([...multiDimArray[1]]);
  //       }
  //     } else {
  //       resultArray.push(multiDimArray[1][0]);
  //       if (multiDimArray[1].length === 1) {
  //         //array only had one value so push the rest of the other array
  //         resultArray.push(...multiDimArray[0]);
  //       } else {
  //         // push what's left of the other two arrays as arrays
  //         resultArray.push([...multiDimArray[0]]);
  //         resultArray.push([...multiDimArray[1].splice(1)]);
  //       }
  //     }
  //     return resultArray;
  //   }
  // }

  return ["Dingus"];
}

function isArrayOfNums(array) {
  if (typeof array === "object") {
    let foundObject = false;
    array.forEach(element => {
      if (typeof element === "object") {
        foundObject = true;
      }
    });
    if (typeof array[0] !== "object") {
      return true;
    }
  }
  return false;
}

function findIndexOfFirstObject(array) {
  let index = -1;
  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] === "object") {
      index = i;
      break;
    }
  }
  return index;
}
