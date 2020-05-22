export const bubbleSort = sortState => {
  let { array, currentIndexes, changed, finished } = sortState;
  let newArray = [...array];

  // See if we need to make a swap and make it
  if (array[currentIndexes[0]] > array[currentIndexes[1]]) {
    newArray[currentIndexes[0]] = array[currentIndexes[1]];
    newArray[currentIndexes[1]] = array[currentIndexes[0]];
    changed++;
  }
  let nextIndexes = currentIndexes;
  let reset = false;

  if (currentIndexes[0] === array.length - 2) {
    //If we are at the end of the array set indexs back to beginning
    nextIndexes = [0, 1];
    reset = true;
  } else {
    // If not at end of array increment indexes by 1
    nextIndexes[0]++;
    nextIndexes[1]++;
  }

  // if we reset (we are at the end of the array) and we have made
  // no new changes then the array is sorted and we are finished.
  if (reset) {
    if (changed === 0) {
      finished = true;
    } else {
      changed = 0;
    }
  }

  //create the next Sort State
  let nextSortState = {
    ...sortState,
    array: newArray,
    currentIndexes: nextIndexes,
    changed: changed,
    finished: finished,
  };
  return nextSortState;
};

export const bubbleStartingState = {
  type: "bubble",
  currentIndexes: [0, 1],
  finished: false,
  sort: bubbleSort,
  changed: 0,
};
