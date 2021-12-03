const { binaryToDecimal } = require("../../lib/utilities");

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
});
