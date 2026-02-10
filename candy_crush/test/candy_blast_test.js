import { assertEquals } from "@std/assert";
import { beforeEach, describe, it } from "@std/testing/bdd";
import { findCandies } from "../src/candy_blast.js";

describe("Test for liberty candies of a candy", () => {
  let screen;

  beforeEach(() => {
  });

  it("Test 1: candy has only horizontal liberty", () => {
    const x = 3;
    const y = 0;
    const targetCandy = screen[y][x];
    const xNeighbour = [x - 2, x - 1, x, x + 1, x + 2];
    const yNeighbour = [y - 2, y - 1, y, y + 1, y + 2];
    const xResult = findCandies(targetCandy, y, xNeighbour, screen);
    const yResult = findCandies(targetCandy, x, yNeighbour, screen);

    const xExpected = ["@", "@", "@"];
    const yExpected = [];
    assertEquals(xResult, xExpected);
    assertEquals(yResult, yExpected);
  });

  it("Test 2: candy has both horizontal and one vertical liberty", () => {
    const x = 8;
    const y = 1;
    const targetCandy = screen[y][x];
    const xNeighbour = [x - 2, x - 1, x, x + 1, x + 2];
    const yNeighbour = [y - 2, y - 1, y, y + 1, y + 2];
    const xResult = findCandies(targetCandy, y, xNeighbour, screen);
    const yResult = findCandies(targetCandy, x, yNeighbour, screen);

    const xExpected = ["%", "%", "%"];
    const yExpected = [];
    assertEquals(xResult, xExpected);
    assertEquals(yResult, yExpected);
  });
});
