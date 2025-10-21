// tests/unit/validators/number.test.ts
import { describe, it, expect } from 'vitest';
import { minNumber, maxNumber, rangeNumber } from '../../../src/validators/number';

describe('Number Validators', () => {
  describe('minNumber()', () => {
    it('should accept value above minimum', () => {
      const validator = minNumber(10);
      expect(validator(15)).toBe('');
    });

    it('should accept value at minimum', () => {
      const validator = minNumber(10);
      expect(validator(10)).toBe('');
    });

    it('should reject value below minimum', () => {
      const validator = minNumber(10);
      expect(validator(5)).toContain('must be at least 10');
    });

    it('should return empty string for empty value', () => {
      const validator = minNumber(10);
      expect(validator('')).toBe('');
      expect(validator(null)).toBe('');
      expect(validator(undefined)).toBe('');
    });

    it('should use custom message', () => {
      const validator = minNumber(10, 'Too small');
      expect(validator(5)).toBe('Too small');
    });

    it('should handle string numbers', () => {
      const validator = minNumber(10);
      expect(validator('15')).toBe('');
      expect(validator('5')).toContain('must be at least');
    });

    it('should handle negative numbers', () => {
      const validator = minNumber(-10);
      expect(validator(-5)).toBe('');
      expect(validator(-15)).toContain('must be at least');
    });

    it('should handle decimal numbers', () => {
      const validator = minNumber(10.5);
      expect(validator(10.6)).toBe('');
      expect(validator(10.4)).toContain('must be at least');
    });

    it('should reject NaN', () => {
      const validator = minNumber(10);
      expect(validator('not a number')).toContain('must be at least');
    });
  });

  describe('maxNumber()', () => {
    it('should accept value below maximum', () => {
      const validator = maxNumber(100);
      expect(validator(50)).toBe('');
    });

    it('should accept value at maximum', () => {
      const validator = maxNumber(100);
      expect(validator(100)).toBe('');
    });

    it('should reject value above maximum', () => {
      const validator = maxNumber(100);
      expect(validator(150)).toContain('cannot exceed 100');
    });

    it('should return empty string for empty value', () => {
      const validator = maxNumber(100);
      expect(validator('')).toBe('');
      expect(validator(null)).toBe('');
      expect(validator(undefined)).toBe('');
    });

    it('should use custom message', () => {
      const validator = maxNumber(100, 'Too large');
      expect(validator(150)).toBe('Too large');
    });

    it('should handle string numbers', () => {
      const validator = maxNumber(100);
      expect(validator('50')).toBe('');
      expect(validator('150')).toContain('cannot exceed');
    });

    it('should handle negative numbers', () => {
      const validator = maxNumber(-10);
      expect(validator(-15)).toBe('');
      expect(validator(-5)).toContain('cannot exceed');
    });

    it('should handle decimal numbers', () => {
      const validator = maxNumber(100.5);
      expect(validator(100.4)).toBe('');
      expect(validator(100.6)).toContain('cannot exceed');
    });
  });

  describe('rangeNumber()', () => {
    it('should accept value within range', () => {
      const validator = rangeNumber(10, 100);
      expect(validator(50)).toBe('');
    });

    it('should accept value at minimum bound', () => {
      const validator = rangeNumber(10, 100);
      expect(validator(10)).toBe('');
    });

    it('should accept value at maximum bound', () => {
      const validator = rangeNumber(10, 100);
      expect(validator(100)).toBe('');
    });

    it('should reject value below range', () => {
      const validator = rangeNumber(10, 100);
      expect(validator(5)).toContain('must be between 10 and 100');
    });

    it('should reject value above range', () => {
      const validator = rangeNumber(10, 100);
      expect(validator(150)).toContain('must be between 10 and 100');
    });

    it('should return empty string for empty value', () => {
      const validator = rangeNumber(10, 100);
      expect(validator('')).toBe('');
      expect(validator(null)).toBe('');
      expect(validator(undefined)).toBe('');
    });

    it('should use custom message', () => {
      const validator = rangeNumber(10, 100, 'Out of bounds');
      expect(validator(5)).toBe('Out of bounds');
    });

    it('should handle negative ranges', () => {
      const validator = rangeNumber(-100, -10);
      expect(validator(-50)).toBe('');
      expect(validator(-5)).toContain('must be between');
    });

    it('should handle decimal ranges', () => {
      const validator = rangeNumber(1.5, 2.5);
      expect(validator(2.0)).toBe('');
      expect(validator(1.0)).toContain('must be between');
    });
  });
});
