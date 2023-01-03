/* eslint-disable no-undef */
const returnXY = require('../scripts/methods/returnXY');

test('index 0 returns [0,0]', () => {
  expect(returnXY(0)).toStrictEqual([0, 0]);
});

test('index 99 returns [9,9]', () => {
  expect(returnXY(99)).toStrictEqual([9, 9]);
});

test('index 18 returns [1,8]', () => {
  expect(returnXY(18)).toStrictEqual([1, 8]);
});

test('index 69 returns [6,9]', () => {
  expect(returnXY(69)).toStrictEqual([6, 9]);
});
