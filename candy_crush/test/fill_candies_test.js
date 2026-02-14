import { assertEquals } from "jsr:@std/assert";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import {
  calculateWeights,
  fillCandies,
  weightedPick,
} from "../src/fill_candies.js";
import { createScreen } from "../src/grid.js";

describe("test fill candies functions", () => {
  let candies;

  beforeEach(() => {
    candies = {
      "1": {
        candy: "🍬",
        weight: 1,
      },
      "2": {
        candy: "🍭",
        weight: 1,
      },
      "3": {
        candy: "🍩",
        weight: 1,
      },
      "4": {
        candy: "🍪",
        weight: 1,
      },
    };
  });

  it("test weightedPics function", () => {
    const randomFn = () => 0.9;
    assertEquals(weightedPick(randomFn, candies), "1");
  });

  it("test weightedPics function for random range [1, 2]", () => {
    const randomFn = () => 1.3;
    assertEquals(weightedPick(randomFn, candies), "2");
  });

  it("test weightedPics function for random range [1, 2]", () => {
    const randomFn = () => 2.3;
    assertEquals(weightedPick(randomFn, candies), "3");
  });

  it("test weightedPics function for random range [1, 2]", () => {
    const randomFn = () => 3.3;
    assertEquals(weightedPick(randomFn, candies), "4");
  });

  it("test calulate weights", () => {
    const screen = [
      ["1", "1", " ", " "],
    ];
    calculateWeights(screen, { x: 2, y: 0 }, candies);
    assertEquals(candies[1].weight, 0 ); 
  });
  
  // it("test fill candy function ", () => {
  //   const screenConfig = createScreen({ height: 2, width: 2, char: " " });
  //   const randomFn = () => 0.9;
  //   fillCandies({ screenConfig, randomFn });
  //   assertEquals(screenConfig.screen, [["1", "1"], ["1", "1"]]);
  // });
  //  it("test calulate weights for boundary cases", () => {
    //   const screen = [
  //     ["1", "1", " ", " "],
  //   ];
  //   calculateWeights(screen, { x: 1, y: 0 }, candies);
  //   assertEquals(candies[1].weight, 0 ); 
  // });
});
