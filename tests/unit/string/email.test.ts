import { describe, expect, it } from "vitest"
import { email } from "@siyavuyachagi/vuesanity"

describe('email()', () => {
    it('should validate email format', () => {
        const validator = email()
        expect(validator('invalid')).not.toBe('')
        expect(validator('test@example.com')).toBe('')
    })

    it('should restrict domains', () => {
        const validator = email(['gmail.com'])
        expect(validator('test@gmail.com')).toBe('')
        expect(validator('test@yahoo.com')).not.toBe('')
    })
})