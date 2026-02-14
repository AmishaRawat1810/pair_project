// contract, take screen , and candies and fill the grid with the candies.

import { CANDIES } from "./global_var.js";

// const randomNoBetween = (start = 0, end = 1) => {
//   return start + Math.floor(Math.random() * (end - start));
// };

export const weightedPick = (
  randomFn = (sum) => Math.random() * sum,
  candies = CANDIES,
) => {
  const candyKeys = Object.keys(candies);
  const sum = candyKeys.reduce((acc, candy) => acc + candies[candy].weight, 0);
  const randomNum = randomFn(sum);
  let currSum = 0;

  for (const candyKey of candyKeys) {
    currSum += candies[candyKey].weight;
    if (randomNum < currSum) {
      return candyKey;
    }
  }
};

export const filterPairs = (
  { screen, height, width },
  candies = CANDIES,
) => {
  const candyTypes = Object.keys(candies);
  for (let r = 1; r < height - 1; r++) {
    for (let c = 1; c < width - 1; c++) {
      const target = screen[r][c];

      if (target === screen[r - 1][c] && target === screen[r + 1][c]) {
        const remainingCandies = candyTypes.filter((candy) => candy !== target);
        screen[r][c] = weightedPick(remainingCandies, [1, 1, 1]);
      }

      if (screen[r][c - 1] === target && target === screen[r][c + 1]) {
        const remainingCandies = candyTypes.filter((candy) => candy !== target);
        screen[r][c] = weightedPick(remainingCandies, [1, 1, 1]);
      }
    }
  }
};

export const calculateWeights = (screen, { x, y }, candies = CANDIES) => {
  if (screen[y][x - 1] !== undefined) {
    if (screen[y][x - 1] === screen[y][x - 2]) {
      const candyKey = screen[y][x - 1];
      candies[candyKey].weight = 0;
    }
  }

  if (y >= 2) {
    if (screen[y - 1][x] === screen[y - 2][x]) {
      const candyKey = screen[y - 1][x];
      candies[candyKey].weight = 0;
    }
  }
};

export const resetWeights = (candies = CANDIES) => {
  for (const key in candies) {
    candies[key].weight = 1;
  }
};

export const fillCandies = (
  {
    screenConfig,
    candies = CANDIES,
    randomFn = (sum) => Math.random() * sum,
  },
) => {
  for (let y = 0; y < screenConfig.height; y++) {
    for (let x = 0; x < screenConfig.width; x++) {
      calculateWeights(screenConfig.screen, { x, y });
      const randomCandy = weightedPick(randomFn, candies);
      screenConfig.screen[y][x] = randomCandy;
      resetWeights(candies);
    }
  }
  // console.log(screenConfig);
  // filterPairs(screenConfig, candies);
};
