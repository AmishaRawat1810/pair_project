import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { createScreen, renderScreen } from "../src/grid.js";

describe("test screen functions", () => {
  it("create screen of 2 * 2", () => {
    const mockScreen = {
      screen: [[" ", " "], [" ", " "]],
      height: 2,
      width: 2,
    };
    assertEquals(createScreen({ height: 2, width: 2, char: " " }), mockScreen);
  });

  it("render screen for 2 * 2 screeb", () => {
    const screenConfig = createScreen({height : 2, width : 2, char : " "}); 
    assertEquals(renderScreen(screenConfig.screen), " | \n | ");
  });
});
