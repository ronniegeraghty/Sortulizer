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
  console.log("MERGE SORTING");
  let { array, currentIndexes } = sortState;
  //If currentIndexes are empty then we just started and need to set the first indexes
  if (!currentIndexes.length) {
    let multiDimArray = makeMultiDimArray(array);
    printMultiDimArray(multiDimArray);
    currentIndexes = getNextIndexes(multiDimArray, array);
  }

  let nextSortState = {
    ...sortState,
    status: "paused",
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

function getNextIndexes(multiDimArr, oneDimArr) {
  if (multiDimArr.length === 2) {
    let firstObjectIndex = findIndexOfFirstObject(multiDimArr);
    if(firstObjectIndex !== -1){
      
    }
  }
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
