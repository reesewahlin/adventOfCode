const Direction = {
  FORWARD: "forward",
  DOWN: "down",
  UP: "up",
};

const computePosition = (prevPos, dir, x) => {
  x = dir === Direction.UP ? parseInt(x) * -1 : parseInt(x);

  // move
  let pos = {};
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

const navigate = (course) => {
  let pos = {
    horizontal: 0,
    depth: 0,
  };

  for (let i = 0; i < course.length; i++) {
    const instruction = course[i];
    const [direction, x] = instruction.split(" ");
    pos = computePosition(pos, direction, x);
  }

  return pos;
};

const finalDepth = (course) => {
  const { horizontal, depth } = navigate(course);
  return horizontal * depth;
};

module.exports = {
  navigate,
  finalDepth,
};
