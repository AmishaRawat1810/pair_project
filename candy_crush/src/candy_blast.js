export const findCandies = (targetCandy, axis, neighbours, screen) => {
  const candies = [];
  let nextIdx = neighbours[0];

  const validIndices = neighbours.filter((idx) =>
    // screen axis is undefined then it will become false than break the code
    idx >= 0 && idx < screen[axis]?.length
  );

  for (const idx of validIndices) {
    const current = screen[axis][idx];
    const isMatch = current === targetCandy;

    //checks if it is a match and consecutive index
    if (isMatch && idx === nextIdx) {
      nextIdx = idx + 1;
      candies.push();
    }
    //checks if it isn't a match and candies trio is not found
    if (!isMatch && candies.length < 3) {
      nextIdx = idx - 1;
      candies.length = 0;
    }
  }

  return candies;
};

const getMatchedCandies = (candy, screen) => {
  const [x, y] = [candy.x, candy.y];
  const targetCandy = screen[y][x];
  const xNeighbour = [x - 2, x - 1, x, x + 1, x + 2];
  const yNeighbour = [y - 2, y - 1, y, y + 1, y + 2];

  const xCandies = findCandies(targetCandy, y, xNeighbour, screen);
  const yCandies = findCandies(targetCandy, x, yNeighbour, screen);
  const candies = [...xCandies, ...yCandies];

  return candies;
};

export const blastCandy = ({ swiped, swiper, screen }) => {
  const swipedMatches = getMatchedCandies(swiped, screen);
  const swiperMatches = getMatchedCandies(swiper, screen);

  const swipedBlasts = {
    success: swipedMatches.length > 0,
    candies: swipedMatches,
  };

  const swiperBlasts = {
    success: swiperMatches.length > 0,
    candies: swiperMatches,
  };

  return { swipedBlasts, swiperBlasts };
};
