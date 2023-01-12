// This function receives a 0-99 index and returns a XY coord.

const returnXY = (index) => {
  let x = 0;
  let y = 0;

  x = index % 10;
  y = Math.floor(index / 10);

  return [x, y];
};

module.exports = returnXY;
