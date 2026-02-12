import { swipeCandy } from "./candy_swipe.js";
import { fillCandies } from "./fill_candies.js";
import { createScreen, drawOnScreen } from "./grid.js";
import { parseInput } from "./parse_Input.js";

export const play = () => {
  const screenConfig = createScreen({ height: 9, width: 9, char: " " });
  fillCandies({ screenConfig });
  drawOnScreen({ screenConfig });
  while(true) {
    const candy1 = prompt("Enter candy 1 coor : "); 
    const candy2 = prompt("Enter candy 2 coor : "); 
    const swiped = parseInput(candy1, screenConfig.screen); 
    const swiper = parseInput(candy2, screenConfig.screen);
    console.log("-".repeat(40));
    const result = swipeCandy({ swiped, swiper, screen: screenConfig.screen });
    // console.log("-".repeat(40), { result });
    
    drawOnScreen({ screenConfig });
  }
};
