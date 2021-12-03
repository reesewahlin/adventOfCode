const Direction = {
  FORWARD: "forward",
  DOWN: "down",
  UP: "up",
};

/**
 * move the sub
 * @param prevPos
 * @param dir
 * @param x
 * @returns {*&{depth: *}}
 */
const computePosition = (prevPos, dir, x) => {
  x = dir === Direction.UP ? parseInt(x) * -1 : parseInt(x);

  // move
  let pos;
  if (dir === Direction.FORWARD) {
    pos = {
      ...prevPos,
      horizontal: prevPos.horizontal + x,
    };
  } else {
    pos = {
      ...prevPos,
      depth: prevPos.depth + x,
    };
  }

  return pos;
};

/**
 * new navigation instructions with aim mechanic
 * @param prevPos
 * @param dir
 * @param x
 * @returns {*&{aim: number}}
 */
const computePositionWithAim = (prevPos, dir, x) => {
  x = parseInt(x);
  let pos;

  // orient
  if (dir === Direction.UP) {
    pos = {
      ...prevPos,
      aim: prevPos.aim - x,
    };
  } else if (dir === Direction.DOWN) {
    pos = {
      ...prevPos,
      aim: prevPos.aim + x,
    };
  }

  // move
  if (dir === Direction.FORWARD) {
    pos = {
      ...prevPos,
      horizontal: prevPos.horizontal + x,
      depth: prevPos.depth + prevPos.aim * x,
    };
  }

  return pos;
};

/**
 * move the sub
 * @param course
 * @param withAim
 * @returns {{horizontal: number, depth: number, aim: number}}
 */
const navigate = (course, withAim) => {
  let pos = {
    horizontal: 0,
    depth: 0,
    aim: 0,
  };

  for (let i = 0; i < course.length; i++) {
    const instruction = course[i];
    const [direction, x] = instruction.split(" ");
    pos = withAim
      ? computePositionWithAim(pos, direction, x)
      : computePosition(pos, direction, x);
  }

  return pos;
};

/**
 * multiply depth by horizontal
 * @param course
 * @param withAim
 * @returns {number}
 */
const finalDepth = (course, withAim) => {
  const { horizontal, depth } = navigate(course, withAim);
  return horizontal * depth;
};

module.exports = {
  navigate,
  finalDepth,
};
