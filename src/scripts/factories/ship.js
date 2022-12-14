const ShipFactory = (name, length) => {
  const shipName = name;
  const shipLength = length;
  let hits = 0;

  const hit = () => {
    hits += 1;
    return hits;
  };

  const isSunk = () => hits >= shipLength;

  return {
    name: shipName,
    length: shipLength,
    hits,
    hit,
    isSunk,
  };
};

module.exports = ShipFactory;
