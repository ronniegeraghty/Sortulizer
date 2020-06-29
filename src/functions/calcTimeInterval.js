/**
 * Calculates the time to wait between sort steps in milliseconds based on the input, which should be a number from 1-100.
 * @param {number} x A value from the sort speed slider between 1-100
 * @returns {number} The time to wait between sorts in milliseconds.
 */
export default x => {
  return (1505 * x * x) / 15642 - (34445 * x) / 1738 + 7975250 / 7821;
};
