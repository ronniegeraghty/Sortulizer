const bubbleSort = sortState => {
  let {
    array,
    currentIndexes,
    changed,
    status,
    traversals,
    comparisons,
  } = sortState;
  let newArray = [...array];
  if (currentIndexes.length === 0) {
    currentIndexes = [0, 1];
  }
  // See if we need to make a swap and make it
  if (array[currentIndexes[0]] > array[currentIndexes[1]]) {
    newArray[currentIndexes[0]] = array[currentIndexes[1]];
    newArray[currentIndexes[1]] = array[currentIndexes[0]];
    changed++;
  }
  comparisons++;
  let nextIndexes = currentIndexes;
  let reset = false;

  if (currentIndexes[0] === array.length - 2 - traversals) {
    //If we are at the end of the array set indexs back to beginning
    /* Also minus traversal because after one traversal the largest 
    should be at the end of the array already and there is not need to 
    traverse over it*/
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
    traversals++;
    if (changed === 0) {
      status = "finished";
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
    status: status,
    traversals: traversals,
    comparisons: comparisons,
  };
  return nextSortState;
};

export const bubbleStartingState = {
  type: "bubble",
  sort: bubbleSort,
  changed: 0,
  traversals: 0,
  comparisons: 0,
};
