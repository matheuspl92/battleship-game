/* eslint-disable no-undef */
const returnXY = require('../scripts/methods/returnXY');

test('index 0 returns [0,0]', () => {
  expect(returnXY(0)).toStrictEqual([0, 0]);
});

test('index 10 returns [0,1]', () => {
  expect(returnXY(10)).toStrictEqual([0, 1]);
});

test('index 20 returns [0,2]', () => {
  expect(returnXY(20)).toStrictEqual([0, 2]);
});

test('index 30 returns [0,3]', () => {
  expect(returnXY(30)).toStrictEqual([0, 3]);
});

test('index 34 returns [4,3]', () => {
  expect(returnXY(34)).toStrictEqual([4, 3]);
});

test('index 69 returns [9,6]', () => {
  expect(returnXY(69)).toStrictEqual([9, 6]);
});

test('index 77 returns [7,7]', () => {
  expect(returnXY(77)).toStrictEqual([7, 7]);
});
