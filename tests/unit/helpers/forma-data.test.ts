// tests/unit/helpers/form-data.test.ts
import { describe, it, expect } from 'vitest';
import { getFormData } from '../../../src/helpers/form-data';
import { ref } from 'vue';

describe('FormData Helper', () => {
    describe('getFormData()', () => {
        it('should convert simple object to FormData', () => {
            const data = { name: 'John', age: 30 };
            const formData = getFormData(data);

            expect(formData).toBeInstanceOf(FormData);
            expect(formData.get('name')).toBe('John');
            expect(formData.get('age')).toBe('30');
        });

        it('should handle string values', () => {
            const data = { text: 'Hello World' };
            const formData = getFormData(data);

            expect(formData.get('text')).toBe('Hello World');
        });

        it('should handle number values', () => {
            const data = { count: 42, price: 19.99 };
            const formData = getFormData(data);

            expect(formData.get('count')).toBe('42');
            expect(formData.get('price')).toBe('19.99');
        });

        it('should handle boolean values', () => {
            const data = { active: true, disabled: false };
            const formData = getFormData(data);

            expect(formData.get('active')).toBe('true');
            expect(formData.get('disabled')).toBe('false');
        });

        it('should handle null values', () => {
            const data = { field: null };
            const formData = getFormData(data);

            expect([...formData.keys()]).not.toContain('field');
        });

        it('should handle undefined values', () => {
            const data = { field: undefined };
            const formData = getFormData(data);

            expect([...formData.keys()]).not.toContain('field');
        });

        it('should handle File objects', () => {
            const file = new File(['content'], 'test.txt', { type: 'text/plain' });
            const data = { file };
            const formData = getFormData(data);

            expect(formData.get('file')).toBe(file);
        });

        it('should handle multiple Files in array', () => {
            const files = [
                new File(['content1'], 'test1.txt'),
                new File(['content2'], 'test2.txt')
            ];
            const data = { files };
            const formData = getFormData(data);

            expect(formData.getAll('files')).toHaveLength(2);
        });

        it('should handle Date objects', () => {
            const date = new Date('2024-01-15');
            const data = { date };
            const formData = getFormData(data);

            expect(formData.get('date')).toBe(date.toISOString());
        });

        it('should handle nested objects', () => {
            const data = {
                user: {
                    name: 'John',
                    age: 30
                }
            };
            const formData = getFormData(data);

            expect(formData.get('user[name]')).toBe('John');
            expect(formData.get('user[age]')).toBe('30');
        });

        it('should handle arrays of primitives', () => {
            const data = { tags: ['vue', 'typescript', 'testing'] };
            const formData = getFormData(data);

            expect(formData.get('tags[0]')).toBe('vue');
            expect(formData.get('tags[1]')).toBe('typescript');
            expect(formData.get('tags[2]')).toBe('testing');
        });

        it('should handle arrays of objects', () => {
            const data = {
                users: [
                    { name: 'John', age: 30 },
                    { name: 'Jane', age: 25 }
                ]
            };
            const formData = getFormData(data);

            expect(formData.get('users[0][name]')).toBe('John');
            expect(formData.get('users[0][age]')).toBe('30');
            expect(formData.get('users[1][name]')).toBe('Jane');
            expect(formData.get('users[1][age]')).toBe('25');
        });

        it('should handle deeply nested structures', () => {
            const data = {
                company: {
                    address: {
                        street: '123 Main St',
                        city: 'Springfield'
                    }
                }
            };
            const formData = getFormData(data);

            expect(formData.get('company[address][street]')).toBe('123 Main St');
            expect(formData.get('company[address][city]')).toBe('Springfield');
        });

        it('should unwrap Vue ref values', () => {
            const data = {
                name: ref('John'),
                age: ref(30)
            };
            const formData = getFormData(data);

            expect(formData.get('name')).toBe('John');
            expect(formData.get('age')).toBe('30');
        });

        it('should handle nested refs', () => {
            const data = {
                user: {
                    name: ref('John'),
                    age: 30
                }
            };
            const formData = getFormData(data);

            expect(formData.get('user[name]')).toBe('John');
            expect(formData.get('user[age]')).toBe('30');
        });

        it('should handle empty arrays', () => {
            const data = { items: [] };
            const formData = getFormData(data);

            expect([...formData.keys()]).not.toContain('items');
        });

        it('should handle empty objects', () => {
            const data = { nested: {} };
            const formData = getFormData(data);

            expect([...formData.keys()]).toHaveLength(0);
        });

        it('should handle special characters in values', () => {
            const data = { text: '<script>alert("XSS")</script>' };
            const formData = getFormData(data);

            expect(formData.get('text')).toBe('<script>alert("XSS")</script>');
        });

        it('should handle special characters in keys', () => {
            const data = { 'key-with-dash': 'value' };
            const formData = getFormData(data);

            expect(formData.get('key-with-dash')).toBe('value');
        });

        it('should handle unicode values', () => {
            const data = { name: '日本語', emoji: '🎉' };
            const formData = getFormData(data);

            expect(formData.get('name')).toBe('日本語');
            expect(formData.get('emoji')).toBe('🎉');
        });

        it('should handle Blob objects', () => {
            const blob = new Blob(['content'], { type: 'text/plain' });
            const data = { blob };
            const formData = getFormData(data);

            // Blob should be converted to string
            expect(formData.get('blob')).toBeDefined();
        });

        it('should handle mixed types', () => {
            const file = new File([''], 'test.txt');
            const data = {
                name: 'John',
                age: 30,
                active: true,
                file,
                tags: ['vue', 'ts'],
                metadata: {
                    created: new Date('2024-01-01')
                }
            };
            const formData = getFormData(data);

            expect(formData.get('name')).toBe('John');
            expect(formData.get('age')).toBe('30');
            expect(formData.get('active')).toBe('true');
            expect(formData.get('file')).toBe(file);
            expect(formData.get('tags[0]')).toBe('vue');
            expect(formData.get('metadata[created]')).toBeTruthy();
        });

        it('should handle zero values correctly', () => {
            const data = { count: 0, price: 0.0 };
            const formData = getFormData(data);

            expect(formData.get('count')).toBe('0');
            expect(formData.get('price')).toBe('0');
        });

        it('should handle empty strings', () => {
            const data = { text: '' };
            const formData = getFormData(data);

            expect(formData.get('text')).toBe('');
        });

        it('should handle very long strings', () => {
            const longString = 'x'.repeat(10000);
            const data = { text: longString };
            const formData = getFormData(data);

            expect(formData.get('text')).toBe(longString);
        });

        it('should handle arrays with null/undefined', () => {
            const data = { items: ['a', null, undefined, 'b'] };
            const formData = getFormData(data);

            expect(formData.get('items[0]')).toBe('a');
            expect(formData.get('items[3]')).toBe('b');
        });

        it('should preserve array order', () => {
            const data = { numbers: [3, 1, 4, 1, 5, 9] };
            const formData = getFormData(data);

            expect(formData.get('numbers[0]')).toBe('3');
            expect(formData.get('numbers[1]')).toBe('1');
            expect(formData.get('numbers[2]')).toBe('4');
            expect(formData.get('numbers[3]')).toBe('1');
            expect(formData.get('numbers[4]')).toBe('5');
            expect(formData.get('numbers[5]')).toBe('9');
        });
    });
});