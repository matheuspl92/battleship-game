/* eslint-disable no-undef */
const GameboardFactory = require('../scripts/factories/gameboard');

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

test('attack is a miss', () => {
  expect(testGameboard.receiveAttack(5, 5)).toBe('miss');
});

test('attack is a hit', () => {
  expect(testGameboard.receiveAttack(0, 0)).toBe('hit');
});

test('attack is invalid 1', () => {
  testGameboard.receiveAttack(0, 0);
  expect(testGameboard.validateAttack(0, 0)).toBe(true);
});

test('attack is invalid 2', () => {
  testGameboard.receiveAttack(5, 5);
  expect(testGameboard.validateAttack(5, 5)).toBe(true);
});
