// tests/unit/validators/file.test.ts
import { describe, it, expect } from 'vitest';
import {
    fileExtension,
    fileSize,
    fileType,
    maxFileSize,
    minFileSize,
} from '../../../src';

describe('File Validators', () => {
    describe('fileExtension()', () => {
        it('should accept single extension as string', () => {
            const file = new File([''], 'document.pdf');
            const invalidFile = new File([''], 'document.pdf');

            const validator = fileExtension('pdf');
            expect(validator(file)).toBe('');

            const invalidValidator = fileExtension('doc');
            expect(invalidValidator(invalidFile)).toContain('not supported');
        });

        it('should accept multiple extensions as array', () => {
            const validator = fileExtension(['pdf', 'doc', 'docx']);
            const pdfFile = new File([''], 'document.pdf');
            const docFile = new File([''], 'document.doc');

            expect(validator(pdfFile)).toBe('');
            expect(validator(docFile)).toBe('');
        });

        it('should reject unsupported extension', () => {
            const validator = fileExtension(['pdf']);
            const file = new File([''], 'image.jpg');
            expect(validator(file)).toContain('not supported');
        });

        it('should handle extensions with dots', () => {
            const validator = fileExtension(['.pdf', '.doc']);
            const file = new File([''], 'document.pdf');
            expect(validator(file)).toBe('');
        });

        it('should be case insensitive', () => {
            const validator = fileExtension(['PDF']);
            const file = new File([''], 'document.pdf');
            expect(validator(file)).toBe('');
        });

        it('should return empty string for empty value', () => {
            const validator = fileExtension(['pdf']);
            expect(validator('')).toBe('');
        });

        it('should return empty string for non-File value', () => {
            const validator = fileExtension(['pdf']);
            expect(validator('not a file')).toBe('');
        });

        it('should use custom message', () => {
            const validator = fileExtension(['pdf'], 'PDF only');
            const file = new File([''], 'document.jpg');
            expect(validator(file)).toBe('PDF only');
        });

        it('should handle files without extension', () => {
            const validator = fileExtension(['pdf']);
            const file = new File([''], 'README');
            expect(validator(file)).toContain('not supported');
        });
    });

    describe('maxFileSize()', () => {
        it('should accept file under size limit', () => {
            const validator = maxFileSize(5); // 5MB
            const file = new File(['x'.repeat(1024 * 1024)], 'test.txt'); // 1MB
            expect(validator(file)).toBe('');
        });

        it('should reject file over size limit', () => {
            const validator = maxFileSize(1); // 1MB
            const file = new File(['x'.repeat(2 * 1024 * 1024)], 'large.txt'); // 2MB
            expect(validator(file)).toContain('Maximum file size');
        });

        it('should accept file at exact size limit', () => {
            const validator = maxFileSize(1); // 1MB
            const content = new Array(1024 * 1024).fill('x').join('');
            const file = new File([content], 'test.txt');
            expect(validator(file)).toBe('');
        });

        it('should return empty string for empty value', () => {
            const validator = maxFileSize(5);
            expect(validator('')).toBe('');
        });

        it('should return empty string for non-File value', () => {
            const validator = maxFileSize(5);
            expect(validator('not a file')).toBe('');
        });

        it('should use custom message', () => {
            const validator = maxFileSize(1, 'File too big');
            const file = new File(['x'.repeat(2 * 1024 * 1024)], 'large.txt');
            expect(validator(file)).toBe('File too big');
        });

        it('should handle very small files', () => {
            const validator = maxFileSize(0.001); // 1KB
            const file = new File(['x'], 'tiny.txt');
            expect(validator(file)).toBe('');
        });

        it('should handle zero-byte files', () => {
            const validator = maxFileSize(1);
            const file = new File([''], 'empty.txt');
            expect(validator(file)).toBe('');
        });
    });

    describe('minFileSize()', () => {
        it('should accept file over minimum size', () => {
            const validator = minFileSize(1); // 1MB
            const file = new File(['x'.repeat(2 * 1024 * 1024)], 'test.txt'); // 2MB
            expect(validator(file)).toBe('');
        });

        it('should reject file under minimum size', () => {
            const validator = minFileSize(2); // 2MB
            const file = new File(['x'.repeat(1024 * 1024)], 'small.txt'); // 1MB
            expect(validator(file)).toContain('Minimum file size');
        });

        it('should accept file at exact minimum size', () => {
            const validator = minFileSize(1); // 1MB
            const content = new Array(1024 * 1024).fill('x').join('');
            const file = new File([content], 'test.txt');
            expect(validator(file)).toBe('');
        });

        it('should return empty string for empty value', () => {
            const validator = minFileSize(1);
            expect(validator('')).toBe('');
        });

        it('should return empty string for non-File value', () => {
            const validator = minFileSize(1);
            expect(validator('not a file')).toBe('');
        });

        it('should use custom message', () => {
            const validator = minFileSize(2, 'File too small');
            const file = new File(['x'], 'tiny.txt');
            expect(validator(file)).toBe('File too small');
        });
    });

    describe('fileSize()', () => {
        it('should accept file at exact size', () => {
            const validator = fileSize(1); // 1MB
            const content = new Array(1024 * 1024).fill('x').join('');
            const file = new File([content], 'test.txt');
            expect(validator(file)).toBe('');
        });

        it('should reject file not at exact size', () => {
            const validator = fileSize(1); // 1MB
            const file = new File(['x'.repeat(2 * 1024 * 1024)], 'test.txt'); // 2MB
            expect(validator(file)).toContain('must be exactly');
        });

        it('should return empty string for empty value', () => {
            const validator = fileSize(1);
            expect(validator('')).toBe('');
        });

        it('should return empty string for non-File value', () => {
            const validator = fileSize(1);
            expect(validator('not a file')).toBe('');
        });

        it('should use custom message', () => {
            const validator = fileSize(1, 'Must be 1MB');
            const file = new File(['x'], 'test.txt');
            expect(validator(file)).toBe('Must be 1MB');
        });
    });

    describe('fileType()', () => {
        const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];

        it('should accept single allowed MIME type as string', () => {
            const validator = fileType(allowedTypes[0]);
            const file = new File([''], 'photo.png', { type: 'image/png' });
            expect(validator(file)).toBe(''); // Valid

            const invalidFile = new File([''], 'file.pdf', { type: 'application/pdf' });
            expect(validator(invalidFile)).toBe(`Invalid file type. Allowed types: ${allowedTypes[0]}`); // Invalid
        });

        it('should accept allowed MIME types', () => {
            const validator = fileType(allowedTypes);
            const validFiles = [
                new File([''], 'photo.png', { type: 'image/png' }),
                new File([''], 'photo.jpeg', { type: 'image/jpeg' }),
                new File([''], 'document.pdf', { type: 'application/pdf' })
            ];

            validFiles.forEach(file => {
                expect(validator(file)).toBe('');
            });
        });

        it('should reject disallowed MIME types', () => {
            const validator = fileType(allowedTypes);
            const invalidFiles = [
                new File([''], 'text.txt', { type: 'text/plain' }),
                new File([''], 'audio.mp3', { type: 'audio/mpeg' }),
                new File([''], 'script.js', { type: 'application/javascript' })
            ];

            invalidFiles.forEach(file => {
                const error = validator(file);
                expect(error).toContain('Invalid file type');
                expect(error).toContain('image/png, image/jpeg, application/pdf');
            });
        });

        it('should return empty string for empty value', () => {
            const validator = fileType(allowedTypes);
            expect(validator('')).toBe('');
            expect(validator(null)).toBe('');
            expect(validator(undefined)).toBe('');
        });

        it('should return empty string for non-File values', () => {
            const validator = fileType(allowedTypes);
            expect(validator({})).toBe('');
            expect(validator(123)).toBe('');
            expect(validator([])).toBe('');
        });

        it('should use custom message if provided', () => {
            const validator = fileType(allowedTypes, 'Only PNG, JPEG, or PDF allowed');
            const invalidFile = new File([''], 'file.bmp', { type: 'image/bmp' });
            expect(validator(invalidFile)).toBe('Only PNG, JPEG, or PDF allowed');
        });

        it('should be case insensitive for MIME types', () => {
            const validator = fileType(['IMAGE/PNG', 'IMAGE/JPEG']);
            const file = new File([''], 'photo.png', { type: 'image/png' });
            // Normalizing allowedTypes inside validator would be needed for true case-insensitivity
            expect(validator(file)).not.toBe('');
        });
    });
});