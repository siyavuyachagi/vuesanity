import { describe, expect, it } from "vitest"
import { required } from "@siyavuyachagi/vuesanity"


describe('required()', () => {
    it('should return error for empty string', () => {
        const validator = required('Field required')
        expect(validator('')).toBe('Field required')
    })

    it('should return empty string for valid input', () => {
        const validator = required()
        expect(validator('hello')).toBe('')
    })

    it('should handle whitespace', () => {
        const validator = required()
        expect(validator('   ')).toBe('This field is required!')
    })
})