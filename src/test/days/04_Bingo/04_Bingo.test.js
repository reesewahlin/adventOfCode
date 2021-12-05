const { readFileToArray } = require("../../../lib/file");
const path = require("path");
const { bingo } = require("../../../days/04_Bingo/04_Bingo");

describe("day4", () => {
  describe("bingo", () => {
    test("simple", () => {
      const bingoBoardInput = readFileToArray(
        path.resolve(__dirname, "./simpleInput.txt")
      );
      expect(bingo(bingoBoardInput)).toBe(4512);
    });
    test("difficult", () => {
      const bingoBoardInput = readFileToArray(
        path.resolve(__dirname, "./input.txt")
      );
      expect(bingo(bingoBoardInput)).toBe(63424);
    });
  });
});
