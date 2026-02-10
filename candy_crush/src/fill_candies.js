// contract, take screen , and candies and fill the grid with the candies.

export const weightedPick = (candies, weights,  radnomFn = (sum) => Math.random() * sum) => {
  const sum = weights.reduce((acc, weight) => acc + weight);
  const randomNum = radnomFn(sum);
  let currSum = 0;

  for (let i = 0; i < candies.length; i++) {
    currSum += weights[i];
    if (randomNum < currSum) {
      return candies[i];
    }
  }
};

export const fillCandies = (
  {
  screenConfig,
  candies = ["🍬", "🍭", "🍩", "🍪"],
  randomFn = (sum) => Math.random() * sum
}
) => {
  const weights = [1, 1, 1, 1];
  for (let y = 0; y < screenConfig.height; y++) {
    for (let x = 0; x < screenConfig.width; x++) {
      const randomCandy = weightedPick(candies, weights, randomFn)
      screenConfig.screen[y][x] = randomCandy; 
    }
  }
};
