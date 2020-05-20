export const bubbleSort = (array, currentIndex) => {
  let tempArr = [...array];
  let changed = 0;
  if (array[currentIndex] > array[currentIndex + 1]) {
    tempArr[currentIndex] = array[currentIndex + 1];
    tempArr[currentIndex + 1] = array[currentIndex];
    changed = 1;
  }
  let nextIndex;
  let reset = false;
  if (currentIndex === array.length - 2) {
    nextIndex = 0;
    reset = true;
  } else {
    nextIndex = currentIndex + 1;
  }
  return [tempArr, nextIndex, changed, reset];
};
