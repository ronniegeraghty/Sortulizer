/**
 * The default starting state for cocktail sort, sets up sortState for the cocktail sort process.
 */
export const cocktailStartingState = {
  type: "cocktail",
  sort: cocktailSort,
  comparisons: 0,
  traversals: 0,
};

function cocktailSort(sortState) {
  console.log("COCKTAIL SHAKER SORT");
  let { currentIndexes } = sortState;
  //See if the frist starting indexes have been set up
  if (currentIndexes.length === 0) {
    currentIndexes = [0, 1];
    return { ...sortState, currentIndexes: currentIndexes };
  }
  let nextSortState = {
    ...sortState,
    status: "paused",
  };
  return nextSortState;
}
