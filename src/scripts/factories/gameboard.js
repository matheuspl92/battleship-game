const ShipFactory = require('./ship');

const GameboardFactory = (ships) => {
  // creates a 10 by 10 grid
  const grid = new Array(10);
  for (let i = 0; i < grid.length; i += 1) {
    grid[i] = new Array(10);
    for (let j = 0; j < grid[i].length; j += 1) {
      grid[i][j] = 'empty';
    }
  }

  let shipCellCount = 0;

  // places the ship object in the vertical or horizontal grid squares between its chosen coord.
  // plus its length.
  const placeShip = (ship) => {
    shipCellCount += ship.size;
    const newShip = ShipFactory(ship.name, ship.size);

    if (ship.orientation === 'vertical') {
      // places the string 'blocked' on the neighbors cells
      for (let i = ship.y; i < ship.y + ship.size; i += 1) {
        for (let j = ship.y - 1; j < ship.y + ship.size + 1; j += 1) {
          for (let k = ship.x - 1; k <= ship.x + 1; k += 1) {
            if (j >= 0 && j <= 9 && k >= 0 && k <= 9) grid[k][j] = 'blocked';
          }
        }
      }
      // places the ship object on the grid cells
      for (let i = ship.y; i < ship.y + ship.size; i += 1) {
        grid[ship.x][i] = newShip;
      }
    } else {
      // places the string 'blocked' on the neighbors cells
      for (let i = ship.x - 1; i < ship.x + ship.size + 1; i += 1) {
        for (let j = ship.y - 1; j <= ship.y + 1; j += 1) {
          if (i >= 0 && i <= 9 && j >= 0 && j <= 9) grid[i][j] = 'blocked';
        }
      }
      // places the ship object on the grid cells
      for (let i = ship.x; i < ship.x + ship.size; i += 1) {
        grid[i][ship.y] = newShip;
      }
    }
  };

  const validatePosition = (ship) => {
    if (ship.orientation === 'vertical') {
      for (let i = ship.y; i < ship.y + ship.size; i += 1) {
        if (typeof grid[ship.x][i] === 'undefined') return false;
        if ((typeof grid[ship.x][i] === 'object') || (grid[ship.x][i] === 'blocked')) return false;
      }
    } else {
      for (let i = ship.x; i < ship.x + ship.size; i += 1) {
        if (i > 9) return false;
        if ((typeof grid[i][ship.y] === 'object') || (grid[i][ship.y] === 'blocked')) return false;
      }
    }
    return true;
  };

  const hasShips = () => shipCellCount > 0;

  const receiveAttack = (x, y) => {
    if (typeof grid[x][y] === 'object') {
      grid[x][y].hit();
      grid[x][y] = 'hit';
      shipCellCount -= 1;
      return grid[x][y];
    }
    if (grid[x][y] === 'blocked' || grid[x][y] === 'empty') {
      grid[x][y] = 'miss';
      return grid[x][y];
    }
  };

  const validateAttack = (x, y) => !(grid[x][y] === 'miss');

  const checkCell = (coords) => {
    if (typeof grid[coords[0]][coords[1]] === 'object') {
      return 'ship';
    }
    if (grid[coords[0]][coords[1]] === 'blocked') {
      return 'blocked';
    }
    return 'empty';
  };

  return {
    grid,
    hasShips,
    receiveAttack,
    validateAttack,
    checkCell,
    placeShip,
    validatePosition,
  };
};

module.exports = GameboardFactory;
