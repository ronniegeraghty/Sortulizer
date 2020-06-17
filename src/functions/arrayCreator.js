/**
 * Returns an array with every int between 0 and arrayLength - 1,
 * at random indexes
 * @param {int} arrayLength
 * @returns {int[]} an array with every int between 0 and arrayLength - 1,
 * at random indexes
 */
export default arrayLength => {
  return shuffle([...Array(arrayLength).keys()]); //returns random order
  // return [...Array(arrayLength).keys()];       //returns in order
};

/**
 * Takes an array and randomly shuffles the elements positions around and returns the new array.
 * @param {[numbers]} array
 * @returns {[numbers]} shuffled array
 */
function shuffle(array) {
  var currentIndexes = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndexes) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndexes);
    currentIndexes -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndexes];
    array[currentIndexes] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
