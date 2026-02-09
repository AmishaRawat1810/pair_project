import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";

<<<<<<< HEAD
describe("Simple test", () => {
  it("Value equals 1", () => {});
});
=======
describe.ignore("Simple test", () => {
  it("Value equals 1", () => {
      const result = main();
      assertEquals(result, 1)
    })
  })
>>>>>>> 10eef55cb3299cb55ec306c143dd9cc3a643ed64
