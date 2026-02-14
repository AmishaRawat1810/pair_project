import { CANDIES } from "./global_var.js";
import { removeBlastedCandies } from "./candy_blast.js";
import { gravityPull } from "./gravity.js";

// contract, take screen , and candies and fill the grid with the candies.
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

// export const filterPairs = (
//   { screen, height, width },
//   candies = CANDIES,
// ) => {
//   const candyTypes = Object.keys(candies);

//   for (let r = 1; r < height - 1; r++) {
//     for (let c = 1; c < width - 1; c++) {
//       const target = screen[r][c];

//       if (target === screen[r - 1][c] && target === screen[r + 1][c]) {
//         const remainingCandies = candyTypes.filter((candy) => candy !== target);
//         screen[r][c] = weightedPick(remainingCandies, [1, 1, 1]);
//       }

//       if (screen[r][c - 1] === target && target === screen[r][c + 1]) {
//         const remainingCandies = candyTypes.filter((candy) => candy !== target);
//         screen[r][c] = weightedPick(remainingCandies, [1, 1, 1]);
//       }
//     }
//   }
// };

export const calculateWeights = (screen, { x, y }, candies = CANDIES) => {
  // vertical check
  if (x > 1 && screen[y][x - 1] !== "  ") {
    if (screen[y][x - 1] === screen[y][x - 2]) {
      const candyKey = screen[y][x - 1];
      candies[candyKey].weight = 0;
    }
  }

  //horizontal check
  if (y > 1 && screen[y - 1][x] !== "  ") {
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

/*
So, for findAllMatches in the board I plan to :
 -> iterate through each candy -> for it
 -> if there is no candies then move to next.
 If there is candy -> removeBlastedCandies -> gravity -> continue with findAllMatches
*/
const addCandies = (screen, x, y, matches, isHorizontal, width, height) => {
  const [dx, dy] = isHorizontal ? [1, 0] : [0, 1];
  const withinRange = isHorizontal ? x + 2 < width : y + 2 < height;

  if (!withinRange) return;

  const candy1 = screen[y][x];
  const candy2 = screen[y + dy][x + dx];
  const candy3 = screen[y + dy * 2][x + dx * 2];

  if (candy1 !== "  " && candy1 === candy2 && candy2 === candy3) {
    matches.add(`${x},${y}`);
    matches.add(`${x + dx},${y + dy}`);
    matches.add(`${x + dx * 2},${y + dy * 2}`);
  }
};

const findAllMatches = (screenConfig) => {
  const { screen, width, height } = screenConfig;
  const matches = new Set();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      addCandies(screen, x, y, matches, true, width, height); //for horizontal
      addCandies(screen, x, y, matches, false, width, height); ////for vertical
    }
  }

  return [...matches].map((candy) => candy.split(",").map(Number));
};

export const filterCandies = ({ screenConfig }) => {
  while (true) {
    const matches = findAllMatches(screenConfig);
    if (matches.length === 0) break;

    removeBlastedCandies(matches, screenConfig.screen);
    gravityPull({ screenConfig }, matches);
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
