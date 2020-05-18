export const bubbleSort = (array, currentIndex) => {
  let returnArray = array;
  //Compare two incides
  if (returnArray[currentIndex] > returnArray[currentIndex + 1]) {
    console.log("CURRENTINDEX: " + returnArray[currentIndex]);
    console.log("NEXTINDEX: " + returnArray[currentIndex + 1]);
    let temp = returnArray[currentIndex];
    console.log(temp);
    returnArray[currentIndex] = returnArray[currentIndex + 1];
    returnArray[currentIndex + 1] = temp;
  }
  console.log("RETURN ARRAY: " + returnArray);
  currentIndex++;

  // RETURN OBJECT
  return {
    arrary: returnArray,
    currentIndex: currentIndex,
    finished: true,
  };
};
