/* eslint-disable no-undef */
const GameboardFactory = require('../scripts/gameboard');

const testGameboard = GameboardFactory([
  {
    name: 'Carrier', size: 5, x: 0, y: 0, orientation: 'vertical',
  },
  {
    name: 'Battleship', size: 4, x: 2, y: 0, orientation: 'horizontal',
  },
  {
    name: 'Cruiser', size: 3, x: 9, y: 0, orientation: 'vertical',
  },
  {
    name: 'Submarine', size: 3, x: 0, y: 9, orientation: 'horizontal',
  },
  {
    name: 'Destroyer', size: 2, x: 8, y: 9, orientation: 'horizontal',
  },
]);

test('gameboard has at least one ship', () => {
  expect(testGameboard.hasShips()).toBe(true);
});
