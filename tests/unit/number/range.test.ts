import { describe, it, expect } from "vitest";
import { range } from "../../../dist/validators/number/range";

describe("range()", () => {
  it("should validate that a number is within the allowed range", () => {
    // Setup (Arrange)
    const min = 10;
    const max = 20;
    const validator = range(min, max, "Value out of range");

    const withinRange = 15;
    const belowRange = 5;
    const aboveRange = 25;

    // Process (Act)
    const resultWithin = validator(withinRange);
    const resultBelow = validator(belowRange);
    const resultAbove = validator(aboveRange);

    // Assertion (Assert)
    expect(resultWithin).toBe(true);
    expect(resultBelow).toBe("Value out of range");
    expect(resultAbove).toBe("Value out of range");
  });
});
