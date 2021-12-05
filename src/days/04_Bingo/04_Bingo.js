/**
 * Converts bingo input string into a list of boards and a list of input numbers
 * @param input
 * @returns {{numbers, boards: *[]}}
 */
const deserializeInputs = (input) => {
  let numbers;
  let boards = [];

  numbers = input[0].split(",");

  let boardBuilder = [];
  for (let i = 2; i < input.length; i++) {
    const boardRow = input[i];
    if (boardRow === "") {
      boards.push([...boardBuilder]);
      boardBuilder = [];
    } else {
      const boardCols = [];
      const boardNums = boardRow.split(" ");
      for (const boardNum of boardNums) {
        if (boardNum !== "") {
          boardCols.push({
            num: boardNum,
            found: false,
          });
        }
      }
      boardBuilder.push(boardCols);
    }
    // add last board
    if (i === input.length - 1) {
      boards.push([...boardBuilder]);
    }
  }

  return {
    numbers,
    boards,
  };
};

/**
 * Mark a number on a board as seen
 * @param number
 * @param boards
 */
const markNumber = (number, boards) => {
  for (const board of boards) {
    for (const boardRow of board) {
      for (const boardNum of boardRow) {
        if (boardNum.num === number) {
          boardNum.found = true;
        }
      }
    }
  }
};

/**
 * Check if a row has bingo
 * @param board
 * @returns {{board}|boolean}
 */
const checkRow = (board) => {
  for (const boardRow of board) {
    let hasBingo = true;
    for (const boardNum of boardRow) {
      if (!boardNum.found) {
        hasBingo = false;
        break;
      }
    }
    if (hasBingo) {
      // BINGO!
      return { board };
    }
  }
  return false;
};

/**
 * Check if a column has bingo
 * @param board
 * @returns {{board}|boolean}
 */
const checkCol = (board) => {
  for (let i = 0; i < board.length; i++) {
    let hasBingo = true;
    for (const boardRow of board) {
      const colNum = boardRow[i];
      if (!colNum.found) {
        hasBingo = false;
        break;
      }
    }
    if (hasBingo) {
      // BINGO!
      return { board };
    }
  }
  return false;
};

/**
 * Checks if bingo achieved
 * @param boards
 * @returns {{board: *}|boolean}
 */
const checkForBINGO = (boards) => {
  for (const board of boards) {
    let hasRowBingo = checkRow(board);
    if (hasRowBingo) {
      return hasRowBingo;
    }
    let hasColBingo = checkCol(board);
    if (hasColBingo) {
      return hasColBingo;
    }
  }
  return false;
};

/**
 * For each number, marks seen on bingo boards
 * @param numbers
 * @param boards
 * @returns {boolean|{winningNumber: *}}
 */
const playBingo = (numbers, boards) => {
  for (const number of numbers) {
    markNumber(number, boards);
    let bingo = checkForBINGO(boards);
    if (bingo !== false) {
      return {
        ...bingo,
        winningNumber: number,
      };
    }
  }
  return false;
};

/**
 * Calculates sum of non-chosen numbers on winning board
 * @param board
 * @returns {number}
 */
const calculateBingoSum = (board) => {
  let sum = 0;
  for (const boardRow of board) {
    for (const boardNum of boardRow) {
      if (!boardNum.found) {
        sum += parseInt(boardNum.num);
      }
    }
  }
  return sum;
};

/**
 * return product of winning board sum and winning number
 * @param input
 * @returns {boolean|number}
 */
const bingo = (input) => {
  const { numbers, boards } = deserializeInputs(input);

  let bingo = playBingo(numbers, boards);
  if (bingo) {
    const sum = calculateBingoSum(bingo.board);
    return sum * bingo.winningNumber;
  }

  return false;
};

module.exports = {
  bingo,
};
