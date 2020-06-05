export default sortState => {
  const freqMax = 100;
  const freqMin = 3000;
  const { array, currentIndexes } = sortState;
  const frequencies = [];
  const map = (value, x1, y1, x2, y2) =>
    ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
  currentIndexes.forEach(index => {
    frequencies.push(map(array[index], 0, array.length - 1, freqMin, freqMax));
  });
  return frequencies;
};
