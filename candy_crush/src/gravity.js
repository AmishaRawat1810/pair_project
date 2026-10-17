import { weightedPick } from "./fill_candies.js";

const getColumnsToProcess = (
  candiesToBlast,
) => [...new Set(candiesToBlast.map(([, column]) => column))];

const moveCandiesDown = (screen, columns) => {
  let moved = false;

  columns.forEach((column) => {
    for (let row = screen.length - 1; row > 0; row--) {
      if (screen[row][column] !== "  " || screen[row - 1][column] === "  ") {
        continue;
      }

      screen[row][column] = screen[row - 1][column];
      screen[row - 1][column] = "  ";
      moved = true;
    }
  });

  return moved;
};

const fillTopEmptyCells = (screen, columns) => {
  columns.forEach((column) => {
    for (
      let row = 0;
      row < screen.length && screen[row][column] === "  ";
      row++
    ) {
      screen[row][column] = weightedPick();
    }
  });
};

const fillTopRow = (screen, columns) => {
  let filled = false;

  columns.forEach((column) => {
    if (screen[0][column] === "  ") {
      screen[0][column] = weightedPick();
      filled = true;
    }
  });

  return filled;
};

export const gravityPull = ({ screenConfig }, candiesToBlast) => {
  if (!candiesToBlast?.length) return;

  const { screen } = screenConfig;
  const columns = getColumnsToProcess(candiesToBlast);

  while (moveCandiesDown(screen, columns)) {}
  fillTopEmptyCells(screen, columns);
};

export const gravityPullAnimated = async (
  { screenConfig },
  candiesToBlast,
  render,
  delay = 100,
) => {
  if (!candiesToBlast?.length) return;

  const { screen } = screenConfig;
  const columns = getColumnsToProcess(candiesToBlast);

  while (true) {
    const moved = moveCandiesDown(screen, columns);
    const filled = fillTopRow(screen, columns);
    if (!moved && !filled) break;

    render();
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
};

// Only columns containing blasted candies are processed. Candies fall one row
// per animated step, and new candies enter through empty cells at the top.
