import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";

describe.ignore("Simple test", () => {
  it("Value equals 1", () => {
      const result = main();
      assertEquals(result, 1)
    })
  })
