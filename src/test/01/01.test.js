const countNumIncreases = require("../../days/01/01");
const day1Input = require("./input");

describe("count increases", () => {
  test("simple", () => {
    const depthList = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

    expect(countNumIncreases(depthList)).toBe(7);
  });

  test("difficult", () => {
    const depthList = day1Input;

    expect(countNumIncreases(depthList)).toBe(1602);
  });
});
