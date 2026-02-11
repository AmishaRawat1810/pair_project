import { assertEquals } from "@std/assert";
import { beforeEach, describe, it } from "@std/testing/bdd";
import {
  blastCandy,
  findCandies,
  getCandyLine,
  getMatchedCandies,
} from "../src/candy_blast.js";

describe("Candy Blast Logic Tests", () => {
  let screen;

  beforeEach(() => {
    screen = [
      ["#", "@", "@", "@", "%", "#", "@", "&", "@", "%"],
      ["#", "&", "?", "#", "@", "%", "#", "%", "%", "%"],
      ["#", "@", "@", "@", "%", "#", "@", "&", "@", "%"],
    ];
  });

  describe("findCandies()", () => {
    it("should return a horizontal match of 3 candies", () => {
      const targetCandy = "@";
      const targetIdx = 2;
      const validIndices = [0, 1, 2, 3, 4];
      const candyLine = screen[0]; // ["#", "@", "@", "@", "%"]

      const result = findCandies(
        targetCandy,
        targetIdx,
        validIndices,
        candyLine,
      );
      assertEquals(result, [1, 2, 3]);
    });

    it("should return empty array if match length is less than 3", () => {
      const targetCandy = "#";
      const targetIdx = 0;
      const validIndices = [0, 1, 2];
      const candyLine = ["#", "#", "@"];

      const result = findCandies(
        targetCandy,
        targetIdx,
        validIndices,
        candyLine,
      );
      assertEquals(result, []);
    });
  });

  describe("getCandyLine()", () => {
    it("should generate valid indices within bounds", () => {
      const line = ["A", "B", "C", "D", "E"];
      const result = getCandyLine(2, 2, line);
      assertEquals(result, [0, 1, 2, 3, 4]);
    });

    it("should clamp indices at the start of the array", () => {
      const line = ["A", "B", "C"];
      const result = getCandyLine(0, 2, line);
      assertEquals(result, [0, 1, 2]);
    });
  });

  describe("getMatchedCandies()", () => {
    it("should identify a horizontal T-junction or cross match", () => {
      const candy = { x: 8, y: 1 };
      const results = getMatchedCandies(candy, screen);

      const expected = [
        [1, 7],
        [1, 8],
        [1, 9],
      ];

      assertEquals(results.length, 3);
      assertEquals(results, expected);
    });

    it("should return empty array when no match of 3 exists", () => {
      const candy = { x: 2, y: 1 };
      const results = getMatchedCandies(candy, screen);
      assertEquals(results, []);
    });
  });

  describe("blastCandy() Tests", () => {
    it("should return match results for both swiped and swiper candies", () => {
      const screen = [
        ["#", "@", "@", "@", "%"],
        ["#", "&", "?", "#", "@"],
        ["#", "@", "&", "%", "%"],
      ];

      const swiper = { x: 2, y: 0 };
      const swiped = { x: 2, y: 1 };

      const result = blastCandy({ swiped, swiper, screen });

      assertEquals(result.swiperBlasts.success, true);
      assertEquals(result.swiperBlasts.candies.length, 3);
      assertEquals(result.swiperBlasts.candies, [[0, 1], [0, 2], [0, 3]]);

      assertEquals(result.swipedBlasts.success, false);
      assertEquals(result.swipedBlasts.candies, []);
    });

    it("should detect if both candies create matches simultaneously", () => {
      const screen = [
        ["#", "#", "#", "@", "@", "@"],
        ["%", "&", "?", "%", "&", "?"],
        ["%", "&", "?", "%", "&", "?"],
      ];

      const swiper = { x: 1, y: 0 };
      const swiped = { x: 4, y: 0 };

      const result = blastCandy({ swiped, swiper, screen });

      assertEquals(result.swiperBlasts.success, true);
      assertEquals(result.swipedBlasts.success, true);
      assertEquals(result.swiperBlasts.candies.length, 3);
      assertEquals(result.swipedBlasts.candies.length, 3);
    });
  });

  it("should report success specifically for the candy that made the match", () => {
    const screen = [
      ["@", "@", "@", "#", "%"],
      ["&", "&", "#", "&", "&"],
      ["%", "%", "#", "%", "%"],
    ];

    const swiper = { x: 1, y: 0 };
    const swiped = { x: 1, y: 1 };

    const { swiperBlasts, swipedBlasts } = blastCandy({
      swiped,
      swiper,
      screen,
    });

    assertEquals(swiperBlasts.success, true);
    assertEquals(swipedBlasts.success, false);
    assertEquals(swiperBlasts.candies.length, 3);
  });
});
