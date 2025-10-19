import { describe, it, expect } from "vitest";
import { minDate } from "../../../../dist/validators/date/min";

describe("minDate()", () => {
  it("should restrict dates that are earlier than the minimum date", () => {
    // Setup (Arrange)
    const minAllowedDate = new Date("2024-01-01");
    const validator = minDate(minAllowedDate, "Date is earlier than allowed");

    const validDate = new Date("2024-06-15");
    const invalidDate = new Date("2023-12-31");

    // Process (Act)
    const resultValid = validator(validDate);
    const resultInvalid = validator(invalidDate);

    // Assertion (Assert)
    expect(resultValid).toBe(true); // within or equal to min date
    expect(resultInvalid).toBe("Date is earlier than allowed"); // fails validation
  });
});
