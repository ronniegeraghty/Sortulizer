import { INIT_SORT_STATE } from "./sortConstants";
import { bubbleStartingState } from "./bubbleSort";
import { mergeStartingState } from "./mergeSort";

/**
 * Returns a new sortState to use for the given sort type
 * @param {string} sortType the sort type to use.
 * @returns {}
 */
export default sortType => {
  let newState = {};
  switch (sortType) {
    case "bubble":
      newState = { ...bubbleStartingState };
      break;
    case "merge":
      newState = { ...mergeStartingState };
      break;
    default:
      break;
  }
  return {
    ...INIT_SORT_STATE,
    ...newState,
  };
};
