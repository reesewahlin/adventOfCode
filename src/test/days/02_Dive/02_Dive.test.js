const { readAsArray } = require("../../../lib/file");
const path = require("path");
const { finalDepth } = require("../../../days/02_Dive/02_Dive");

const course = [
  "forward 5",
  "down 5",
  "forward 8",
  "up 3",
  "down 8",
  "forward 2",
];

describe("day 2", () => {
  describe("depth multiplier", () => {
    test("simple", () => {
      expect(finalDepth(course)).toBe(150);
    });

    test("difficult", () => {
      const fileData = readAsArray(path.resolve(__dirname, "./input.txt"));
      expect(finalDepth(fileData)).toBe(2070300);
    });
  });

  describe("depth multiplier with aim", () => {
    test("simple", () => {
      expect(finalDepth(course, true)).toBe(900);
    });

    test("difficult", () => {
      const fileData = readAsArray(path.resolve(__dirname, "./input.txt"));
      expect(finalDepth(fileData, true)).toBe(2078985210);
    });
  });
});
