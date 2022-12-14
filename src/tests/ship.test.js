/* eslint-disable no-undef */
const ShipFactory = require('../scripts/factories/ship');

const LENGTH = 3;

const testShip = ShipFactory('test', LENGTH);

test('ship is hit one time', () => {
  expect(testShip.hit()).toBe(1);
});

test('ship is hit two times', () => {
  expect(testShip.hit()).toBe(2);
});

test('ship floats', () => {
  expect(testShip.isSunk()).toBe(false);
});

test('ship is sunk', () => {
  testShip.hit();
  expect(testShip.isSunk()).toBe(true);
});
