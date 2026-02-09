// # blasting logic
// -> check for similar candies in 3 directions, except from direction it was
//   swipped from.
// -> For checking :take two from each direction, check for match.

const findCandies = (target, axis, neighbours, screen) => {
  const candies = [];

  neighbours.forEach((neighbour) => {
    const current = screen[axis][neighbour];
    if (current !== target && candies.length < 3) {
      candies.length = 0;
    } else {
      candies.push(current);
    }
  });

  return candies;
};

const getNeighbourCandies = ({ x, y }, screen) => {
  const target = screen[y][x];
  const xNeighbour = [x - 2, x - 1, x, x + 1, x + 2];
  const yNeighbour = [y - 2, y - 1, y, y + 1, y + 2];

  const xCandies = findCandies(target, y, xNeighbour, screen);
  const yCandies = findCandies(target, x, yNeighbour, screen);
  const candies = [...xCandies, ...yCandies];

  return candies;
};

const blastCandy = (swiped, swiper, screen) => {
  const swipedBlocks = getNeighbourCandies(swiped, screen);
  const swiperBlocks = getNeighbourCandies(swiper, screen);
  return { swipedBlocks, swiperBlocks };
};

blastCandy({ x: 5, y: 6, value: "@" }, { x: 5, y: 7, value: "#" });
