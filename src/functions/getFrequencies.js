export const getFrequencies = sortState => {
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

export const getScaledFrequencies = sortState => {
  // const C0_FREQ = 16.35;
  // const C1_FREQ = 32.7;
  const C2_FREQ = 65.41;
  const C3_FREQ = 130.81;
  const C4_FREQ = 261.63;
  const { array, currentIndexes } = sortState;
  const frequencies = [];
  let startNote;
  if (array.length <= 25) {
    startNote = C4_FREQ;
  } else if (array.length <= 40) {
    startNote = C3_FREQ;
  } else if (array.length <= 50) {
    startNote = C2_FREQ;
  } else {
    return getFrequencies(sortState);
  }
  currentIndexes.forEach(index => {
    frequencies.push(
      startNote *
        getNoter(array[index]) *
        Math.pow(2, Math.floor(array[index] / 7))
    );
  });
  return frequencies;
};

function getNoter(num) {
  switch (num % 7) {
    case 0:
      return 1;
    case 1:
      return 9 / 8;
    case 2:
      return 5 / 4;
    case 3:
      return 4 / 3;
    case 4:
      return 3 / 2;
    case 5:
      return 5 / 3;
    case 6:
      return 15 / 8;
    default:
      return undefined;
  }
}
