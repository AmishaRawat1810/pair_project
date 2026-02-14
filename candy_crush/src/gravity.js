import { calculateWeights, weightedPick } from "./fill_candies.js";

export const gravityPull = ({ screenConfig }, candiesToBlast) => {
  const { screen } = screenConfig;

  if (!candiesToBlast || candiesToBlast.length === 0) return;
  const candies = [...new Set(candiesToBlast)];
  let ptr = 0;

  candies.forEach((candy) => {
    const x = candy[1];
    ptr = candy[0];
    for (let y = candy[0]; y >= 0; y--) {
      for (let dy = ptr; dy >= 0; dy--) {
        if (screen[dy][x] !== "  ") {
          ptr = dy;
          const temp = screen[dy][x];
          screen[dy][x] = "  ";
          screen[y][x] = temp;
          break;
        }
      }
      if (screen[y][x] === "  ") {
        calculateWeights(screenConfig.screen, { x, y });
        screen[y][x] = weightedPick();
      }
    }
  });
};
