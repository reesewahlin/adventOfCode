const fs = require("fs");

const readFile = (path) => {
  try {
    return fs.readFileSync(path, "utf8");
  } catch (err) {
    return {
      message: "Whoops! Error reading file",
      err,
    };
  }
};

const readAsArray = (path) => {
  const fileData = readFile(path);
  return fileData.split("\n");
};

module.exports = {
  readFile,
  readAsArray,
};
