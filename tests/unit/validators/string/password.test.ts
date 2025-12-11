import { describe, it, expect } from "vitest";
import { password } from "../../../../src";

describe("password validator", () => {

    it("fails if fewer than 6 characters", () => {
        const validator = password();

        expect(validator("aaaaa")).toBe("Password must be longer than 6 characters"); // 5 chars ❌
        expect(validator("AaA1!")).toBe("Password must be longer than 6 characters"); // 5 chars ❌

        // 6 chars → should move to next rule
        expect(validator("AaA1!!")).not.toBe("Password must be longer than 6 characters");
    });

    it("fails if all characters are the same (case-insensitive)", () => {
        const validator = password();

        expect(validator("aaaaaa")).toBe("Password cannot consist of the same repeated character");
        expect(validator("AAAAAA")).toBe("Password cannot consist of the same repeated character");
        expect(validator("!!!!!!!")).toBe("Password cannot consist of the same repeated character");
        expect(validator("aaaAAA")).toBe("Password cannot consist of the same repeated character"); // same char ignoring case
    });

    it("fails if no special character", () => {
        const validator = password();

        expect(validator("abcdef")).toBe("Password must include at least one special character");
        expect(validator("ABCdef")).toBe("Password must include at least one special character");
        expect(validator("AaAaA1")).toBe("Password must include at least one special character");
    });

    it("passes when password is valid", () => {
        const validator = password();

        expect(validator("Abcde!")).toBe("");   // 6 chars ✔ special ✔ not same chars ✔
        expect(validator("abc123@")).toBe("");
        expect(validator("AAAaaa#")).toBe("");
        expect(validator("Hello1$")).toBe("");
    });

});
