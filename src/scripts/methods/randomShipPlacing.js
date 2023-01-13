const randomCoord = require('./randomPlay');

const randomShipPlacing = (ship) => {
  const newShip = { ...ship };
  newShip.x = randomCoord();
  newShip.y = randomCoord();
  newShip.orientation = 'horizontal';

  if (Math.random() > 0.5) {
    newShip.orientation = 'vertical';
  }

  return newShip;
};

module.exports = randomShipPlacing;
