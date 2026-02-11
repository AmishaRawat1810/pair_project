import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import {
  swipeCandy,
  updateCandies,
  validateBlast,
  validateLiberty,
} from "../src/candy_swipe.js";

describe("Candy Interaction Logic - Unit Tests", () => {
  describe("validateLiberty()", () => {
    it("should return true for horizontal adjacency", () => {
      const swiped = { x: 1, y: 1 };
      const swiper = { x: 2, y: 1 };
      assertEquals(validateLiberty(swiped, swiper), true);
    });

    it("should return true for vertical adjacency", () => {
      const swiped = { x: 1, y: 1 };
      const swiper = { x: 1, y: 2 };
      assertEquals(validateLiberty(swiped, swiper), true);
    });

    it("should return false for diagonal positions", () => {
      const swiped = { x: 1, y: 1 };
      const swiper = { x: 2, y: 2 };
      assertEquals(validateLiberty(swiped, swiper), false);
    });

    it("should return false for same position", () => {
      const swiped = { x: 1, y: 1 };
      const swiper = { x: 1, y: 1 };
      assertEquals(validateLiberty(swiped, swiper), false);
    });
  });

  describe("updateCandies()", () => {
    it("should swap values between two candy objects", () => {
      const screen = [["%", "@", "@"], ["#", "%", "%"]];
      const swiped = { x: 1, y: 0, value: "@" };
      const swiper = { x: 0, y: 1, value: "#" };
      updateCandies(swiped, swiper, screen);
      assertEquals(swiped.value, "#");
      assertEquals(swiper.value, "@");
    });
  });

  describe("validateBlast()", () => {
    it("should return success false and empty array if no blast is formed", () => {
      const swiped = { x: 0, y: 0, value: "@" };
      const swiper = { x: 0, y: 1, value: "#" };
      const screen = [["@", "#", "%"], ["%", "%", "&"]];

      const result = validateBlast(swiped, swiper, screen);

      assertEquals(result.success, false);
      assertEquals(result.candiesToBlast, []);
      assertEquals(swiped.value, "@");
    });

    it("should return success true and candies if a blast is formed", () => {
      const swiped = { x: 0, y: 0, value: "%" };
      const swiper = { x: 0, y: 1, value: "#" };
      const screen = [["%", "@", "@"], ["#", "%", "%"]];

      const result = validateBlast(swiped, swiper, screen);

      assertEquals(result.success, true);
      assertEquals(Array.isArray(result.candiesToBlast), true);
      assertEquals(swiped.value, "#");
    });
  });

  describe("swipeCandy()", () => {
    it("should return empty array if move is legal but no match", () => {
      const swiped = { x: 0, y: 0, value: "#" };
      const swiper = { x: 1, y: 0, value: "@" };
      const screen = [["#", "@", "@"], ["%", "%", "%"]];

      const result = swipeCandy({ swiped, swiper, screen });
      assertEquals(result.length, 0);
    });

    it("should return empty array if move is illegal (no liberty)", () => {
      const swiped = { x: 0, y: 0, value: "@" };
      const swiper = { x: 2, y: 0, value: "#" };
      const screen = [["@", "%", "#"]];

      const result = swipeCandy({ swiped, swiper, screen });
      assertEquals(result, []);
    });

    it("should return original objects if move is legal but no match is formed", () => {
      const swiped = { x: 0, y: 0, value: "@" };
      const swiper = { x: 1, y: 0, value: "#" };
      const screen = [["@", "#", "%"]];

      const result = swipeCandy({ swiped, swiper, screen });
      assertEquals(result, []);
    });
  });
});
