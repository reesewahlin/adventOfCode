/**
 * Counts the number of times the depths increase
 * @param depthList list of integers representing depths
 * @returns {number} number of increases
 */
const countNumIncreases = (depthList) => {
  let lastSeenDepth = depthList[0];
  let countIncreases = 0;
  for (let i = 1; i < depthList.length; i++) {
    const depthReading = depthList[i];
    countIncreases += depthReading > lastSeenDepth;
    lastSeenDepth = depthReading;
  }
  return countIncreases;
};

/**
 * Extracts a window of 3 from a list
 * @param startIndex index to start extraction
 * @param list to extract from
 * @returns {*}
 */
const get3Window = (startIndex, list) => {
  return list.slice(startIndex, startIndex + 3);
};

/**
 * Sums integers in a list
 * @param list of integers
 * @returns {number} sum
 */
const sumList = (list) => {
  return list.reduce((prev, curr) => prev + curr);
};

/**
 * Counts the number of times the sum of measurements in a 3-depth
 * sliding window increases
 * @param depthList list of integers
 * @returns {number} count of increases
 */
const countWindowIncreases = (depthList) => {
  let lastSum = sumList(get3Window(0, depthList));
  let countIncreases = 0;
  for (let i = 1; i < depthList.length - 2; i++) {
    const sum = sumList(get3Window(i, depthList));
    countIncreases += sum > lastSum;
    lastSum = sum;
  }
  return countIncreases;
};

module.exports = { countNumIncreases, countWindowIncreases };
