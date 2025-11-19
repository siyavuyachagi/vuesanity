// tests/unit/validators/string.test.ts
import { describe, it, expect } from 'vitest';
import {
  required,
  email,
  minChars,
  maxChars,
  chars,
  phone,
  sameAs,
  url,
  regex,
  alpha,
  alphanumeric,
  numeric
} from '../../../src';

describe('String Validators', () => {
  describe('required()', () => {
    it('should return error for empty string', () => {
      const validator = required('Required');
      expect(validator('')).toBe('Required');
    });

    it('should return error for null', () => {
      const validator = required();
      expect(validator(null)).toBe('This field is required!');
    });

    it('should return error for undefined', () => {
      const validator = required();
      expect(validator(undefined)).toBe('This field is required!');
    });

    it('should return error for whitespace only', () => {
      const validator = required();
      expect(validator('   ')).toBe('This field is required!');
    });

    it('should pass for valid string', () => {
      const validator = required();
      expect(validator('hello')).toBe('');
    });

    it('should use custom message', () => {
      const validator = required('Custom required message');
      expect(validator('')).toBe('Custom required message');
    });

    it('should pass for number zero', () => {
      const validator = required();
      expect(validator(0)).toBe('');
    });

    it('should pass for boolean false', () => {
      const validator = required();
      expect(validator(false)).toBe('');
    });
  });

  describe('email()', () => {
    it('should validate correct email format', () => {
      const validator = email();
      expect(validator('test@example.com')).toBe('');
    });

    it('should reject invalid email format', () => {
      const validator = email();
      expect(validator('invalid')).toBe('Invalid email format');
      expect(validator('test@')).toBe('Invalid email format');
      expect(validator('@example.com')).toBe('Invalid email format');
      expect(validator('test@example')).toBe('Invalid email format');
    });

    it('should return empty string for empty value', () => {
      const validator = email();
      expect(validator('')).toBe('');
    });

    it('should restrict to specific domains', () => {
      const validator = email(['gmail.com', 'outlook.com'], 'Email domain is not allowed');
      expect(validator('test@gmail.com')).toBe('');
      expect(validator('test@outlook.com')).toBe('');
      expect(validator('test@yahoo.com')).toBe('Email domain is not allowed');
    });

    it('should use custom message', () => {
      const validator = email([], 'Custom email error');
      expect(validator('invalid')).toBe('Custom email error');
    });

    it('should handle subdomains', () => {
      const validator = email();
      expect(validator('test@mail.example.com')).toBe('');
    });

    it('should handle plus addressing', () => {
      const validator = email();
      expect(validator('test+tag@example.com')).toBe('');
    });
  });

  describe('minChars()', () => {
    it('should enforce minimum length', () => {
      const validator = minChars(5);
      expect(validator('hi')).toBe('Minimum length of 5 characters required');
      expect(validator('hello')).toBe('');
    });

    it('should return empty string for empty value', () => {
      const validator = minChars(5);
      expect(validator('')).toBe('');
    });

    it('should use custom message', () => {
      const validator = minChars(5, 'Too short');
      expect(validator('hi')).toBe('Too short');
    });

    it('should accept exact minimum length', () => {
      const validator = minChars(5);
      expect(validator('12345')).toBe('');
    });

    it('should count special characters', () => {
      const validator = minChars(5);
      expect(validator('a@#$')).toBe('Minimum length of 5 characters required');
      expect(validator('a@#$b')).toBe('');
    });

    it('should count spaces', () => {
      const validator = minChars(5);
      expect(validator('a b c')).toBe('');
    });
  });

  describe('maxChars()', () => {
    it('should enforce maximum length', () => {
      const validator = maxChars(5);
      expect(validator('hello world')).toBe('Maximum length of 5 characters required');
      expect(validator('hello')).toBe('');
    });

    it('should return empty string for empty value', () => {
      const validator = maxChars(5);
      expect(validator('')).toBe('');
    });

    it('should use custom message', () => {
      const validator = maxChars(5, 'Too long');
      expect(validator('hello world')).toBe('Too long');
    });

    it('should accept exact maximum length', () => {
      const validator = maxChars(5);
      expect(validator('12345')).toBe('');
    });
  });

  describe('chars()', () => {
    it('should enforce exact length', () => {
      const validator = chars(5);
      expect(validator('hi')).toBe('Number of characters required is 5!');
      expect(validator('hello world')).toBe('Number of characters required is 5!');
      expect(validator('hello')).toBe('');
    });

    it('should return empty string for empty value', () => {
      const validator = chars(5);
      expect(validator('')).toBe('');
    });

    it('should use custom message', () => {
      const validator = chars(5, 'Must be exactly 5 chars');
      expect(validator('hi')).toBe('Must be exactly 5 chars');
    });
  });

  describe('phone()', () => {
    it('should validate E.164 format', () => {
      const validator = phone();
      expect(validator('+12125551234')).toBe('');
      expect(validator('+447911123456')).toBe('');
    });

    it('should return empty string for empty value', () => {
      const validator = phone();
      expect(validator('')).toBe('');
    });

    it('should handle numbers as input', () => {
      const validator = phone();
      expect(validator(12125551234)).toBe('');
    });

    it('should use custom message', () => {
      const validator = phone(undefined, 'Invalid phone');
      expect(validator('invalid')).toBe('Invalid phone');
    });

    it('should validate country-specific numbers', () => {
      const validatorZA = phone('ZA');
      expect(validatorZA('+27821234567')).toBe('');
      expect(validatorZA('0821234567')).toBe('');

      const validatorUS = phone('US');
      expect(validatorUS('+12125551234')).toBe('');
      expect(validatorUS('2125551234')).toBe('');
    });

    it('should reject invalid country code', () => {
      const validator = phone('XX');
      expect(validator('123456789')).toBe('Invalid country code');
    });

    it('should reject numbers that are too short or too long for country', () => {
      const validatorZA = phone('ZA');
      expect(validatorZA('0123')).toContain('Phone number too short');
      expect(validatorZA('012345678901234')).toContain('Phone number too long');
    });

    it('should reject invalid country codes in E.164 format', () => {
      const validator = phone();
      expect(validator('+999123456789')).toContain('Invalid country code');
    });
  });

  describe('sameAs()', () => {
    it('should compare with direct value', () => {
      const validator = sameAs('password123');
      expect(validator('password123')).toBe('');
      expect(validator('different')).toBe("Values don't match");
    });

    it('should compare with function value', () => {
      let compareValue = 'password123';
      const validator = sameAs(() => compareValue);
      expect(validator('password123')).toBe('');
      expect(validator('different')).toBe("Values don't match");
    });

    it('should return empty string for empty value', () => {
      const validator = sameAs('test');
      expect(validator('')).toBe('');
    });

    it('should use custom message', () => {
      const validator = sameAs('test', 'Passwords must match');
      expect(validator('different')).toBe('Passwords must match');
    });

    it('should handle null comparison', () => {
      const validator = sameAs(null);
      expect(validator(null)).toBe('');
    });
  });

  describe('url()', () => {
    it('should validate correct URL format', () => {
      const validator = url();
      expect(validator('https://example.com')).toBe('');
      expect(validator('http://example.com')).toBe('');
      expect(validator('https://www.example.com/path?query=1')).toBe('');
    });

    it('should reject invalid URL format', () => {
      const validator = url();
      expect(validator('not-a-url')).toBe('Invalid URL format');
      expect(validator('example.com')).toBe('Invalid URL format');
    });

    it('should return empty string for empty value', () => {
      const validator = url();
      expect(validator('')).toBe('');
    });

    it('should use custom message', () => {
      const validator = url('Invalid website URL');
      expect(validator('invalid')).toBe('Invalid website URL');
    });

    it('should validate URLs with ports', () => {
      const validator = url();
      expect(validator('http://localhost:3000')).toBe('');
    });

    it('should validate FTP URLs', () => {
      const validator = url();
      expect(validator('ftp://example.com')).toBe('');
    });
  });

  describe('regex()', () => {
    it('should validate against custom pattern', () => {
      const validator = regex(/^[A-Z]{3}\d{3}$/);
      expect(validator('ABC123')).toBe('');
      expect(validator('abc123')).toBe('Value does not match the required pattern');
    });

    it('should return empty string for empty value', () => {
      const validator = regex(/test/);
      expect(validator('')).toBe('');
    });

    it('should use custom message', () => {
      const validator = regex(/^\d+$/, 'Must be numbers only');
      expect(validator('abc')).toBe('Must be numbers only');
    });

    it('should handle complex patterns', () => {
      const validator = regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/);
      expect(validator('Password1')).toBe('');
      expect(validator('password')).toBe('Value does not match the required pattern');
    });
  });

  describe('alpha()', () => {
    it('should allow only letters with spaces by default', () => {
      const validator = alpha();
      expect(validator('Hello World')).toBe('');
      expect(validator('Hello123')).toBe('Only alphabetic characters are allowed');
    });

    it('should disallow spaces when specified', () => {
      const validator = alpha(false);
      expect(validator('HelloWorld')).toBe('');
      expect(validator('Hello World')).toBe('Only alphabetic characters are allowed');
    });

    it('should return empty string for empty value', () => {
      const validator = alpha();
      expect(validator('')).toBe('');
    });

    it('should use custom message', () => {
      const validator = alpha(true, 'Letters only please');
      expect(validator('Hello123')).toBe('Letters only please');
    });

    it('should accept both uppercase and lowercase', () => {
      const validator = alpha();
      expect(validator('AbCdEf')).toBe('');
    });
  });

  describe('alphanumeric()', () => {
    it('should allow letters and numbers without spaces by default', () => {
      const validator = alphanumeric();
      expect(validator('Hello123')).toBe('');
      expect(validator('Hello 123')).toBe('Only alphanumeric characters are allowed');
    });

    it('should allow spaces when specified', () => {
      const validator = alphanumeric(true);
      expect(validator('Hello 123')).toBe('');
    });

    it('should return empty string for empty value', () => {
      const validator = alphanumeric();
      expect(validator('')).toBe('');
    });

    it('should reject special characters', () => {
      const validator = alphanumeric();
      expect(validator('Hello@123')).toBe('Only alphanumeric characters are allowed');
    });

    it('should use custom message', () => {
      const validator = alphanumeric(false, 'Alphanumeric only');
      expect(validator('Hello!')).toBe('Alphanumeric only');
    });
  });

  describe('numeric()', () => {
    it('should allow only integers by default', () => {
      const validator = numeric();
      expect(validator('123')).toBe('');
      expect(validator('12.5')).toBe('Only numeric values are allowed');
    });

    it('should allow decimals when specified', () => {
      const validator = numeric(true);
      expect(validator('12.5')).toBe('');
      expect(validator('12.5.5')).toBe('Only numeric values are allowed');
    });

    it('should allow negative numbers when specified', () => {
      const validator = numeric(false, true);
      expect(validator('-123')).toBe('');
      expect(validator('123')).toBe('');
    });

    it('should allow negative decimals when both specified', () => {
      const validator = numeric(true, true);
      expect(validator('-12.5')).toBe('');
    });

    it('should return empty string for empty value', () => {
      const validator = numeric();
      expect(validator('')).toBe('');
    });

    it('should reject letters', () => {
      const validator = numeric();
      expect(validator('12a3')).toBe('Only numeric values are allowed');
    });

    it('should use custom message', () => {
      const validator = numeric(false, false, 'Numbers only');
      expect(validator('abc')).toBe('Numbers only');
    });

    it('should handle number type input', () => {
      const validator = numeric();
      expect(validator(123)).toBe('');
    });
  });
});