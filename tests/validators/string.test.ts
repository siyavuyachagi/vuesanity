// tests/unit/validators/string.test.ts
import { describe, it, expect } from 'vitest';
import VueSanity, {
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
  numeric,
  createModel,
  password,
  differentFrom,
  ModelConfig
} from '../../src';
import { RegisterDto } from '../types/register-dto';
import { reactive } from 'vue';

describe('String Validators', () => {

  describe('1. alpha()', () => {
    it('should allow only letters with spaces by default', () => {
      const registerDto = createModel<RegisterDto>({
        notes: { value: 'Hello world', validations: [alpha(false)] },
      });

      const validator = new VueSanity(registerDto);
      expect(validator.errors.notes).toHaveLength(1);
      expect(validator.errors.notes).toContain('Only alphabetic characters are allowed');
    });

    it('should disallow spaces when specified', () => {
      const registerDto = createModel<RegisterDto>({
        notes: { value: 'Hello world', validations: [alpha(false)] },
      });

      const validator = new VueSanity(registerDto);
      expect(validator.errors.notes).toHaveLength(1);
      expect(validator.errors.notes).toContain('Only alphabetic characters are allowed');
    });

    it('should return empty string for empty value', () => {
      const registerDto = createModel<RegisterDto>({
        userName: { value: 'johndoe', validations: [alpha()] },
        notes: { value: 'Hello world', validations: [alpha(false)] },
      });

      const validator = new VueSanity(registerDto);
      expect(validator.errors.userName).toBeUndefined();
      expect(validator.errors.notes).toHaveLength(1);
      expect(validator.errors.notes).toContain('Only alphabetic characters are allowed');
    });

    it('should use custom message', () => {
      const registerDto = createModel<RegisterDto>({
        notes: { value: 'Hello123', validations: [alpha(true, 'Letters only please')] },
      });

      const validator = new VueSanity(registerDto);
      expect(validator.errors.notes).toHaveLength(1);
      expect(validator.errors.notes).toContain('Letters only please');
    });

    it('should accept both uppercase and lowercase', () => {
      const registerDto = createModel<RegisterDto>({
        notes: { value: 'AbCdEf', validations: [alpha()] },
      });

      const validator = new VueSanity(registerDto);
      expect(validator.errors.notes).toBeUndefined();
    });

  });

  describe('2. alphanumeric()', () => {
    it('should allow letters and numbers without spaces by default', () => {
      const validator = alphanumeric();
      expect(validator('Hello123')).toBeNull;
      expect(validator('Hello@123')).toBe('Only alphanumeric characters are allowed');
      expect(validator('Hello 123')).toBe('Only alphanumeric characters are allowed');
    });

    it('should allow spaces when specified', () => {
      const validator = alphanumeric(true);
      expect(validator('Hello 123')).toBeNull;
    });

    it('should return null for empty value', () => {
      const validator = alphanumeric();
      expect(validator('')).toBeNull;
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

  describe('3. chars()', () => {
    it('should enforce exact length', () => {
      const validator = chars(5);
      expect(validator('hi')).toBe('Number of characters required is 5');
      expect(validator('hello world')).toBe('Number of characters required is 5');
      expect(validator('hello')).toBeNull;
    });

    it('should return null for empty value', () => {
      const validator = chars(5);
      expect(validator('')).toBeNull;
    });

    it('should use custom message', () => {
      const validator = chars(5, 'Must be exactly 5 chars');
      expect(validator('hi')).toBe('Must be exactly 5 chars');
    });
  });

  describe("4. differentFrom()", () => {
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

  describe('5. email()', () => {
    it('should validate correct email format', () => {
      const validator = email();
      expect(validator('test@example.com')).toBeNull;
      expect(validator('test@example.co.za')).toBeNull;
    });

    it('should reject invalid email format', () => {
      const validator = email();
      expect(validator('invalid')).toBe('Invalid email format');
      expect(validator('test@')).toBe('Invalid email format');
      expect(validator('@example.com')).toBe('Invalid email format');
      expect(validator('test@example')).toBe('Invalid email format');
    });

    it('should return null for empty value', () => {
      const validator = email();
      expect(validator('')).toBeNull;
    });

    it('should restrict to specific domains', () => {
      const validator = email(['gmail.com', 'outlook.com'], 'Email domain is not allowed');
      expect(validator('test@gmail.com')).toBeNull;
      expect(validator('test@outlook.com')).toBeNull;
      expect(validator('test@yahoo.com')).toBe('Email domain is not allowed');
    });

    it('should use custom message', () => {
      const validator = email([], 'Custom email error');
      expect(validator('invalid')).toBe('Custom email error');
    });

    it('should handle subdomains', () => {
      const validator = email();
      expect(validator('test@mail.example.com')).toBeNull;
    });

    it('should handle plus addressing', () => {
      const validator = email();
      expect(validator('test+tag@example.com')).toBeNull;
    });
  });

  describe('6. maxChars()', () => {
    it('should enforce maximum length', () => {
      const validator = maxChars(5);
      expect(validator('hello world')).toBe('Maximum length of 5 characters required');
      expect(validator('hello')).toBeNull;
    });

    it('should return empty string for empty value', () => {
      const validator = maxChars(5);
      expect(validator('')).toBeNull;
    });

    it('should use custom message', () => {
      const validator = maxChars(5, 'Too long');
      expect(validator('hello world')).toBe('Too long');
    });

    it('should accept exact maximum length', () => {
      const validator = maxChars(5);
      expect(validator('12345')).toBeNull;
    });
  });

  describe('7. minChars()', () => {
    it('should enforce minimum length', () => {
      const validator = minChars(5);
      expect(validator('hi')).toBe('Minimum length of 5 characters required');
      expect(validator('hello')).toBeNull;
    });

    it('should return empty string for empty value', () => {
      const validator = minChars(5);
      expect(validator('')).toBeNull;
    });

    it('should use custom message', () => {
      const validator = minChars(5, 'Too short');
      expect(validator('hi')).toBe('Too short');
    });

    it('should accept exact minimum length', () => {
      const validator = minChars(5);
      expect(validator('12345')).toBeNull;
    });

    it('should count special characters', () => {
      const validator = minChars(5);
      expect(validator('a@#$')).toBe('Minimum length of 5 characters required');
      expect(validator('a@#$b')).toBeNull;
    });

    it('should count spaces', () => {
      const validator = minChars(5);
      expect(validator('a b c')).toBeNull;
    });
  });

  describe('8. numeric()', () => {
    it('should allow only integers by default', () => {
      const validator = numeric();
      expect(validator('123')).toBeNull;
      expect(validator('12.5')).toBe('Only numeric values are allowed');
    });

    it('should allow decimals when specified', () => {
      const validator = numeric(true);
      expect(validator('12.5')).toBeNull;
      expect(validator('12.5.5')).toBe('Only numeric values are allowed');
    });

    it('should allow negative numbers when specified', () => {
      const validator = numeric(false, true);
      expect(validator('-123')).toBeNull;
      expect(validator('123')).toBeNull;
    });

    it('should allow negative decimals when both specified', () => {
      const validator = numeric(true, true);
      expect(validator('-12.5')).toBeNull;
    });

    it('should return empty string for empty value', () => {
      const validator = numeric();
      expect(validator('')).toBeNull;
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
      expect(validator(123)).toBeNull;
    });
  });

  describe("9. password()", () => {
    it("fails if fewer than 6 characters", () => {
      const registerDto = createModel<RegisterDto>({
        password: { value: 'aaaaa', validations: [password()] },
      });

      const validator = new VueSanity(registerDto);

      expect(validator.isValid).toBe(false);
      expect(validator.errors.password).toContain("Password must have 6 characters or more");
    });

    it("fails if all characters are the same (case-insensitive)", () => {
      const registerDto = createModel<RegisterDto>({
        password: { value: 'AAAAAA', validations: [password()] },
      });

      const validator = new VueSanity(registerDto);

      expect(validator.isValid).toBe(false);
      expect(validator.errors.password).toContain("Password cannot consist of the same repeated character");
    });

    it("fails if no special character", () => {
      const registerDto = createModel<RegisterDto>({
        password: { value: 'ABCdefG', validations: [password()] },
      });

      const validator = new VueSanity(registerDto);

      expect(validator.isValid).toBe(false);
      expect(validator.errors.password).toContain("Password must include at least one special character");
    });

    it("passes when password is valid", () => {
      const registerDto = createModel<RegisterDto>({
        password: { value: 'Abcde!', validations: [password()] },
      });

      const validator = new VueSanity(registerDto);

      expect(validator.isValid).toBe(true);
      expect(validator.errors.password).toBeUndefined();
    });
  });

  describe('10. phone()', () => {
    it('should validate E.164 format', () => {
      const validator = phone();
      expect(validator('+12125551234')).toBeNull;
      expect(validator('+447911123456')).toBeNull;
    });

    it('should return empty string for empty value', () => {
      const validator = phone();
      expect(validator('')).toBeNull;
    });

    it('should handle numbers as input', () => {
      const validator = phone();
      expect(validator(12125551234)).toBeNull;
    });

    it('should use custom message', () => {
      const validator = phone(undefined, 'Invalid phone');
      expect(validator('invalid')).toBe('Invalid phone');
    });

    it('should validate country-specific numbers', () => {
      const validatorZA = phone('ZA');
      expect(validatorZA('+27821234567')).toBeNull;
      expect(validatorZA('0821234567')).toBeNull;

      const validatorUS = phone('US');
      expect(validatorUS('+12125551234')).toBeNull;
      expect(validatorUS('2125551234')).toBeNull;
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

  describe('11. regex()', () => {
    it('should validate against custom pattern', () => {
      const validator = regex(/^[A-Z]{3}\d{3}$/);
      expect(validator('ABC123')).toBeNull;
      expect(validator('abc123')).toBe('Value does not match the required pattern');
    });

    it('should return empty string for empty value', () => {
      const validator = regex(/test/);
      expect(validator('')).toBeNull;
    });

    it('should use custom message', () => {
      const validator = regex(/^\d+$/, 'Must be numbers only');
      expect(validator('abc')).toBe('Must be numbers only');
    });

    it('should handle complex patterns', () => {
      const validator = regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/);
      expect(validator('Password1')).toBeNull;
      expect(validator('password')).toBe('Value does not match the required pattern');
    });
  });

  describe('12. required()', () => {
    it('should return error for empty string', () => {
      const validator = required('Required');
      expect(validator('')).toBe('Required');
    });

    it('should return error for null', () => {
      const validator = required();
      expect(validator(null)).toBe('This field is required');
    });

    it('should return error for undefined', () => {
      const validator = required();
      expect(validator(undefined)).toBe('This field is required');
    });

    it('should return error for whitespace only', () => {
      const validator = required();
      expect(validator('   ')).toBe('This field is required');
    });

    it('should pass for valid string', () => {
      const validator = required();
      expect(validator('hello')).toBeNull;
    });

    it('should use custom message', () => {
      const validator = required('Custom required message');
      expect(validator('')).toBe('Custom required message');
    });

    it('should pass for number zero', () => {
      const validator = required();
      expect(validator(0)).toBeNull;
    });

    it('should pass for boolean false', () => {
      const validator = required();
      expect(validator(false)).toBeNull;
    });
  });

  describe('13. sameAs()', () => {
    it('should compare with direct value', () => {
      const model = reactive<ModelConfig<RegisterDto>>({
        password: { value: 'password@123', validations: [password()] },
        confirmPassword: { value: 'password@123', validations: [sameAs(() => model.password?.value)] }
      });

      const validator = new VueSanity(model);
      console.log(model, validator)
      expect(validator.errors.password).toBeUndefined();
      expect(validator.errors.confirmPassword).toBeUndefined();
    });

    it('should fail when values dont match', () => {
      const model = reactive<ModelConfig<RegisterDto>>({
        password: { value: 'Pass@123', validations: [password()] },
        confirmPassword: { value: 'password@123', validations: [sameAs(() => model.password?.value)] }
      });

      const validator = new VueSanity(model);
      expect(validator.isValid).toBe(false);
      expect(validator.errors.confirmPassword).toContain("Values don't match");
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

  describe('14. url()', () => {
    it('should validate correct URL format', () => {
      const validator = url();
      expect(validator('https://example.com')).toBeNull;
      expect(validator('http://example.com')).toBeNull;
      expect(validator('https://www.example.com/path?query=1')).toBeNull;
    });

    it('should reject invalid URL format', () => {
      const validator = url();
      expect(validator('not-a-url')).toBe('Invalid URL format');
      expect(validator('example.com')).toBe('Invalid URL format');
    });

    it('should return empty string for empty value', () => {
      const validator = url();
      expect(validator('')).toBeNull;
    });

    it('should use custom message', () => {
      const validator = url('Invalid website URL');
      expect(validator('invalid')).toBe('Invalid website URL');
    });

    it('should validate URLs with ports', () => {
      const validator = url();
      expect(validator('http://localhost:3000')).toBeNull;
    });

    it('should validate FTP URLs', () => {
      const validator = url();
      expect(validator('ftp://example.com')).toBeNull;
    });
  });













})