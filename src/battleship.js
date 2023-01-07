import './styles/reset.css';
import './styles/common.css';
import './styles/modal.css';
import './styles/start-screen.css';
import './styles/game-screen.css';
// eslint-disable-next-line import/no-cycle
import display from './scripts/display/display';

const Player = require('./scripts/factories/player');
const Gameboard = require('./scripts/factories/gameboard');

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

// Modal Initialization

const closeBtns = [...document.querySelectorAll('.close')];
closeBtns.forEach((btn) => {
  btn.onclick = function () {
    const modal = btn.closest('.modal');
    modal.classList.add('hidden');
  };
});

window.onclick = function (event) {
  if (event.target.className === 'modal') {
    event.target.classList.add('hidden');
  }
};

const startForm = document.getElementsByTagName('form')[0];

startForm.addEventListener('submit', () => {
  const formData = new FormData(startForm);
  if (formData.get('playerName') !== '') { player1.name = formData.get('playerName'); }
  display.initGame(player1, player2, gameboard1, gameboard2);
});

function hasGameEnded(gameboard1, gameboard2) {
  if (!gameboard1.hasShips()) return 2;
  if (!gameboard2.hasShips()) return 1;
  return false;
}

export default hasGameEnded;
