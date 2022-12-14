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
        console.log(`${ship.x},${i}`);
        grid[ship.x][i] = newShip;
      }
    } else {
      console.log('horizontal');
      // places the string 'blocked' on the neighbors cells

      // places the ship object on the grid cells
      for (let i = ship.x; i < ship.x + ship.size; i += 1) {
        console.log(`${i},${ship.y}`);
        grid[i][ship.y] = newShip;
      }
    }
  };

  const validatePosition = (ship) => {
    if (ship.orientation === 'vertical') {
      for (let i = ship.y; i < ship.y + ship.size; i += 1) {
        console.log(grid[ship.x][i]);
        if ((typeof grid[ship.x][i] === 'undefined') || (typeof grid[ship.x][i] === 'object') || (grid[ship.x][i] === 'blocked')) return false;
      }
    } else {
      for (let i = ship.x; i < ship.x + ship.size; i += 1) {
        console.log(grid[ship.y][i]);
        if ((typeof grid[ship.y][i] === 'undefined') || (typeof grid[ship.y][i] === 'object') || (grid[ship.y][i] === 'blocked')) return false;
      }
    }
    // console.log('CLICK');
    /* for (let i = ship.y - 1; i <= ship.y + 1; i += 1) {
      for (let j = ship.x - 1; j <= ship.x + 1; j += 1) {
        // console.log(`${j}, ${i}`);
        // console.log(grid[i][j]);

        if (typeof grid[i][j] === 'object') return false;
      }
    } */
    // placeShip(ship);
    return true;
  };

  // console.log(grid);

  const hasShips = () => shipCellCount > 0;

  const receiveAttack = (x, y) => {
    if (typeof grid[x][y] === 'object') {
      grid[x][y].hit();
      grid[x][y] = 'hit';
      shipCellCount -= 1;
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
    if (grid[coords[1]][coords[0]] === 'blocked') {
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
