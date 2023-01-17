import './styles/reset.css';
import './styles/common.css';
import './styles/modal.css';
import './styles/start-screen.css';
import './styles/place-ships-screen.css';
import './styles/game-screen.css';
// eslint-disable-next-line import/no-cycle
import display from './scripts/display/display';

const Player = require('./scripts/factories/player');

const player1 = Player('Player');
const player2 = Player('Computer');

const playAgainBtn = document.getElementById('play-again');
playAgainBtn.addEventListener('click', () => {
  location.reload();
});

const startForm = document.getElementsByTagName('form')[0];

startForm.addEventListener('submit', () => {
  const formData = new FormData(startForm);
  if (formData.get('playerName') !== '') { player1.name = formData.get('playerName'); }

  display.placeShips(player1, player2);
});

function hasGameEnded(gameboard1, gameboard2) {
  if (!gameboard1.hasShips()) return 2;
  if (!gameboard2.hasShips()) return 1;
  return false;
}

export default hasGameEnded;
