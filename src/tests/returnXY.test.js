/* eslint-disable no-undef */
const returnXY = require('../scripts/methods/returnXY');

test('index 0 returns [0,0]', () => {
  expect(returnXY(0)).toStrictEqual([0, 0]);
});

test('index 10 returns [0,0]', () => {
  expect(returnXY(10)).toStrictEqual([1, 0]);
});

test('index 20 returns [0,0]', () => {
  expect(returnXY(20)).toStrictEqual([2, 0]);
});

test('index 30 returns [0,0]', () => {
  expect(returnXY(30)).toStrictEqual([3, 0]);
});
