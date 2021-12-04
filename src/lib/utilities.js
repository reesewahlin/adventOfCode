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
  if (!list || list.length === 0) {
    return 0;
  }
  return list.reduce((prev, curr) => prev + curr);
};

/**
 * Convert binary string to decimal number
 * @param binaryString
 * @returns {number}
 */
const binaryToDecimal = (binaryString) => {
  return parseInt(binaryString, 2);
};

module.exports = {
  get3Window,
  sumList,
  binaryToDecimal,
};
