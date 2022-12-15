import './styles/reset.css';
import './styles/common.css';
import './styles/start-screen.css';

const Player = require('./scripts/factories/player');
const Gameboard = require('./scripts/factories/gameboard');
const display = require('./scripts/display/display');

const player1 = Player('Player');
const player2 = Player('Computer');

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

const gameboard1 = Gameboard(shipsArray);
const gameboard2 = Gameboard(shipsArray);

display.init(player1, player2, gameboard1, gameboard2);
