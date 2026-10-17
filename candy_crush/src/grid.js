import { CANDIES } from "./global_var.js";

export const BOARD_TOP_OFFSET = 3;

export const createScreen = ({ height, width, char = " " }) => {
  const screen = Array.from(
    { length: height },
    () => Array.from({ length: width }, () => char),
  );
  return { height, width, screen };
};

export const renderScreen = (screen, selected) => {
  return screen.map((row, y) =>
    row.map((ele, x) => {
      const candy = CANDIES[ele]?.candy ?? (ele === "  " ? "  " : " ");
      return selected?.x === x && selected?.y === y
        ? `\x1b[30;43m${candy}\x1b[0m`
        : candy;
    }).join("|")
  ).join("\n");
};

export const getCellAtPosition = (x, y, screenConfig) => {
  const row = y - BOARD_TOP_OFFSET - 1;
  const columnPosition = (x - 1) % 3;
  const column = Math.floor((x - 1) / 3);

  if (
    x < 1 ||
    y < 1 ||
    row < 0 ||
    row >= screenConfig.height ||
    columnPosition > 1 ||
    column < 0 ||
    column >= screenConfig.width
  ) {
    return null;
  }

  return {
    x: column,
    y: row,
    value: screenConfig.screen[row][column],
  };
};

export const drawOnScreen = ({ screenConfig, selected, message = "" }) => {
  console.clear();
  console.log("Candy Crush");
  console.log(
    "Click a candy, then an adjacent candy to swap. Press q to quit.",
  );
  console.log(message || " ");
  console.log(renderScreen(screenConfig.screen, selected));
};
