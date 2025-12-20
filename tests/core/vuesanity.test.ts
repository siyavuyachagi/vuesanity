// tests/unit/core/vuesanity.test.ts
import { describe, it, expect } from 'vitest';
import { reactive } from 'vue';
import VueSanity, { required, email, minChars, password, fileExtension, url, maxChars, numeric, mustBeFalse, mustBeTrue } from '../../src';
import { ModelConfig, createModel } from '../../src';
import { RegisterDto } from '../types/register-dto';


describe('VueSanity Core', () => {
    describe('Initialization', () => {
        it("1. should create instance with validated model config", () => {
            const registerDto = createModel<RegisterDto>({
                firstName: { validations: [required()] },
                lastName: { validations: [required()] },
                password: { validations: [password()] },
                acceptedTerms: { value: false },
            });

            const validator = new VueSanity(registerDto);

            expect(validator).toBeInstanceOf(VueSanity);
            expect(validator.isValid).toBe(false);
            expect(validator.errors.firstName).toContain("This field is required");
            expect(validator.errors.password).toContain("Password must have 6 characters or more");
        });

        it('2. should have all required public properties', () => {
            const registerDto = createModel<RegisterDto>({
                firstName: { validations: [required()] },
                lastName: { validations: [required()] },
            });

            const validator = new VueSanity(registerDto);
            expect(validator).toHaveProperty('errors');
            expect(validator).toHaveProperty('isValid');
            expect(validator).toHaveProperty('normalizedModel');
            expect(validator).toHaveProperty('formData');
        });

        it('3. should validate on initialization', () => {
            const model = createModel<RegisterDto>({
                firstName: { validations: [required()] },
            });

            const validator = new VueSanity(model);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toHaveProperty('firstName');
        });
    });

    describe('Validation State', () => {
        it('1. should mark form as invalid when validation fails', () => {
            const registerDto = createModel<RegisterDto>({
                firstName: { validations: [required()] },
            });

            const validator = new VueSanity(registerDto);
            expect(validator.isValid).toBe(false);
        });

        it('2. should mark form as valid when all validations pass', () => {
            const registerDto = createModel<RegisterDto>({
                firstName: { value: 'John', validations: [required()] },
                lastName: { value: 'Doe', validations: [required()] },
                password: { value: 'Pass@123', validations: [password()] },
                acceptedTerms: { validations: [mustBeFalse()] },
            });

            const validator = new VueSanity(registerDto);
            expect(validator.isValid).toBe(true);
        });

        it('3. should populate errors object with field errors', () => {
            const registerDto = createModel<RegisterDto>({
                firstName: { validations: [required()] },
                lastName: { validations: [required()] },
                email: { validations: [email()] },
                password: { validations: [password()] },
                acceptedTerms: { validations: [mustBeTrue()] },
            });

            const validator = new VueSanity(registerDto);
            expect(validator.errors.firstName).toContain('This field is required');
            expect(validator.errors.lastName).toContain('This field is required');
            expect(validator.errors.email).toBeUndefined; // null is truthy - specifically add required()
            expect(validator.errors.password).toContain('Password must have 6 characters or more');
            expect(validator.errors.acceptedTerms).toBeNull;
        });

        it('4. should populate model field errors', () => {
            const registerDto = createModel<RegisterDto>({
                firstName: { validations: [required()] },
                lastName: { validations: [required()] },
                email: { validations: [email()] },
                password: { validations: [password()] },
                acceptedTerms: { value: false, validations: [required(), mustBeTrue()] },
            });

            new VueSanity(registerDto);
            expect(registerDto.firstName?.errors).toContain('This field is required');
            expect(registerDto.lastName?.errors).toContain('This field is required');
            expect(registerDto.email?.errors).toBeUndefined; // null is truthy - specifically add required()
            expect(registerDto.password?.errors).toContain('Password must have 6 characters or more');
            expect(registerDto.acceptedTerms?.errors).toContain('Value must be true');
        });
    });

    describe('Normalized Model', () => {
        it('1. should return empty object when validation fails', () => {
            const model = createModel<RegisterDto>({
                email: { validations: [required()] },
            });

            const validator = new VueSanity(model);
            expect(validator.normalizedModel).toEqual({});
        });

        it('2. should return clean data when validation passes', () => {
            const model = createModel<RegisterDto>({
                email: { value: 'test@example.com', validations: [email()] },
                password: { value: 'Password123!', validations: [password()] },
                acceptedTerms: { value: true, validations: [mustBeTrue()] }
            });

            const validator = new VueSanity(model);

            expect(validator.isValid).toBe(true);
            expect(validator.formData).toBeInstanceOf(FormData);
            expect(validator.formData.get('email')).toBe('test@example.com');
            expect(validator.normalizedModel).toEqual({
                email: 'test@example.com',
                password: 'Password123!',
                acceptedTerms: true
            });
        });

        it('3. should exclude all fields on invalid from from normalized model', () => {
            const model = createModel<RegisterDto>({
                email: { value: 'test@example.com', validations: [email()] },
                password: { validations: [password()] },
                acceptedTerms: { value: false, validations: [mustBeTrue()] }
            });

            const validator = new VueSanity(model);
            expect(validator.normalizedModel).toStrictEqual({});
            expect(validator.normalizedModel).not.toHaveProperty('email');
        });
    });

    describe('FormData Generation', () => {
        it('1. should generate FormData when validation passes', () => {
            const model = createModel<RegisterDto>({
                firstName: { value: 'John', validations: [required()] },
                email: { value: 'john@yahoo.com', validations: [email()] },
                password: { value: 'Password123!', validations: [password()] },
                acceptedTerms: { value: true, validations: [mustBeTrue()] }
            });

            const validator = new VueSanity(model);
            expect(validator.formData).toBeInstanceOf(FormData);
            expect(validator.formData.get('firstName')).toBe('John');
            expect(validator.formData.get('email')).toBe('john@yahoo.com');
            expect(validator.formData.get('password')).toBe('Password123!');
            expect(validator.formData.get('acceptedTerms')).toBe('true');
        });

        it('2. should handle array values in FormData', () => {
            const files = [
                createMockFile('photo.png', 'image/png', 1),        // 1 MB
                createMockFile('photo.jpeg', 'image/jpeg', 2),      // 2 MB
                createMockFile('document.pdf', 'application/pdf', 3),// 3 MB
                createMockFile('presentation.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 4), // 4 MB
                createMockFile('spreadsheet.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 5), // 5 MB
                createMockFile('archive.zip', 'application/zip', 5), // 5 MB
            ];

            const model = createModel<RegisterDto>({
                documents: { value: files, validations: [required()] }
            });

            const validator = new VueSanity(model);
            expect(validator.formData.getAll('documents')).length.greaterThanOrEqual(6);
        });

        it('3. should not generate FormData when validation fails', () => {
            const model = createModel<RegisterDto>({
                email: { value: 'test@example.com', validations: [email()] },
                password: { validations: [password()] },
                acceptedTerms: { value: false, validations: [mustBeTrue()] }
            });

            const validator = new VueSanity(model);
            expect([...validator.formData.entries()]).toHaveLength(0);
        });
    });

    describe('Multiple Validations', () => {
        it('1. should run all validations on a field', () => {
            const model = reactive<ModelConfig<RegisterDto>>({
                notes: { value: 'cj', validations: [required(), minChars(8), maxChars(1), numeric(), url()] },
            }); 

            new VueSanity(model);
            expect(model.notes!.errors).toContain('Minimum length of 8 characters required');
            expect(model.notes!.errors).toContain('Maximum length of 1 characters required');
            expect(model.notes!.errors).toContain('Only numeric values are allowed');
            expect(model.notes!.errors).toContain('Invalid URL format');
        });

        it('2. should stop at first error per validation', () => {
            const model = createModel<RegisterDto>({
                email: { value: 'cj', validations: [required(), email()] },
            });

            new VueSanity(model);
            expect(model.email!.errors).toHaveLength(1);
            expect(model.email!.errors![0]).toBe('Invalid email format');
        });
    });

    describe('Array Field Validation', () => {
        it('1. should fail if one of the items if falsey', () => {
            const files = [
                createMockFile('photo.png', 'image/png', 1),        // 1 MB
                createMockFile('document.pdf', 'application/pdf', 3),// 3 MB
                createMockFile('archive.zip', 'application/zip', 5), // 5 MB
            ];
            const registerDto = createModel<RegisterDto>({
                documents: {
                    value: files,
                    validations: [required(), fileExtension(['png', 'pdf'])]
                },
            });

            const validator = new VueSanity(registerDto);
            expect(validator.isValid).toBe(false);
            // expect(registerDto.documents.errors).toHaveLength(1);
        });

        it('2. should pass when all array items are valid', () => {
            const registerDto = createModel<RegisterDto>({
                hobbies: {
                    value: ["gaming", "soccer"],
                    validations: [required()]
                },
            });

            const validator = new VueSanity(registerDto, false);
            expect(validator.isValid).toBe(true);
        });
    });

    describe('Clean Values Option', () => {
        it('1. should clear values after successful validation by default', () => {
            const model = reactive<ModelConfig<RegisterDto>>({
                firstName: { value: 'John', validations: [required()], errors: [] },
                email: { value: 'john@yayhoo.com', validations: [required()], errors: [] },
            });

            new VueSanity(model);
            expect(model.firstName?.value).toBeNull();
            expect(model.email?.value).toBeNull();
        });

        it('2. should not clear values when cleanValues is false', () => {
            const model = createModel<RegisterDto>({
                firstName: { value: 'John', validations: [required()], errors: [] },
                email: { value: 'john@yayhoo.com', validations: [required()], errors: [] },
            });

            new VueSanity(model, false);
            expect(model.firstName!.value).toBe('John');
            expect(model.email!.value).toBe('john@yayhoo.com');
        });

        it('3. should not clear values when validation fails', () => {
            const model = createModel<RegisterDto>({
                notes: { value: 'Write', validations: [minChars(10)], errors: [] },
            });

            new VueSanity(model, false);
            expect(model.notes!.value).toBe('Write');
        });
    });

    describe('Static Methods', () => {
        it('1. should have getFormData static method', () => {
            expect(VueSanity.getFormData).toBeDefined();
            expect(typeof VueSanity.getFormData).toBe('function');
        });

        it('2. should convert object to FormData via static method', () => {
            const data = { name: 'John', age: 30 };
            const formData = VueSanity.getFormData(data);

            expect(formData).toBeInstanceOf(FormData);
            expect(formData.get('name')).toBe('John');
            expect(formData.get('age')).toBe('30');
        });
    });

    describe('Edge Cases', () => {
        it('1. should handle empty model config', () => {
            const model = createModel<RegisterDto>({});

            const validator = new VueSanity(model);
            expect(validator.isValid).toBe(true);
            expect(validator.errors).toEqual({});
        });

        it('2. should handle field without validations', () => {
            const model = createModel<RegisterDto>({
                firstName: { value: 'John' },
                lastName: {}
            });

            const validator = new VueSanity(model);
            expect(validator.isValid).toBe(true);
        });

        it('3. should handle null and undefined values', () => {
            const model = createModel<RegisterDto>({
                firstName: { value: null }, // defined in dto
                lastName: { value: undefined }
            });

            const validator = new VueSanity(model);
            expect(validator.isValid).toBe(true);
        });

        it('4. should handle special characters in field values', () => {
            const model = createModel<RegisterDto>({
                notes: { value: '<script>alert("xss")</script>' , validations:[required()]}, // defined in dto
            });

            const validator = new VueSanity(model);
            expect(validator.isValid).toBe(true);
            expect(validator.normalizedModel).toHaveProperty('notes');
            expect(validator.normalizedModel.notes).toBe('<script>alert("xss")</script>');
        });
    });

    describe('Reactivity', () => {
        it('1. should work with Vue reactive objects', () => {
            const model = reactive({
                email: { value: '', validations: [required()], errors: [] }
            });

            const validator = new VueSanity(model);
            expect(validator.isValid).toBe(false);
        });

        it('2. should maintain reactivity after validation', () => {
            const model = reactive({
                email: { value: 'test@example.com', validations: [email()], errors: [] }
            });

            new VueSanity(model, false);
            model.email.value = 'updated@example.com';

            expect(model.email.value).toBe('updated@example.com');
        });
    });
});




/**
 * Create a dummy file
 * @param name filename with an extension
 * @param type mimeType 'image/png'
 * @param sizeMB file size in MegaBytes(MB)
 * @returns File
 */
const createMockFile = (name: string, type: string, sizeMB: number) => {
    const sizeBytes = sizeMB * 1024 * 1024; // convert MB → bytes
    const blob = new Blob([new Uint8Array(sizeBytes)], { type });
    return new File([blob], name, { type });
};