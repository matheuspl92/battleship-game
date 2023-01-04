import hasGameEnded from '../../battleship';

const returnXY = require('../methods/returnXY');

const display = () => {
  const startScreen = document.getElementById('start-screen');
  const gameScreen = document.getElementById('game-screen');

  const updatePlayerGameboard = (cellData) => {
    const cellElement = document.getElementById(`player1-cell${cellData.x + cellData.y * 10}`);
    cellElement.classList.add(cellData.value);
  };

  const cellClicked = (cellElement, gameboard1, gameboard2, player2) => {
    const coord = returnXY(cellElement.dataset.index);
    if (!gameboard2.validateAttack(coord[1], coord[0])) {
      cellElement.classList.add(gameboard2.receiveAttack(coord[1], coord[0]));

      if (hasGameEnded(gameboard1, gameboard2)) return alert('player 1 has won');

      updatePlayerGameboard(player2.takeTurn(gameboard1));

      if (hasGameEnded(gameboard1, gameboard2)) return alert('player 2 has won');
    }
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

      const newCell2 = document.createElement('div');
      newCell2.id = `player2-cell${i}`;
      newCell2.className = 'cell';
      newCell2.dataset.index = i;

      newCell2.addEventListener('click', (e) => {
        cellClicked(e.target, gameboard1, gameboard2, player2);
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
