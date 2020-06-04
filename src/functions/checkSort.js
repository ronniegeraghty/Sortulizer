import { arrayCreator } from "./arrayCreator";

export default sortState => {
  console.log(JSON.stringify(sortState));
  let { array, currentIndexes, status } = sortState;
  //compare elements
  if (array[currentIndexes[0]] < array[currentIndexes[1]]) {
    console.log("GOOD SORT");
  } else {
    console.log("BAD SORT");
  }

  let nextIndexes = currentIndexes;

  //check if we are at the end of array
  if (currentIndexes[0] === array.length - 2) {
    //If we are at the end of the array set indexs back to beginning
    nextIndexes = [0, 1];
    status = "checked";
  } else {
    // If not at end of array increment indexes by 1
    nextIndexes[0]++;
    nextIndexes[1]++;
  }

  return {
    ...sortState,
    status: status,
  };
};
