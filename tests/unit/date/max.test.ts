import { describe, it, expect } from "vitest";
import { maxDate } from "../../../../dist/validators/date/max";

describe("maxDate()", () => {
    it("should restrict dates that exceed the maximum date", () => {
        // Setup (Arrange)
        const limitDate = new Date("2024-12-31");
        const validator = maxDate(limitDate, "Date exceeds maximum limit");

        const withinLimit = new Date("2024-11-30");
        const beyondLimit = new Date("2025-01-01");

        // Process (Act)
        const resultWithinLimit = validator(withinLimit);
        const resultBeyondLimit = validator(beyondLimit);

        // Assertion (Assert)
        expect(resultWithinLimit).toBe(true); // passes validation
        expect(resultBeyondLimit).toBe("Date exceeds maximum limit"); // fails with message
    });
});
