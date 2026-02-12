// contract, take screen , and candies and fill the grid with the candies.

// const randomNoBetween = (start = 0, end = 1) => {
//   return start + Math.floor(Math.random() * (end - start));
// };

export const weightedPick = (
  candies = ["🍬", "🍭", "🍩", "🍪"],
  weights = [1, 1, 1, 1],
  randomFn = (sum) => Math.random() * sum,
) => {
  const sum = weights.reduce((acc, weight) => acc + weight);
  const randomNum = randomFn(sum);
  let currSum = 0;

  for (let i = 0; i < candies.length; i++) {
    currSum += weights[i];
    if (randomNum < currSum) {
      return candies[i];
    }
  }
};

export const filterPairs = (
  { screen, height, width },
  candies,
) => {
  for (let r = 1; r < height - 1; r++) {
    for (let c = 1; c < width - 1; c++) {
      const target = screen[r][c];
      if (target === screen[r - 1][c] && target === screen[r + 1][c]) {
        const remainingCandies = candies.filter((candy) => candy !== target);
        screen[r][c] = weightedPick(remainingCandies, [1, 1, 1]);
      }
      if (screen[r][c - 1] === target && target === screen[r][c + 1]) {
        const remainingCandies = candies.filter((candy) => candy !== target);
        screen[r][c] = weightedPick(remainingCandies, [1, 1, 1]);
      }
    }
  }
};

export const fillCandies = (
  {
    screenConfig,
    candies = ["🍬", "🍭", "🍩", "🍪"],
    randomFn = (sum) => Math.random() * sum,
  },
) => {
  const weights = [1, 1, 1, 1];
  for (let y = 0; y < screenConfig.height; y++) {
    for (let x = 0; x < screenConfig.width; x++) {
      const randomCandy = weightedPick(candies, weights, randomFn);
      

      screenConfig.screen[y][x] = randomCandy;
    }
  }
  filterPairs(screenConfig, candies);
};
