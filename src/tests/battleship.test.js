/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
// const battleship = require('../battleship');

const GameboardFactory = require('../scripts/factories/gameboard');

const shipsArray = [
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
];

test('game has not ended', () => {
  document.body.innerHTML = '<form></form>';

  const { default: hasGameEnded } = require('../battleship');

  const gameboard1 = GameboardFactory(shipsArray);
  const gameboard2 = GameboardFactory(shipsArray);
  expect(hasGameEnded(gameboard1, gameboard2)).toBe(false);
});

test('player 1 won the game', () => {
  document.body.innerHTML = '<form></form>';

  const { default: hasGameEnded } = require('../battleship');

  const gameboard1 = GameboardFactory(shipsArray);
  const gameboard2 = GameboardFactory([]);
  expect(hasGameEnded(gameboard1, gameboard2)).toBe(1);
});

test('player 2 won the game', () => {
  document.body.innerHTML = '<form></form>';

  const { default: hasGameEnded } = require('../battleship');

  const gameboard1 = GameboardFactory([]);
  const gameboard2 = GameboardFactory(shipsArray);
  expect(hasGameEnded(gameboard1, gameboard2)).toBe(2);
});
