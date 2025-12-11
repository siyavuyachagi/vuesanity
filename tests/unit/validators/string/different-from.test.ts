import { describe, it, expect } from "vitest";
import { differentFrom } from "../../../../src";

describe("String validator", () => {
    describe("differentFrom", () => {
        it("Fails when values are the same", () => {
            const compare = () => "ABC123";
            const validator = differentFrom(compare);

            expect(validator("ABC123")).toBe("Value must be different");
        });

        it("Passes when values are different", () => {
            const compare = () => "ABC123";
            const validator = differentFrom(compare);

            expect(validator("XYZ789")).toBe("");
        });
    });
});
