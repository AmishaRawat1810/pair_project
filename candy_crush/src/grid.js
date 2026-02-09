export const createScreen = ({ height, width, char = " " }) => {
  const screen = Array.from(
    { length: height },
    () => Array.from({ length: width }, () => char),
  );
  return { height, width, screen };
};

export const renderScreen = (screen) =>
  screen.map((row) => row.join("|")).join("\n");

export const drawOnScreen = (screenConfig) => {
  const renderedScreen = renderScreen(screenConfig.screen); 
  console.log(renderedScreen); 
}
