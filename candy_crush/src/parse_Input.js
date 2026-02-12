export const parseInput = (inputString, screen) => {
  const coors = inputString.split(""); 
  const [y, x] = [parseInt(coors[0]), parseInt(coors[1])]; 
  return {x , y, value : screen[y][x]}
}