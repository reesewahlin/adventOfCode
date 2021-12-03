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

module.exports = countNumIncreases;
