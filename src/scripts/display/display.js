const returnXY = require('../methods/returnXY');

const display = () => {
  const startScreen = document.getElementById('start-screen');
  const gameScreen = document.getElementById('game-screen');

  const cellClicked = (cellElement) => {
    console.log(cellElement);
  };

  const initGame = (player1, player2, gameboard1, gameboard2) => {
    console.log('game started');

    startScreen.className = 'hidden';
    gameScreen.className = 'visible';

    const player1Title = document.getElementById('player1-title');
    const player2Title = document.getElementById('player2-title');

    player1Title.innerHTML = player1.name;
    player2Title.innerHTML = player2.name;

    const player1Gameboard = document.getElementById('player1-gameboard');
    const player2Gameboard = document.getElementById('player2-gameboard');

    for (let i = 0; i < 100; i += 1) {
      const newCell1 = document.createElement('div');
      newCell1.id = `player1-cell${i}`;
      newCell1.dataset.index = i;
      newCell1.classList.add('cell', `${gameboard1.checkCell(returnXY(i))}`);

      newCell1.addEventListener('click', (e) => {
        cellClicked(e.target);
      });

      const newCell2 = document.createElement('div');
      newCell2.id = `player2-cell${i}`;
      newCell2.className = 'cell';
      newCell2.dataset.index = i;

      newCell2.addEventListener('click', (e) => {
        cellClicked(e.target);
      });

      player1Gameboard.appendChild(newCell1);
      player2Gameboard.appendChild(newCell2);
    }
  };

  return {
    initGame,
  };
};

export default display();
