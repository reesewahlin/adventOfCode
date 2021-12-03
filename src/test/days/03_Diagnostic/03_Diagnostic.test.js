const {
  powerConsumption,
} = require("../../../days/03_Diagnostic/03_Diagnostic");
const { readAsArray } = require("../../../lib/file");
const path = require("path");
const diagnostic = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];

describe("day 3", () => {
  describe("power consumption", () => {
    test("simple", () => {
      expect(powerConsumption(diagnostic)).toBe(198);
    });
    test("difficult", () => {
      const fileData = readAsArray(path.resolve(__dirname, "./input.txt"));
      expect(powerConsumption(fileData)).toBe(4139586);
    });
  });
});
