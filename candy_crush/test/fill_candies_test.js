import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { fillCandies, weightedPick } from "../src/fill_candies.js";
import { createScreen } from "../src/grid.js";

describe("test fill candies functions", () => {
  it("test weightedPics function", () => {
    const candies = ["🍬", "🍭", "🍩", "🍪"];
    const weights = [1, 1, 1, 1];
    const randomFn = () => 0.9;
    assertEquals(weightedPick(candies, weights, randomFn), "🍬");
  });

  it("test weightedPics function for random range [1, 2]", () => {
    const candies = ["🍬", "🍭", "🍩", "🍪"];
    const weights = [1, 1, 1, 1];
    const randomFn = () => 1.3;
    assertEquals(weightedPick(candies, weights, randomFn), "🍭");
  });

  it("test weightedPics function for random range [1, 2]", () => {
    const candies = ["🍬", "🍭", "🍩", "🍪"];
    const weights = [1, 1, 1, 1];
    const randomFn = () => 2.3;
    assertEquals(weightedPick(candies, weights, randomFn), "🍩");
  });

  it("test weightedPics function for random range [1, 2]", () => {
    const candies = ["🍬", "🍭", "🍩", "🍪"];
    const weights = [1, 1, 1, 1];
    const randomFn = () => 3.3;
    assertEquals(weightedPick(candies, weights, randomFn), "🍪");
  });

  it("test fill candy function ", () => {
    const candies = ["🍬", "🍭", "🍩", "🍪"];
    const screenConfig = createScreen({height : 2, width : 2, char : " "})
    const randomFn = () => 0.9;
    fillCandies({screenConfig, candies, randomFn}); 
    assertEquals(screenConfig.screen, [["🍬", "🍬"], ["🍬", "🍬"]]); 
  });
});
