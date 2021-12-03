const day1Input = require("./input");
const {
  countNumIncreases,
  countWindowIncreases,
} = require("../../days/01_Sonar/01_Sonar");

const depthList = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

describe("day 1", () => {
  describe("count increases", () => {
    test("simple", () => {
      expect(countNumIncreases(depthList)).toBe(7);
    });

    test("difficult", () => {
      expect(countNumIncreases(day1Input)).toBe(1602);
    });
  });

  describe("count window increases", () => {
    test("simple", () => {
      expect(countWindowIncreases(depthList)).toBe(5);
    });

    test("difficult", () => {
      expect(countWindowIncreases(day1Input)).toBe(1633);
    });
  });
});
