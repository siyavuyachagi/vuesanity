// // tests/integration/form.test.ts
// import { describe, it, expect, beforeEach } from 'vitest'
// import { reactive } from 'vue'
// import VueSanity, { required, email, minChars } from '@siyavuyachagi/vuesanity'
// import type { ModelConfig } from '@siyavuyachagi/vuesanity'

// describe('VueSanity Integration', () => {
//     let form: ModelConfig

//     beforeEach(() => {
//         form = reactive({
//             email: {
//                 value: '',
//                 validations: [required(), email()],
//                 errors: []
//             },
//             password: {
//                 value: '',
//                 validations: [required(), minChars(8)],
//                 errors: []
//             }
//         })
//     })

//     it('should validate form correctly', () => {
//         const validator = new VueSanity(form)
//         expect(validator.isValid).toBe(false)
//         expect(Object.keys(validator.errors).length).toBeGreaterThan(0)
//     })

//     it('should pass with valid data', () => {
//         form.email.value = 'test@example.com'
//         form.password.value = 'password123'

//         const validator = new VueSanity(form)
//         expect(validator.isValid).toBe(true)
//         expect(validator.normalizedModel).toEqual({
//             email: 'test@example.com',
//             password: 'password123'
//         })
//     })

//     it('should generate FormData', () => {
//         form.email.value = 'test@example.com'
//         form.password.value = 'password123'

//         const validator = new VueSanity(form)
//         expect(validator.formData.get('email')).toBe('test@example.com')
//         expect(validator.formData.get('password')).toBe('password123')
//     })
// })