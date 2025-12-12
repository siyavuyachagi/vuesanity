import { describe, expect, it } from "vitest";
import { mustBeFalse } from "../../src/validators/boolean/must-be-false"
import {  mustBeTrue } from "../../src/validators/boolean/must-be-true"

describe("Boolean Validators", () => {
    describe('1. mustBeFalse()', () => {
        it("should pass when the value is false", () => {
            const validator = mustBeFalse();
            expect(validator(false)).toBeNull();
            expect(validator("false")).toBeNull();
            expect(validator(0)).toBeNull();
        });

        it("should pass when the value is null or undefined", () => {
            const validator = mustBeFalse();
            expect(validator(null)).toBeNull();
            expect(validator(undefined)).toBeNull();
        });

        it("should fail when the value is true", () => {
            const validator = mustBeFalse();
            expect(validator(true)).toBe("Value must be false");
            expect(validator("true")).toBe("Value must be false");
            expect(validator(1)).toBe("Value must be false");
        });
    })

    describe('2. requirerTrue()', () => {
        it("should pass when the value is true", () => {
            const validator = mustBeTrue();
            expect(validator(true)).toBeNull();
            expect(validator("true")).toBeNull();
            expect(validator(1)).toBeNull();
        });

        it("should pass when the value is null or undefined", () => {
            const validator = mustBeTrue();
            expect(validator(null)).toBeNull();
            expect(validator(undefined)).toBeNull();
        });

        it("should fail when the value is false", () => {
            const validator = mustBeTrue();
            expect(validator(false)).toBe("Value must be true");
            expect(validator("false")).toBe("Value must be true");
            expect(validator(0)).toBe("Value must be true");
        });
    })
})