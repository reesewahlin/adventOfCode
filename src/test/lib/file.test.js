const { readFile, readFileToArray } = require("../../lib/file");
const path = require("path");
describe("file.js", () => {
  describe("readFile", () => {
    test("reads from file", () => {
      expect(
        readFile(path.resolve(__dirname, "./resources/file.input.txt"))
      ).toBe("test");
    });
    test("error contains filepath", () => {
      expect(
        JSON.stringify(
          readFile(path.resolve(__dirname, "./nonexistentFile.txt"))
        ).includes("adventOfCode/src/test/lib/nonexistentFile.txt")
      ).toBe(true);
    });
  });

  describe("readFileToArray", () => {
    test("reads from file and converts to array", () => {
      expect(
        JSON.stringify(
          readFileToArray(
            path.resolve(__dirname, "./resources/fileArray.input.txt")
          )
        )
      ).toBe(JSON.stringify(["test", "123"]));
    });
  });
});
