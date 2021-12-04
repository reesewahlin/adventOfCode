const { binaryToDecimal, sumList, get3Window } = require("../../lib/utilities");

describe("utilities", () => {
  describe("binaryToDecimal", () => {
    test("1", () => {
      expect(binaryToDecimal("1")).toBe(1);
    });

    test("01", () => {
      expect(binaryToDecimal("01")).toBe(1);
    });

    test("1010", () => {
      expect(binaryToDecimal("1010")).toBe(10);
    });

    test("1111", () => {
      expect(binaryToDecimal("1111")).toBe(15);
    });

    test("0101010101", () => {
      expect(binaryToDecimal("0101010101")).toBe(341);
    });

    test("0", () => {
      expect(binaryToDecimal("0")).toBe(0);
    });

    test("1111111111111", () => {
      expect(binaryToDecimal("1111111111111")).toBe(8191);
    });
  });

  describe("sumList", () => {
    test("small list", () => {
      expect(sumList([1, 1, 1])).toBe(3);
    });
    test("empty list", () => {
      expect(sumList([])).toBe(0);
    });
    test("large", () => {
      expect(
        sumList([
          1, 9, 2, 3, 4, 6, 1, 23, 451, 4623, 56, 435, 345, 3465, 73, 456, 134,
          12, 34, 2345, 2345, 6, 3457, 345, 763, 456,
        ])
      ).toBe(19850);
    });
  });

  describe("get3Window", () => {
    const myList = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    test("simple", () => {
      expect(JSON.stringify(get3Window(0, myList))).toBe(
        JSON.stringify([0, 1, 2])
      );
    });

    test("mid", () => {
      expect(JSON.stringify(get3Window(5, myList))).toBe(
        JSON.stringify([5, 6, 7])
      );
    });
  });
});
