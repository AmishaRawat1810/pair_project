export const findCandies = (
  targetCandy,
  targetIdx,
  validIndices,
  candyLine,
) => {
  const matches = validIndices.map((idx) => candyLine[idx] === targetCandy);
  const centerPos = validIndices.indexOf(targetIdx);

  // If the center not present , no matches
  if (centerPos === -1 || !matches[centerPos]) return [];

  let start = centerPos;
  let end = centerPos;

  // iterate center to left/bottom one by one
  while (start > 0 && matches[start - 1]) start--;
  // iterate center to right/top one by one
  while (end < matches.length - 1 && matches[end + 1]) end++;

  const result = end - start + 1 >= 3 ? validIndices.slice(start, end + 1) : [];
  return result;
};

export const getCandyLine = (center, step, candyLine) => {
  const sequence = Array.from(
    { length: step * 2 + 1 },
    (_, i) => center - step + i,
  );
  return sequence.filter((idx) => idx >= 0 && idx < candyLine.length);
};

export const getMatchedCandies = (candy, screen) => {
  const [x, y] = [candy.x, candy.y];
  const targetCandy = screen[y][x];
  const step = 2;
  const axis = [
    { targetIdx: x, line: screen[y], isHorizontal: true },
    { targetIdx: y, line: screen.map((row) => row[x]), isHorizontal: false },
  ];

  const combined = axis.flatMap(({ targetIdx, line, isHorizontal }) => {
    const validIndices = getCandyLine(targetIdx, step, line);
    const matches = findCandies(targetCandy, targetIdx, validIndices, line);
    return matches.map((idx) => isHorizontal ? [y, idx] : [idx, x]);
  });

  const candies = combined.filter((candy, coord) =>
    coord === combined.findIndex((c) => c[0] === candy[0] && c[1] === candy[1])
  );

  return candies;
};

export const blastCandy = ({ swiped, swiper, screen }) => {
  const [swipedMatches, swiperMatches] = [swiped, swiper].map((c) =>
    getMatchedCandies(c, screen)
  );

  const result = {
    swipedBlasts: {
      success: swipedMatches.length > 0,
      candies: swipedMatches,
    },
    swiperBlasts: {
      success: swiperMatches.length > 0,
      candies: swiperMatches,
    },
    allMatches: [...swipedMatches, ...swiperMatches],
  };

  return result;
};
