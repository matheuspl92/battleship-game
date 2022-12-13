const randomCoord = require('./randomPlay');

const PlayerFactory = (playerName) => {
  const name = playerName;

  const takeTurn = (gameboard, x, y) => {
    // check if is a computer move and makes a random play, if not
    // makes the player move
    if (x === undefined && y === undefined) {
      let newX = randomCoord();
      let newY = randomCoord();

      while (gameboard.validateAttack(newX, newY)) {
        newX = randomCoord();
        newY = randomCoord();
      }

      return gameboard.receiveAttack(newX, newY);
    }
    return gameboard.receiveAttack(x, y);
  };

  return {
    name,
    takeTurn,
  };
};

module.exports = PlayerFactory;
