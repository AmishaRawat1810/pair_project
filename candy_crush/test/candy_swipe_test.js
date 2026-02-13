import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import {
  swapCandies,
  swipeCandy,
  validateLiberty,
} from "../src/candy_swipe.js";

describe("Candy Interaction Logic", () => {
  describe("validateLiberty()", () => {
    it("should return true for horizontal adjacency", () => {
      assertEquals(validateLiberty({ x: 1, y: 1 }, { x: 2, y: 1 }), true);
    });

    it("should return true for vertical adjacency", () => {
      assertEquals(validateLiberty({ x: 1, y: 1 }, { x: 1, y: 2 }), true);
    });

    it("should return false for non-adjacent positions", () => {
      assertEquals(validateLiberty({ x: 0, y: 0 }, { x: 2, y: 0 }), false);
      assertEquals(validateLiberty({ x: 0, y: 0 }, { x: 1, y: 1 }), false);
    });
  });

  describe("swapCandies()", () => {
    it("should swap values in objects and the grid", () => {
      const screen = [["A", "B"]];
      const swiped = { x: 0, y: 0, value: "A" };
      const swiper = { x: 1, y: 0, value: "B" };

      swapCandies(swiped, swiper, screen);

      assertEquals(swiped.value, "B");
      assertEquals(swiper.value, "A");
      assertEquals(screen[0][0], "B");
      assertEquals(screen[0][1], "A");
    });
  });

  describe("swipeCandy()", () => {
    it("should return success true and empty the board at match locations", () => {
      const screen = [
        ["X", "A", "A"],
        ["A", "Y", "Y"],
        ["Z", "Z", "Z"],
      ];
      const swiped = { x: 0, y: 0, value: "X" };
      const swiper = { x: 0, y: 1, value: "A" };

      const result = swipeCandy({ swiped, swiper, screen });

      assertEquals(result.success, true);
      assertEquals(result.candiesToBlast.length >= 3, true);
      assertEquals(screen[0][0], "  ");
      assertEquals(screen[0][1], "  ");
      assertEquals(screen[0][2], "  ");
    });

    it("should return success false and revert board if no match is formed", () => {
      const screen = [
        ["A", "B", "C"],
        ["D", "E", "F"],
      ];
      const swiped = { x: 0, y: 0, value: "A" };
      const swiper = { x: 1, y: 0, value: "B" };

      const result = swipeCandy({ swiped, swiper, screen });

      assertEquals(result.success, false);
      assertEquals(result.candiesToBlast, []);
      assertEquals(screen[0][0], "A");
      assertEquals(screen[0][1], "B");
    });

    it("should return success false immediately if not a liberty", () => {
      const screen = [["A", "X", "B"]];
      const swiped = { x: 0, y: 0, value: "A" };
      const swiper = { x: 2, y: 0, value: "B" };

      const result = swipeCandy({ swiped, swiper, screen });

      assertEquals(result.success, false);
      assertEquals(screen[0][0], "A");
      assertEquals(screen[0][2], "B");
    });
  });
});
