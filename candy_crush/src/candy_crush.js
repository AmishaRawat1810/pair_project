import { swipeCandy, validateLiberty } from "./candy_swipe.js";
import { gravityPull } from "./gravity.js";
import { fillCandies, filterCandies } from "./fill_candies.js";
import { createScreen, drawOnScreen, getCellAtPosition } from "./grid.js";
import { startTerminal } from "./terminal.js";

const clearMessage = (state) => {
  clearTimeout(state.messageTimeout);
  state.messageTimeout = undefined;
  state.message = "";
};

const showMessage = (state, newMessage, render) => {
  clearMessage(state);
  state.message = newMessage;
  render();
  state.messageTimeout = setTimeout(() => {
    state.message = "";
    state.messageTimeout = undefined;
    render();
  }, 1500);
};

export const play = async () => {
  const screenConfig = createScreen({ height: 9, width: 9, char: " " });
  fillCandies({ screenConfig });
  let selected;
  const state = { message: "", messageTimeout: undefined };

  const render = () =>
    drawOnScreen({ screenConfig, selected, message: state.message });
  const handleClick = ({ x, y }) => {
    const candy = getCellAtPosition(x, y, screenConfig);
    if (!candy) return;

    clearMessage(state);
    if (!selected) {
      selected = candy;
      render();
      return;
    }

    if (selected.x === candy.x && selected.y === candy.y) {
      selected = undefined;
      render();
      return;
    }

    const swiped = selected;
    selected = undefined;

    if (!validateLiberty(swiped, candy)) {
      showMessage(state, "Invalid move!", render);
      return;
    }

    const result = swipeCandy({
      swiped,
      swiper: candy,
      screen: screenConfig.screen,
    });

    if (!result.success) {
      showMessage(state, "No match!", render);
      return;
    }

    gravityPull({ screenConfig }, result.candiesToBlast);
    filterCandies({ screenConfig });
    render();
  };

  await startTerminal({
    onStart: render,
    onClick: handleClick,
    onStop: () => clearTimeout(state.messageTimeout),
  });
};
