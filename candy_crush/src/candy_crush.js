import { swipeCandy } from "./candy_swipe.js";
import { fillCandies } from "./fill_candies.js";
import { createScreen, drawOnScreen } from "./grid.js";

export const play = () => {
  const screenConfig = createScreen({ height: 10, width: 10, char: " " });
  fillCandies({ screenConfig });
  drawOnScreen({ screenConfig });
  const swiped = { x: 3, y: 0, value: screenConfig.screen[0][3] };
  const swiper = { x: 4, y: 0, value: screenConfig.screen[0][4] };
  console.log("-".repeat(40));
  const result = swipeCandy({ swiped, swiper, screen: screenConfig.screen });
  console.log("-".repeat(40), { result });
  drawOnScreen({ screenConfig });
};
