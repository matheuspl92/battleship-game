const ShipFactory = require('./ship');

const GameboardFactory = (ships) => {
  // creates a 10 by 10 grid
  const grid = new Array(10);
  for (let i = 0; i < grid.length; i += 1) {
    grid[i] = new Array(10);
  }

  // places the ship object in the vertical or horizontal grid squares between its chosen coord.
  // plus its length.
  const placeShips = (() => {
    for (let i = 0; i < ships.length; i += 1) {
      const newShip = ShipFactory(ships[i].name, ships[i].size);

      if (ships[i].orientation === 'vertical') {
        for (let j = ships[i].y; j < ships[i].y + ships[i].size; j += 1) {
          grid[ships[i].x][j] = newShip;
        }
      } else {
        for (let j = ships[i].x; j < ships[i].x + ships[i].size; j += 1) {
          grid[j][ships[i].y] = newShip;
        }
      }
    }
  })();

  // console.log(grid);

  const shipCount = ships.length;

  const hasShips = () => shipCount > 0;

  const receiveAttack = (x, y) => {
    if (typeof grid[x][y] === 'object') {
      grid[x][y].hit();
      grid[x][y] = 'hit';
      return grid[x][y];
    }
    if (typeof grid[x][y] === 'undefined') {
      grid[x][y] = 'miss';
      return grid[x][y];
    }
  };

  const validateAttack = (x, y) => (typeof grid[x][y] === 'string');

  const checkCell = (coords) => {
    if (typeof grid[coords[1]][coords[0]] === 'object') {
      return 'ship';
    }
    return 'empty';
  };

  return {
    grid,
    hasShips,
    receiveAttack,
    validateAttack,
    checkCell,
  };
};

module.exports = GameboardFactory;
