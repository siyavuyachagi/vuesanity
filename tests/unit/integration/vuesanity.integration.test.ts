// tests/integration/vuesanity.integration.test.ts
import { describe, it, expect } from 'vitest';
import { reactive, ref } from 'vue';
import { alphanumeric, email, fileExtension, maxFileSize, minChars, ModelConfig, required, sameAs, VueSanity } from '../../../dist';


describe('VueSanity Integration Tests', () => {
    describe('Real-world Form Scenarios', () => {
        it('should validate a complete login form', () => {
            const loginForm: ModelConfig = reactive({
                email: {
                    value: 'user@example.com',
                    validations: [
                        required('Email is required'),
                        email([], 'Invalid email format')
                    ],
                    errors: []
                },
                password: {
                    value: 'SecurePass123',
                    validations: [
                        required('Password is required'),
                        minChars(8, 'Password must be at least 8 characters')
                    ],
                    errors: []
                }
            });

            const validator = new VueSanity(loginForm);

            expect(validator.isValid).toBe(true);
            expect(validator.errors).toEqual({});
            expect(validator.normalizedModel).toHaveProperty('email');
            expect(validator.normalizedModel).toHaveProperty('password');
            expect(Object.keys(validator.normalizedModel)).toHaveLength(2);
            expect(validator.formData.get('email')).toBe('user@example.com');
            expect(validator.formData.get('password')).toBe('SecurePass123');
        });

        it('should validate a registration form with password confirmation', () => {
            const registrationForm: ModelConfig = reactive({
                username: {
                    value: 'johndoe123',
                    validations: [
                        required('Username is required'),
                        minChars(3, 'Username must be at least 3 characters'),
                        alphanumeric(false, 'Username must be alphanumeric')
                    ],
                    errors: []
                },
                email: {
                    value: 'john@example.com',
                    validations: [
                        required('Email is required'),
                        email([], 'Invalid email format')
                    ],
                    errors: []
                },
                password: {
                    value: 'SecurePass123',
                    validations: [
                        required('Password is required'),
                        minChars(8, 'Password must be at least 8 characters')
                    ],
                    errors: []
                },
                confirmPassword: {
                    value: 'SecurePass123',
                    validations: [
                        required('Please confirm password'),
                        sameAs(() => registrationForm.password.value, 'Passwords do not match')
                    ],
                    errors: []
                }
            });

            const validator = new VueSanity(registrationForm);

            expect(validator.isValid).toBe(true);
            expect(validator.errors).toEqual({});
            expect(Object.keys(validator.normalizedModel)).toHaveLength(4);
        });

        it('should validate a registration form and detect errors', () => {
            const registrationForm: ModelConfig = reactive({
                username: {
                    value: 'jd',
                    validations: [
                        required('Username is required'),
                        minChars(3, 'Username must be at least 3 characters'),
                        alphanumeric(false, 'Username must be alphanumeric')
                    ],
                    errors: []
                },
                email: {
                    value: 'john@invalid.com',
                    validations: [
                        required('Email is required'),
                        email(['example.com'], 'Invalid email domain')
                    ],
                    errors: []
                },
                password: {
                    value: '123',
                    validations: [
                        required('Password is required'),
                        minChars(8, 'Password must be at least 8 characters')
                    ],
                    errors: []
                },
                confirmPassword: {
                    value: '321',
                    validations: [
                        required('Please confirm password'),
                        sameAs(() => registrationForm.password.value, 'Passwords do not match')
                    ],
                    errors: []
                }
            });

            const validator = new VueSanity(registrationForm);

            expect(validator.isValid).toBe(false);

            // Check specific errors
            expect(registrationForm.username.errors).toContain('Username must be at least 3 characters');
            expect(registrationForm.email.errors).toContain('Invalid email domain');
            expect(registrationForm.password.errors).toContain('Password must be at least 8 characters');
            expect(registrationForm.confirmPassword.errors).toContain('Passwords do not match');
        });

        it('should validate a form with multiple files', () => {

            const createMockFile = (name: string, type: string, sizeMB: number) => {
                const sizeBytes = sizeMB * 1024 * 1024; // convert MB → bytes
                const blob = new Blob([new Uint8Array(sizeBytes)], { type });
                return new File([blob], name, { type });
            };

            const files = [
                createMockFile('photo.png', 'image/png', 1),        // 1 MB
                createMockFile('photo.jpeg', 'image/jpeg', 2),      // 2 MB
                createMockFile('document.pdf', 'application/pdf', 3),// 3 MB
                createMockFile('presentation.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 4), // 4 MB
                createMockFile('spreadsheet.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 5), // 5 MB
                createMockFile('archive.zip', 'application/zip', 5), // 5 MB
            ];

            const filesForm: ModelConfig = reactive({
                attachments: {
                    value: files,
                    validations: [
                        required('At least one file is required'),
                        fileExtension(['png', 'jpeg'], 'Invalid file type. Allowed: png, jpeg'),
                        maxFileSize(4, 'File size must not exceed 4MB each')
                    ],
                    errors: []
                }
            });

            const validator = new VueSanity(filesForm);

            expect(validator.isValid).toBe(false);
            expect(filesForm.attachments.errors).toContain('Invalid file type. Allowed: png, jpeg');
            expect(filesForm.attachments.errors).toContain('File size must not exceed 4MB each');
        });
    })
});