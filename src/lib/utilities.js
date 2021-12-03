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

const binaryToDecimal = (binaryString) => {
  return parseInt(binaryString, 2);
};

module.exports = {
  get3Window,
  sumList,
  binaryToDecimal,
};
