import { fillCandies } from "./fill_candies.js";
import { createScreen, drawOnScreen } from "./grid.js";

export const play = () => {
  const screenConfig = createScreen({height : 10, width : 10, char : " "});
  fillCandies({screenConfig});
  drawOnScreen({screenConfig}); 
};
