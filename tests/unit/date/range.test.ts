import { describe, it, expect } from "vitest";
import { range } from "../../../dist/validators/date/range";

describe("range()", () => {
  it("should validate that a date falls within the allowed range", () => {
    // Setup (Arrange)
    const startDate = new Date("2024-01-01");
    const endDate = new Date("2024-12-31");
    const validator = range(startDate, endDate, "Date out of range");

    const validDate = new Date("2024-06-15");
    const beforeRange = new Date("2023-12-31");
    const afterRange = new Date("2025-01-01");

    // Process (Act)
    const resultValid = validator(validDate);
    const resultBefore = validator(beforeRange);
    const resultAfter = validator(afterRange);

    // Assertion (Assert)
    expect(resultValid).toBe(true);
    expect(resultBefore).toBe("Date out of range");
    expect(resultAfter).toBe("Date out of range");
  });
});
