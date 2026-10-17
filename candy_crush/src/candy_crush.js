import { swipeCandy, validateLiberty } from "./candy_swipe.js";
import { removeBlastedCandies } from "./candy_blast.js";
import { gravityPullAnimated } from "./gravity.js";
import { fillCandies, filterCandies } from "./fill_candies.js";
import { createScreen, drawOnScreen, getCellAtPosition } from "./grid.js";
import { startTerminal } from "./terminal.js";

const clearMessage = (state) => {
  clearTimeout(state.messageTimeout);
  state.messageTimeout = undefined;
  state.message = "";
  state.highlighted = [];
  state.highlightColor = "green";
};

const showMessage = (state, newMessage, render, highlighted = []) => {
  clearMessage(state);
  state.message = newMessage;
  state.highlighted = highlighted;
  state.highlightColor = "red";
  render();
  state.messageTimeout = setTimeout(() => {
    state.message = "";
    state.highlighted = [];
    state.messageTimeout = undefined;
    render();
  }, 1500);
};

const wait = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

export const play = async () => {
  const screenConfig = createScreen({ height: 9, width: 9, char: " " });
  fillCandies({ screenConfig });
  let selected;
  const state = {
    message: "",
    messageTimeout: undefined,
    highlighted: [],
    highlightColor: "green",
  };

  const render = () =>
    drawOnScreen({
      screenConfig,
      selected,
      highlighted: state.highlighted,
      highlightColor: state.highlightColor,
      message: state.message,
    });

  const handleClick = async ({ x, y }) => {
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
      showMessage(state, "Invalid move!", render, [
        [swiped.y, swiped.x],
        [candy.y, candy.x],
      ]);
      return;
    }

    const result = swipeCandy({
      swiped,
      swiper: candy,
      screen: screenConfig.screen,
      deferBlast: true,
    });

    if (!result.success) {
      showMessage(state, "No match!", render, [
        [swiped.y, swiped.x],
        [candy.y, candy.x],
      ]);
      return;
    }

    state.highlighted = result.candiesToBlast;
    state.highlightColor = "green";
    render();
    await wait(500);

    removeBlastedCandies(result.candiesToBlast, screenConfig.screen);
    state.highlighted = [];
    render();
    await wait(700);

    await gravityPullAnimated(
      { screenConfig },
      result.candiesToBlast,
      render,
    );
    filterCandies({ screenConfig });
    render();
  };

  await startTerminal({
    onStart: render,
    onClick: handleClick,
    onStop: () => clearTimeout(state.messageTimeout),
  });
};
