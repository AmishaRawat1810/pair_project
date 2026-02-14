import { assertEquals } from "@std/assert";
import { beforeEach, describe, it } from "@std/testing/bdd";
import {
  blastCandy,
  collectMatches,
  getCandyScanRange,
  getMatchedCandies,
} from "../src/candy_blast.js";

describe("Candy Blast Logic Tests", () => {
  let screen;

  beforeEach(() => {
    screen = [
      ["#", "@", "@", "@", "%"],
      ["&", "&", "&", "!", "!"],
    ];
  });

  describe("collectMatches()", () => {
    it("should return the correct indices for a horizontal match", () => {
      const targetCandy = "@";
      const targetIdx = 2;
      const validIndices = [0, 1, 2, 3, 4];
      const candyLine = ["#", "@", "@", "@", "%"];

      const result = collectMatches(
        targetCandy,
        targetIdx,
        validIndices,
        candyLine,
      );

      assertEquals(result, [1, 2, 3]);
    });

    it("should return empty array if match length is less than 3", () => {
      const targetCandy = "!";
      const targetIdx = 3;
      const validIndices = [0, 1, 2, 3, 4];
      const candyLine = ["&", "&", "&", "!", "!"];

      const result = collectMatches(
        targetCandy,
        targetIdx,
        validIndices,
        candyLine,
      );
      assertEquals(result, []);
    });
  });

  describe("getCandyScanRange()", () => {
    it("should generate valid indices within bounds", () => {
      const line = ["A", "B", "C", "D", "E"];
      const result = getCandyScanRange(2, 2, line);
      assertEquals(result, [0, 1, 2, 3, 4]);
    });

    it("should clamp indices at the start of the array", () => {
      const line = ["A", "B", "C"];
      const result = getCandyScanRange(0, 2, line);
      assertEquals(result, [0, 1, 2]);
    });
  });

  describe("getMatchedCandies()", () => {
    it("should identify a horizontal match of 3 candies", () => {
      const candy = { x: 2, y: 0 };
      const results = getMatchedCandies(candy, screen);

      const expected = [
        [0, 1],
        [0, 2],
        [0, 3],
      ];

      assertEquals(results.length, 3);
      assertEquals(results, expected);
    });

    it("should return empty array when no match of 3 exists", () => {
      const candy = { x: 0, y: 0 };
      const results = getMatchedCandies(candy, screen);
      assertEquals(results, []);
    });
  });

  describe("blastCandy() Tests", () => {
    it("should return match results for both swiped and swiper candies", () => {
      const customScreen = [
        ["#", "@", "@", "@", "%"],
        ["#", "&", "?", "#", "@"],
        ["#", "@", "&", "%", "%"],
      ];

      const swiper = { x: 2, y: 0 };
      const swiped = { x: 2, y: 1 };

      const result = blastCandy({ swiped, swiper, screen: customScreen });

      assertEquals(result.swiperBlasts.success, true);
      assertEquals(result.swipedBlasts.success, false);
      assertEquals(customScreen[0][2], "  ");
    });

    it("should detect if both candies create matches simultaneously after valid adjacent swap", () => {
      const validScreen = [
        ["#", "#", "&", "@", "@", "?"],
        ["%", "&", "?", "%", "&", "?"],
        ["%", "&", "?", "%", "&", "?"],
      ];

      const swiper = { x: 1, y: 0 };
      const swiped = { x: 2, y: 0 };

      const result = blastCandy({ swiped, swiper, screen: validScreen });

      assertEquals(result.swiperBlasts.success, false);
      assertEquals(result.swipedBlasts.success, false);
    });

    it("should report success specifically for the candy that made the match", () => {
      const specificScreen = [
        ["@", "@", "@", "#", "%"],
        ["&", "&", "#", "&", "&"],
        ["%", "%", "#", "%", "%"],
      ];

      const swiper = { x: 1, y: 0 };
      const swiped = { x: 1, y: 1 };

      const { swiperBlasts, swipedBlasts } = blastCandy({
        swiped,
        swiper,
        screen: specificScreen,
      });

      assertEquals(swiperBlasts.success, true);
      assertEquals(swipedBlasts.success, false);
    });
  });
});
