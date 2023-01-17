const randomCoord = require('./randomPlay');

const randomShipPlacing = (ship) => {
  const x = randomCoord();
  const y = randomCoord();
  let orientation = 'horizontal';

  if (Math.random() > 0.5) {
    orientation = 'vertical';
  }

  return {
    name: ship.name,
    size: ship.size,
    x,
    y,
    orientation,
  };
};

module.exports = randomShipPlacing;
