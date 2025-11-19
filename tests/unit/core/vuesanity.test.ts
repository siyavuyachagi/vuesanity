// tests/unit/core/vuesanity.test.ts
import { describe, it, expect } from 'vitest';
import { reactive } from 'vue';
import VueSanity, { required, email, minChars } from '../../../src';
import type ModelConfig from '../../../src/types';

describe('VueSanity Core', () => {
    describe('Initialization', () => {
        it('should create instance with valid model config', () => {
            const model: ModelConfig = reactive({
                email: { value: '', validations: [required()], errors: [] }
            });

            const validator = new VueSanity(model);
            expect(validator).toBeInstanceOf(VueSanity);
        });

        it('should have all required public properties', () => {
            const model: ModelConfig = reactive({
                email: { value: '', validations: [], errors: [] }
            });

            const validator = new VueSanity(model);
            expect(validator).toHaveProperty('errors');
            expect(validator).toHaveProperty('isValid');
            expect(validator).toHaveProperty('normalizedModel');
            expect(validator).toHaveProperty('formData');
        });

        it('should validate on initialization', () => {
            const model: ModelConfig = reactive({
                email: { value: '', validations: [required('Required')], errors: [] }
            });

            const validator = new VueSanity(model);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toHaveProperty('email');
        });
    });

    describe('Validation State', () => {
        it('should mark form as invalid when validation fails', () => {
            const model: ModelConfig = reactive({
                email: { value: '', validations: [required()], errors: [] }
            });

            const validator = new VueSanity(model);
            expect(validator.isValid).toBe(false);
        });

        it('should mark form as valid when all validations pass', () => {
            const model: ModelConfig = reactive({
                email: { value: 'test@example.com', validations: [required(), email()], errors: [] }
            });

            const validator = new VueSanity(model);
            expect(validator.isValid).toBe(true);
        });

        it('should populate errors object with field errors', () => {
            const model: ModelConfig = reactive({
                email: { value: 'invalid', validations: [email()], errors: [] },
                password: { value: '', validations: [required('Required')], errors: [] }
            });

            const validator = new VueSanity(model);
            expect(validator.errors.email).toBeDefined();
            expect(validator.errors.password).toBeDefined();
            expect(validator.errors.email[0]).toBe('Invalid email format');
            expect(validator.errors.password[0]).toBe('Required');
        });

        it('should populate model field errors', () => {
            const model: ModelConfig = reactive({
                email: { value: '', validations: [required('Required')], errors: [] }
            });

            const validator = new VueSanity(model);
            expect(model.email.errors!).toHaveLength(1);
            expect(model.email.errors![0]).toBe('Required');
        });
    });

    describe('Normalized Model', () => {
        it('should return empty object when validation fails', () => {
            const model: ModelConfig = reactive({
                email: { value: '', validations: [required()], errors: [] }
            });

            const validator = new VueSanity(model);
            expect(validator.normalizedModel).toEqual({});
        });

        it('should return clean data when validation passes', () => {
            const model: ModelConfig = reactive({
                email: { value: 'test@example.com', validations: [email()], errors: [] },
                password: { value: 'password123', validations: [minChars(8)], errors: [] }
            });

            const validator = new VueSanity(model);
            expect(validator.normalizedModel).toEqual({
                email: 'test@example.com',
                password: 'password123'
            });
        });

        it('should exclude fields with errors from normalized model', () => {
            const model: ModelConfig = reactive({
                email: { value: 'invalid', validations: [email()], errors: [] },
                password: { value: 'password123', validations: [minChars(8)], errors: [] }
            });

            const validator = new VueSanity(model);
            expect(validator.normalizedModel).not.toHaveProperty('email');
        });
    });

    describe('FormData Generation', () => {
        it('should generate FormData when validation passes', () => {
            const model: ModelConfig = reactive({
                name: { value: 'John', validations: [required()], errors: [] },
                email: { value: 'john@example.com', validations: [email()], errors: [] }
            });

            const validator = new VueSanity(model);
            expect(validator.formData).toBeInstanceOf(FormData);
            expect(validator.formData.get('name')).toBe('John');
            expect(validator.formData.get('email')).toBe('john@example.com');
        });

        it('should handle array values in FormData', () => {
            const files = [new File([''], 'test1.txt'), new File([''], 'test2.txt')];
            const model: ModelConfig = reactive({
                files: { value: files, validations: [], errors: [] }
            });

            const validator = new VueSanity(model);
            expect(validator.formData.getAll('files')).toHaveLength(2);
        });

        it('should not generate FormData when validation fails', () => {
            const model: ModelConfig = reactive({
                email: { value: '', validations: [required()], errors: [] }
            });

            const validator = new VueSanity(model);
            expect([...validator.formData.entries()]).toHaveLength(0);
        });
    });

    describe('Multiple Validations', () => {
        it('should run all validations on a field', () => {
            const model: ModelConfig = reactive({
                password: {
                    value: 'short',
                    validations: [required(), minChars(8, 'Too short')],
                    errors: []
                }
            });

            const validator = new VueSanity(model);
            expect(model.password.errors).toContain('Too short');
        });

        it('should stop at first error per validation', () => {
            const model: ModelConfig = reactive({
                email: {
                    value: 'invalid',
                    validations: [required(), email('Bad format')],
                    errors: []
                }
            });

            const validator = new VueSanity(model);
            expect(model.email.errors).toHaveLength(1);
            expect(model.email.errors![0]).toBe('Invalid email format');
        });
    });

    describe('Array Field Validation', () => {
        it('should validate each item in array field', () => {
            const model: ModelConfig = reactive({
                tags: {
                    value: ['', 'valid'],
                    validations: [required('Required')],
                    errors: []
                }
            });

            const validator = new VueSanity(model);
            expect(validator.isValid).toBe(false);
            expect(model.tags.errors).toHaveLength(1);
        });

        it('should pass when all array items are valid', () => {
            const model: ModelConfig = reactive({
                tags: {
                    value: ['tag1', 'tag2'],
                    validations: [required()],
                    errors: []
                }
            });

            const validator = new VueSanity(model);
            expect(validator.isValid).toBe(true);
        });
    });

    describe('Clean Values Option', () => {
        it('should clear values after successful validation by default', () => {
            const model: ModelConfig = reactive({
                email: { value: 'test@example.com', validations: [email()], errors: [] }
            });

            const validator = new VueSanity(model);
            expect(model.email.value).toBeNull();
        });

        it('should not clear values when cleanValues is false', () => {
            const model: ModelConfig = reactive({
                email: { value: 'test@example.com', validations: [email()], errors: [] }
            });

            const validator = new VueSanity(model, false);
            expect(model.email.value).toBe('test@example.com');
        });

        it('should not clear values when validation fails', () => {
            const model: ModelConfig = reactive({
                email: { value: 'invalid', validations: [email()], errors: [] }
            });

            const validator = new VueSanity(model);
            expect(model.email.value).toBe('invalid');
        });
    });

    describe('Static Methods', () => {
        it('should have getFormData static method', () => {
            expect(VueSanity.getFormData).toBeDefined();
            expect(typeof VueSanity.getFormData).toBe('function');
        });

        it('should convert object to FormData via static method', () => {
            const data = { name: 'John', age: 30 };
            const formData = VueSanity.getFormData(data);

            expect(formData).toBeInstanceOf(FormData);
            expect(formData.get('name')).toBe('John');
            expect(formData.get('age')).toBe('30');
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty model config', () => {
            const model: ModelConfig = reactive({});
            const validator = new VueSanity(model);

            expect(validator.isValid).toBe(true);
            expect(validator.errors).toEqual({});
        });

        it('should handle field without validations', () => {
            const model: ModelConfig = reactive({
                name: { value: 'John', errors: [] }
            });

            const validator = new VueSanity(model);
            expect(validator.isValid).toBe(true);
        });

        it('should handle null and undefined values', () => {
            const model: ModelConfig = reactive({
                field1: { value: null, validations: [], errors: [] },
                field2: { value: undefined, validations: [], errors: [] }
            });

            const validator = new VueSanity(model);
            expect(validator.isValid).toBe(true);
        });

        it('should handle special characters in field values', () => {
            const model: ModelConfig = reactive({
                text: {
                    value: '<script>alert("xss")</script>',
                    validations: [required()],
                    errors: []
                }
            });

            const validator = new VueSanity(model);
            expect(validator.isValid).toBe(true);
            expect(validator.normalizedModel).toHaveProperty('text');
        });
    });

    describe('Reactivity', () => {
        it('should work with Vue reactive objects', () => {
            const model = reactive({
                email: { value: '', validations: [required()], errors: [] }
            });

            const validator = new VueSanity(model);
            expect(validator.isValid).toBe(false);
        });

        it('should maintain reactivity after validation', () => {
            const model = reactive({
                email: { value: 'test@example.com', validations: [email()], errors: [] }
            });

            new VueSanity(model, false);
            model.email.value = 'updated@example.com';

            expect(model.email.value).toBe('updated@example.com');
        });
    });
});