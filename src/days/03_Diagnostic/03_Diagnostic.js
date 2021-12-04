const { binaryToDecimal } = require("../../lib/utilities");
const Bits = {
  ZERO: "0",
  ONE: "1",
};

const Criteria = {
  OXYGEN: "oxygen",
  CO2: "co2",
};

const defaultDigitCounts = {
  0: 0,
  1: 0,
  lists: {
    0: [],
    1: [],
  },
};

/**
 * Compute counts of digits (0,1)
 * @param diagnostic
 * @returns {{}} object where each field is the digit space and the corresponding object is the count of 0 and 1 at that space
 */
const computeCounts = (diagnostic) => {
  const binaryCounts = {};
  for (const reading of diagnostic) {
    const bits = reading.split("");
    for (let digit = 0; digit < bits.length; digit++) {
      const bitAtDigit = bits[digit]; // 0 or 1

      let digitCounts;
      if (binaryCounts[digit]) {
        digitCounts = binaryCounts[digit];
      } else {
        // instantiate (deep copy object)
        digitCounts = { ...defaultDigitCounts }; // counts
        digitCounts.lists = { ...defaultDigitCounts.lists };
      }

      digitCounts[bitAtDigit] = digitCounts[bitAtDigit] + 1;
      digitCounts.lists[bitAtDigit] =
        digitCounts.lists[bitAtDigit].concat(reading);

      binaryCounts[digit] = digitCounts;
    }
  }
  return binaryCounts;
};

/**
 * Constructs the consumption object containing gamma and epsilon as binary strings
 * @param binaryCounts
 * @returns {{epsilon: string, gamma: string}}
 */
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

/**
 * Computes the power consumption of submarine given diagnostic
 * @param diagnostic list of binary readings
 * @returns {number} power consumption
 */
const powerConsumption = (diagnostic) => {
  const counts = computeCounts(diagnostic);
  const consumption = computeConsumption(counts);
  return (
    binaryToDecimal(consumption.gamma) * binaryToDecimal(consumption.epsilon)
  );
};

/**
 * Recursive function
 * Detects the correct bit condition, then recurse on the readings meeting that bit condition
 * @param digit
 * @param diagnostic
 * @param criteria
 * @returns {*}
 */
const narrowLifeSupport = (digit, diagnostic, criteria) => {
  // base case
  if (diagnostic.length === 1) {
    return diagnostic[0];
  }

  let counts = computeCounts(diagnostic);
  const digitCounts = counts[digit];

  let comparator;
  // use different comparator for ox and co2
  if (criteria === Criteria.OXYGEN) {
    comparator = digitCounts[Bits.ONE] >= digitCounts[Bits.ZERO];
  } else {
    comparator = digitCounts[Bits.ONE] < digitCounts[Bits.ZERO];
  }

  let narrowedDiagnostic;
  // select the subset list
  if (comparator) {
    narrowedDiagnostic = digitCounts.lists[Bits.ONE];
  } else {
    narrowedDiagnostic = digitCounts.lists[Bits.ZERO];
  }

  // recursive case
  return narrowLifeSupport(digit + 1, narrowedDiagnostic, criteria);
};

/**
 * Compute life support = ox * co2
 * @param diagnostic
 * @returns {number}
 */
const lifeSupport = (diagnostic) => {
  const oxygen = narrowLifeSupport(0, diagnostic, Criteria.OXYGEN);
  const co2 = narrowLifeSupport(0, diagnostic, Criteria.CO2);
  return binaryToDecimal(oxygen) * binaryToDecimal(co2);
};

module.exports = {
  powerConsumption,
  lifeSupport,
};
