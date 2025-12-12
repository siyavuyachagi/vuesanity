// tests/unit/validators/number-date.test.ts
import { describe, expect, it } from "vitest";
import { maxDate, minDate, rangeDate } from "../../src";



describe('Date Validators', () => {
    describe('1. maxDate()', () => {
        it('should accept date before maximum', () => {
            const validator = maxDate(new Date('2024-12-31'));
            expect(validator(new Date('2024-06-15'))).toBe('');
        });

        it('should accept date at maximum', () => {
            const maxDateValue = new Date('2024-12-31');
            const validator = maxDate(maxDateValue);
            expect(validator(maxDateValue)).toBe('');
        });

        it('should reject date after maximum', () => {
            const validator = maxDate(new Date('2024-12-31'));
            expect(validator(new Date('2025-01-01'))).toContain('must be before');
        });

        it('should return empty string for empty value', () => {
            const validator = maxDate(new Date('2024-12-31'));
            expect(validator('')).toBe('');
        });

        it('should use custom message', () => {
            const validator = maxDate(new Date('2024-12-31'), 'Date too late');
            expect(validator(new Date('2025-01-01'))).toBe('Date too late');
        });

        it('should handle string date input', () => {
            const validator = maxDate('2024-12-31');
            expect(validator('2024-06-15')).toBe('');
            expect(validator('2025-01-01')).toContain('must be before');
        });

        it('should reject invalid date format', () => {
            const validator = maxDate(new Date('2024-12-31'));
            expect(validator('invalid-date')).toContain('Invalid date format');
        });

        it('should accept dates with time', () => {
            const validator = maxDate(new Date('2024-12-31T23:59:59'));
            expect(validator(new Date('2024-12-31T12:00:00'))).toBe('');
        });
    });

    describe('2. minDate()', () => {
        it('should accept date after minimum', () => {
            const validator = minDate(new Date('2024-01-01'));
            expect(validator(new Date('2024-06-15'))).toBe('');
        });

        it('should accept date at minimum', () => {
            const minDateValue = new Date('2024-01-01');
            const validator = minDate(minDateValue);
            expect(validator(minDateValue)).toBe('');
        });

        it('should reject date before minimum', () => {
            const validator = minDate(new Date('2024-01-01'));
            expect(validator(new Date('2023-12-31'))).toContain('must be after');
        });

        it('should return empty string for empty value', () => {
            const validator = minDate(new Date('2024-01-01'));
            expect(validator('')).toBe('');
        });

        it('should use custom message', () => {
            const validator = minDate(new Date('2024-01-01'), 'Date too early');
            expect(validator(new Date('2023-01-01'))).toBe('Date too early');
        });

        it('should handle string date input', () => {
            const validator = minDate('2024-01-01');
            expect(validator('2024-06-15')).toBe('');
            expect(validator('2023-12-31')).toContain('must be after');
        });

        it('should reject invalid date format', () => {
            const validator = minDate(new Date('2024-01-01'));
            expect(validator('invalid-date')).toContain('Invalid date format');
        });

        it('should handle dates far in the past', () => {
            const validator = minDate(new Date('1900-01-01'));
            expect(validator(new Date('2024-01-01'))).toBe('');
        });

        it('should handle dates far in the future', () => {
            const validator = minDate(new Date('2100-01-01'));
            expect(validator(new Date('2024-01-01'))).toContain('must be after');
        });
    });

    describe('3. rangeDate()', () => {
        it('should accept date within range', () => {
            const validator = rangeDate(new Date('2024-01-01'), new Date('2024-12-31'));
            expect(validator(new Date('2024-06-15'))).toBe('');
        });

        it('should accept date at minimum bound', () => {
            const minDate = new Date('2024-01-01');
            const validator = rangeDate(minDate, new Date('2024-12-31'));
            expect(validator(minDate)).toBe('');
        });

        it('should accept date at maximum bound', () => {
            const maxDate = new Date('2024-12-31');
            const validator = rangeDate(new Date('2024-01-01'), maxDate);
            expect(validator(maxDate)).toBe('');
        });

        it('should reject date before range', () => {
            const validator = rangeDate(new Date('2024-01-01'), new Date('2024-12-31'));
            expect(validator(new Date('2023-12-31'))).toContain('must be between');
        });

        it('should reject date after range', () => {
            const validator = rangeDate(new Date('2024-01-01'), new Date('2024-12-31'));
            expect(validator(new Date('2025-01-01'))).toContain('must be between');
        });

        it('should return empty string for empty value', () => {
            const validator = rangeDate(new Date('2024-01-01'), new Date('2024-12-31'));
            expect(validator('')).toBe('');
        });

        it('should use custom message', () => {
            const validator = rangeDate(
                new Date('2024-01-01'),
                new Date('2024-12-31'),
                'Date out of range'
            );
            expect(validator(new Date('2023-01-01'))).toBe('Date out of range');
        });

        it('should handle string date inputs', () => {
            const validator = rangeDate('2024-01-01', '2024-12-31');
            expect(validator('2024-06-15')).toBe('');
            expect(validator('2023-12-31')).toContain('must be between');
        });

        it('should reject invalid date format', () => {
            const validator = rangeDate(new Date('2024-01-01'), new Date('2024-12-31'));
            expect(validator('invalid-date')).toContain('Invalid date format');
        });

        it('should handle same day range', () => {
            const sameDate = new Date('2024-06-15');
            const validator = rangeDate(sameDate, sameDate);
            expect(validator(sameDate)).toBe('');
        });
    });
});