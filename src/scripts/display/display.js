import hasGameEnded from '../../battleship';
import GameboardFactory from '../factories/gameboard';
import randomShipPlacing from '../methods/randomShipPlacing';

const returnXY = require('../methods/returnXY');

const display = () => {
  const startScreen = document.getElementById('start-screen');
  const placeShipsScreen = document.getElementById('place-ships-screen');
  const gameScreen = document.getElementById('game-screen');

  const updatePlayerGameboard = (cellData) => {
    const cellElement = document.getElementById(`player1-cell${cellData.x + cellData.y * 10}`);
    cellElement.classList.add(cellData.value);
  };

  const showWinner = (winner) => {
    const winnerText = document.getElementById('winner');
    winnerText.innerHTML = winner;

    const modal = document.getElementById('modalOne');
    modal.classList.remove('hidden');
  };

  const cellClicked = (cellElement, gameboard1, gameboard2, player2, player1) => {
    const coord = returnXY(cellElement.dataset.index);
    if (gameboard2.validateAttack(coord[0], coord[1])) {
      cellElement.classList.add(gameboard2.receiveAttack(coord[0], coord[1]));

      if (hasGameEnded(gameboard1, gameboard2)) showWinner(`${player1.name} has WON!`);

      updatePlayerGameboard(player2.takeTurn(gameboard1));

      if (hasGameEnded(gameboard1, gameboard2)) showWinner(`${player1.name} has WON!`);
    }
  };

  const initGame = (player1, player2, gameboard1, gameboard2) => {
    placeShipsScreen.className = 'hidden';
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
        cellClicked(e.target, gameboard1, gameboard2, player2, player1);
      });

      player1Gameboard.appendChild(newCell1);
      player2Gameboard.appendChild(newCell2);
    }
  };

  const drawShips = (gameboard) => {
    const templateGameboard = document.getElementById('template-gameboard');

    const cells = templateGameboard.children;

    for (let i = 0; i < cells.length; i += 1) {
      const { index } = cells[i].dataset;
      cells[i].className = '';
      cells[i].classList.add('cell', `${gameboard.checkCell(returnXY(index))}`);
    }
  };

  const placeShips = (player1, player2) => {
    const messageBox = document.getElementById('message-box-1');
    let orientation = 'horizontal';
    window.addEventListener('keydown', (e) => {
      if (e.isComposing || e.key === 'r') {
        if (orientation === 'horizontal') {
          orientation = 'vertical';
          messageBox.innerHTML = 'Place ship! Press R to rotate ship (Vertical)';
        } else {
          orientation = 'horizontal';
          messageBox.innerHTML = 'Place ship! Press R to rotate ship (Horizontal)';
        }
      }
    });

    const ships = [{
      name: 'Carrier', size: 5,
    },
    {
      name: 'Battleship', size: 4,
    },
    {
      name: 'Cruiser', size: 3,
    },
    {
      name: 'Submarine', size: 3,
    },
    {
      name: 'Destroyer', size: 2,
    }];

    const shipsAI = ships.slice();

    startScreen.className = 'hidden';
    placeShipsScreen.className = 'visible';

    messageBox.innerHTML = 'Place ship! Press R to rotate ship (Horizontal)';

    const templateGameboard = document.getElementById('template-gameboard');

    const gameboard1 = GameboardFactory();

    for (let i = 0; i < 100; i += 1) {
      const newCell1 = document.createElement('div');
      newCell1.id = `template-cell${i}`;
      newCell1.dataset.index = i;
      newCell1.classList.add('cell');

      newCell1.addEventListener('mouseover', (e) => {
      });

      // eslint-disable-next-line no-loop-func
      newCell1.addEventListener('click', (e) => {
        const position = returnXY(e.target.dataset.index);
        ships[0].x = position.shift();
        ships[0].y = position.shift();
        ships[0].orientation = orientation;
        if (gameboard1.validatePosition(ships[0])) {
          gameboard1.placeShip(ships.shift());
          drawShips(gameboard1);
        }
        if (ships.length === 0) {
          const gameboard2 = GameboardFactory();
          while (shipsAI.length > 0) {
            const newShip = randomShipPlacing(shipsAI[0]);
            if (gameboard2.validatePosition(newShip)) {
              gameboard2.placeShip(newShip);
              shipsAI.shift();
            }
          }
          initGame(player1, player2, gameboard1, gameboard2);
        }
      });

      templateGameboard.appendChild(newCell1);
    }
  };

  return {
    initGame,
    placeShips,
  };
};

export default display();
