import {
  calculateWeights,
  resetWeights,
  weightedPick,
} from "./fill_candies.js";

export const gravityPull = ({ screenConfig }, candiesToBlast) => {
  const { screen, height } = screenConfig;

  if (!candiesToBlast || candiesToBlast.length === 0) return;

  const affectedCols = [...new Set(candiesToBlast.map(([_, x]) => x))];

  for (const x of affectedCols) {
    let writerPtr = height - 1;

    for (let y = height - 1; y >= 0; y--) {
      if (screen[y][x] !== "  ") {
        screen[writerPtr][x] = screen[y][x];
        writerPtr--;
      }
    }

    while (writerPtr >= 0) {
      calculateWeights(screen, { x, y: writerPtr });
      screen[writerPtr][x] = weightedPick();
      resetWeights();
      writerPtr--;
    }
  }
};

// Bejeweled : bottom-up full-column pass, then fill from the top.
// FLOW:
/*
  1 : finds the affected columns of the blast and get only the column (x value)
  2 : LOOPS through the affected columns from bottom to top
      2.1 : INSIDE LOOP :
        -> FIRST LOOP :
            -> PTR points to the last candy , loop POINTER (Y) also starts from the last candy
            -> Checks if the current candy is not empty
              ---- TRUE : The candy equals to itself , PTR and Y are same value ( decremented by 1 )
              ---- FALSE : Y is the only one decremented ( PTR STAYS SAME )
            -> REPEATS
  3: SUMMARY :
    3.1: It compares if the current is empty or not
    3.2: If it is empty then the EMPTY CANDY POINTER points to the empty candy block and the loop pointer points goes to the next candy block
    3.3: If the next one is not empty then the EMPTY CANDY POINTER will be equal to the next one (creates a gap of one btw them)
    3.4: Then each block will be equal to the block after it
    3.5: However, loop pointer will end before the EMPTY CANDY POINTER becomes 0
    3.5: Hence, EMPTY CANDY POINTER will be pointing to the candy from where we need to fill new candies.
*/
