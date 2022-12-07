const ShipFactory = require('./ship');

const GameboardFactory = (ships) => {
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

  return {
    grid,
    hasShips,
  };
};

module.exports = GameboardFactory;
