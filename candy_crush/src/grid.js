export const createScreen = ({ height, width, char = " " }) => {
  const screen = Array.from(
    { length: height },
    () => Array.from({ length: width }, () => char),
  );
  return { height, width, screen };
};

export const renderScreen = (screen) =>
  screen.map((row, i) => `${row.join("|")} |${i}`).join("\n");

export const createTop = (width = 9) => {
  const top = [];
  for (let index = 0; index < width; index++) {
    top.push(index);
  }
  return top.join(" |");
};

export const drawOnScreen = ({ screenConfig }) => {
  // console.clear();
  const top = createTop();
  const renderedScreen = renderScreen(screenConfig.screen);
  console.log(top + "\n" + renderedScreen);
};
