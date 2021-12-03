const { binaryToDecimal } = require("../../lib/utilities");
const Bits = {
  ZERO: "0",
  ONE: "1",
};

const defaultCounts = {
  0: 0,
  1: 0,
};

const computeCounts = (diagnostic) => {
  const binaryCounts = {};
  for (const reading of diagnostic) {
    const bits = reading.split("");
    for (let i = 0; i < bits.length; i++) {
      const bitAtDigit = bits[i]; // 0 or 1
      const digitCounts = binaryCounts[i] || { ...defaultCounts }; // counts

      digitCounts[bitAtDigit] = digitCounts[bitAtDigit] + 1;

      binaryCounts[i] = digitCounts;
    }
  }
  return binaryCounts;
};

const computeConsumption = (binaryCounts) => {
  let consumption = {
    gamma: "",
    epsilon: "",
  };
  for (const digit of Object.keys(binaryCounts)) {
    const digitCounts = binaryCounts[digit];
    if (digitCounts[Bits.ZERO] > digitCounts[Bits.ONE]) {
      consumption = {
        gamma: consumption.gamma + Bits.ZERO,
        epsilon: consumption.epsilon + Bits.ONE,
      };
    } else {
      consumption = {
        gamma: consumption.gamma + Bits.ONE,
        epsilon: consumption.epsilon + Bits.ZERO,
      };
    }
  }
  return consumption;
};

const powerConsumption = (diagnostic) => {
  const counts = computeCounts(diagnostic);
  const consumption = computeConsumption(counts);
  return (
    binaryToDecimal(consumption.gamma) * binaryToDecimal(consumption.epsilon)
  );
};

module.exports = {
  powerConsumption,
};
