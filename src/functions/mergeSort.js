export const mergeStartingState = {
  type: "merge",
  sort: mergeSort,
  comparisons: 0,
};

/**
 * When called it will do one step of a merge sort
 * @param {object} sortState
 * @returns {object} nextSortState
 */
function mergeSort(sortState) {
  let { array, currentIndexes } = sortState;
  //If currentIndexes are empty then we just started and need to set the first indexes
  if (!currentIndexes.length) {
    let multiDimArray = makeMultiDimArray(array);
    let nextIndexes = getNextIndexes(multiDimArray, array);
    return {
      ...sortState,
      currentIndexes: nextIndexes,
      multiDimArray: multiDimArray,
      status: "paused",
    };
  }
  let { multiDimArray, status } = sortState;
  let nextMultiDimArray = compare(multiDimArray);
  let nextArray = makeOneDimArray(nextMultiDimArray);
  let nextIndexes = [0, 1];
  if (isArrayOfNums(nextMultiDimArray)) {
    //finished sort
    status = "finished";
  } else {
    nextIndexes = getNextIndexes(nextMultiDimArray, nextArray);
  }

  let nextSortState = {
    ...sortState,
    array: nextArray,
    currentIndexes: nextIndexes,
    multiDimArray: nextMultiDimArray,
    status: status,
  };
  return nextSortState;
}

/**
 * returns a multidimensional array by putting the two halfs of the array into their own array
 * @param {[number]} arr
 */
function makeMultiDimArray(arr) {
  if (arr.length === 1) {
    return arr;
  }
  let halfLength = Math.floor(arr.length / 2);
  let secondHalf = [...arr];
  let firstHalf = secondHalf.splice(0, halfLength);
  return [makeMultiDimArray(firstHalf), makeMultiDimArray(secondHalf)];
}

/**
 * Will return a String representation of a MultiDimensional Array
 * @param {*} multiDimArr the MultiDimensional Array
 * @param {boolean} firstCall default to true, only used when calling function recursively
 * @returns {string} string representation of MultiDimensional Array
 */
function printMultiDimArray(multiDimArr, firstCall = true) {
  //Start return string off with a "[" for the start of the array
  let returnString = "[";
  multiDimArr.forEach(element => {
    if (typeof element !== "object") {
      //if the element is not an object it is a number and we should add it to the return string
      returnString = returnString + element + ",";
    } else {
      //element is an object so dive deeper
      returnString = returnString + printMultiDimArray(element, false);
    }
  });
  if (returnString.charAt(returnString.length - 1) === ",") {
    //remove the trainling comma if there is one
    returnString = returnString.substr(0, returnString.length - 1);
  }
  //Add a "]," to close the array and continue
  returnString = returnString + "],";
  if (firstCall) {
    //if this was the first call in the recussion remove the trailing ","
    returnString = returnString.substr(0, returnString.length - 1);
    console.log(returnString);
  }
  return returnString;
}

/**
 * Will return the indexes of the next numbers to be compared
 * @param {[]} multiDimArr the current multiDimArr of the sort
 * @param {[]} oneDimArr the current oneDimArr of the sort
 * @returns {[]} nextIndexes
 */
function getNextIndexes(multiDimArr, oneDimArr) {
  let multiDimArrLen = multiDimArr.length;
  if (multiDimArrLen === 2) {
    if (!isArrayOfNums(multiDimArr[0])) {
      return getNextIndexes(multiDimArr[0], oneDimArr);
    } else if (!isArrayOfNums(multiDimArr[1])) {
      return getNextIndexes(multiDimArr[1], oneDimArr);
    } else if (isArrayOfNums(multiDimArr[0]) && isArrayOfNums(multiDimArr[1])) {
      return [
        oneDimArr.indexOf(multiDimArr[0][0]),
        oneDimArr.indexOf(multiDimArr[1][0]),
      ];
    }
  } else if (multiDimArrLen > 2) {
    return getNextIndexes(
      [multiDimArr[multiDimArrLen - 2], multiDimArr[multiDimArrLen - 1]],
      oneDimArr
    );
  }
  return ["FAILURE"];
}

/**
 * returns the index of the first object in the array, returns -1 if no objects found.
 * @param {[]} arr
 */
function findIndexOfFirstObject(arr) {
  let index = -1;
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === "object") {
      index = i;
      break;
    }
  }
  return index;
}

/**
 * Returns true if the array only contains numbers, else returns false.
 * @param {[]} arr
 */
function isArrayOfNums(arr) {
  let foundNotNum = false;
  for (let element of arr) {
    if (typeof element !== "number") {
      foundNotNum = true;
    }
  }
  //if we found a not num then the array is NOT an array of nums
  return !foundNotNum;
}

/**
 * Returns new multidimensional array where the next merge sort comparison
 * has been done.
 * @param {[]} multiDimArr
 */
function compare(multiDimArr) {
  let multiDimArrLen = multiDimArr.length;
  if (multiDimArrLen === 2) {
    if (!isArrayOfNums(multiDimArr[0])) {
      return [compare(multiDimArr[0]), multiDimArr[1]];
    } else if (!isArrayOfNums(multiDimArr[1])) {
      return [multiDimArr[0], compare(multiDimArr[1])];
    } else if (isArrayOfNums(multiDimArr[0]) && isArrayOfNums(multiDimArr[1])) {
      //Do comparison
      let returnArr = [];
      if (multiDimArr[0][0] < multiDimArr[1][0]) {
        returnArr.push(multiDimArr[0][0]);
        if (multiDimArr[0].length === 1) {
          returnArr.push(...multiDimArr[1]);
        } else {
          returnArr.push([...multiDimArr[0].slice(1)]);
          returnArr.push([...multiDimArr[1]]);
        }
      } else {
        returnArr.push(multiDimArr[1][0]);
        if (multiDimArr[1].length === 1) {
          returnArr.push(...multiDimArr[0]);
        } else {
          returnArr.push([...multiDimArr[0]]);
          returnArr.push([...multiDimArr[1].slice(1)]);
        }
      }
      return returnArr;
    }
  } else if (multiDimArrLen > 2) {
    return [
      ...multiDimArr.slice(0, multiDimArrLen - 2),
      ...compare(multiDimArr.slice(multiDimArrLen - 2, multiDimArrLen)),
    ];
  }
  //Catch no matching pattern
  return ["FAILURE"];
}

/**
 * returns a one dimensional array from a give mutlidimensional array
 * @param {[]} multiDimArr
 */
function makeOneDimArray(multiDimArr) {
  let returnArr = [];
  multiDimArr.forEach(element => {
    if (typeof element !== "object") {
      returnArr.push(element);
    } else {
      returnArr.push(...makeOneDimArray(element));
    }
  });
  return returnArr;
}
