/* eslint-disable no-undef */
const GameboardFactory = require('../scripts/factories/gameboard');
const PlayerFactory = require('../scripts/factories/player');

const testPlayer = PlayerFactory('test');
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

test('player has name', () => {
  expect(testPlayer.name).toBe('test');
});

test('computer can make a valid move', () => {
  expect(['hit', 'miss']).toContain(testPlayer.takeTurn(testGameboard));
});

test('player can make a hit move', () => {
  expect(testPlayer.takeTurn(testGameboard, 0, 0)).toBe('hit');
});

test('player can make a miss move', () => {
  expect(testPlayer.takeTurn(testGameboard, 5, 5)).toBe('miss');
});
