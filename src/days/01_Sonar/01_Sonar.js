const { sumList, get3Window } = require("../../lib/utilities");

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
