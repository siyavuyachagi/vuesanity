# VueSanity Usage Guide

Complete guide to using VueSanity for form validation in Vue 3 applications.

## Table of Contents

1. [Basic Setup](#basic-setup)
2. [Creating Form Models](#creating-form-models)
3. [Accessing Validation State](#accessing-validation-state)
4. [Using Validators](#using-validators)
5. [Form Submission](#form-submission)
6. [Error Handling](#error-handling)
7. [Working with FormData](#working-with-formdata)
8. [Import Usage Examples](#import-usage-examples)
9. [Advanced Usage](#advanced-usage)


## 1. Basic Setup

### Installation

```bash
npm install @siyavuyachagi/vuesanity
```

### Simple Form Example

```typescript
import { reactive } from 'vue';
import VueSanity, { required, email } from '@siyavuyachagi/vuesanity';
import type { ModelConfig } from '@siyavuyachagi/vuesanity';

// Step 1: Define your form model
const loginForm: ModelConfig = reactive({
  email: {
    value: '',
    validations: [
      required('Email is required'),
      email([], 'Please enter a valid email')
    ],
    errors: []
  },
  password: {
    value: '',
    validations: [required('Password is required')],
    errors: []
  }
});

// Step 2: Create VueSanity instance
const form = new VueSanity(loginForm);

// Step 3: Use in your component
console.log(form.isValid); // Check if form is valid
console.log(form.errors); // Access errors by field name
```

## 2. Creating Form Models

### Model Structure

Each field in your model must have:

```typescript
{
  value: any;           // Current field value
  validations?: [];     // Array of validation rules
  errors?: string[];    // Array of error messages
}
```

### Single Field Example

```typescript
const field = {
  email: {
    value: 'user@example.com',
    validations: [required(), email()],
    errors: []
  }
};
```

### Complex Form Example

```typescript
const registrationForm: ModelConfig = reactive({
  firstName: {
    value: '',
    validations: [
      required('First name is required'),
      minChars(2, 'First name must be at least 2 characters'),
      alpha(true, 'First name must contain only letters')
    ],
    errors: []
  },
  lastName: {
    value: '',
    validations: [
      required('Last name is required'),
      alpha(true, 'Last name must contain only letters')
    ],
    errors: []
  },
  email: {
    value: '',
    validations: [
      required('Email is required'),
      email(['gmail.com', 'outlook.com'], 'Only Gmail or Outlook emails allowed')
    ],
    errors: []
  },
  age: {
    value: null,
    validations: [
      required('Age is required'),
      min(18, 'You must be at least 18 years old'),
      max(120, 'Please enter a valid age')
    ],
    errors: []
  },
  profilePicture: {
    value: null,
    validations: [
      image('Profile picture must be an image'),
      maxSize(2, 'Image must be less than 2MB')
    ],
    errors: []
  }
});

const form = new VueSanity(registrationForm);
```

## 3. Accessing Validation State

### Check if Form is Valid

```typescript
const form = new VueSanity(myForm);

if (form.isValid) {
  console.log('Form is valid!');
  // Submit to server
} else {
  console.log('Form has errors');
}
```

### Get All Errors

```typescript
const form = new VueSanity(myForm);

console.log(form.errors);
// Output:
// {
//   email: ["Invalid email format"],
//   password: ["Minimum length of 8 characters required"]
// }

// Check if specific field has errors
if (form.errors.email) {
  console.log('Email errors:', form.errors.email);
}
```

### Get Field Errors from Model

```typescript
const form = new VueSanity(myForm);

// Access errors directly from model field
const emailErrors = myForm.email.errors;
console.log(emailErrors); // ["Invalid email format"]

// Check if specific field is valid
const isEmailValid = myForm.email.errors.length === 0;
```

## 4. Using Validators

### String Validators

```typescript
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
} from '@siyavuyachagi/vuesanity';

// Required field
required('This field is required!');

// Email with domain restriction
email(['gmail.com', 'company.com'], 'Only corporate emails allowed');

// Character length validation
minChars(8, 'Minimum 8 characters');
maxChars(50, 'Maximum 50 characters');
chars(10, 'Exactly 10 characters');

// Phone validation (E.164 format)
phone('ZA', 'Invalid phone number');

// Compare fields (password confirmation)
sameAs(() => form.password.value, 'Passwords do not match');

// URL validation
url('Please enter a valid URL');

// Custom regex
regex(/^[A-Z]{3}\d{3}$/, 'Format must be ABC123');

// Alphabetic only
alpha(true, 'Letters only (spaces allowed)');

// Alphanumeric
alphanumeric(false, 'No spaces allowed');

// Numbers only
numeric(true, true); // allowDecimals=true, allowNegative=true
```

### File Validators

```typescript
import {
  extensions,
  maxSize,
  minSize,
  size,
  image
} from '@siyavuyachagi/vuesanity';

// File type validation
extensions(['pdf', 'docx', 'xlsx'], 'Only PDF and Office files allowed');
extensions('pdf', 'Only PDF files');

// File size validation (in MB)
maxSize(5, 'File must be less than 5MB');
minSize(0.1, 'File must be at least 0.1MB');
size(2, 'File must be exactly 2MB');

// Image validation
image('Please upload a valid image');
```

### Number Validators

```typescript
import { min, max, range } from '@siyavuyachagi/vuesanity';

// Minimum value
min(0, 'Value must be at least 0');

// Maximum value
max(100, 'Value cannot exceed 100');

// Range validation
range(1, 100, 'Value must be between 1 and 100');
```

### Date Validators

```typescript
import { minDate, maxDate, dateRange } from '@siyavuyachagi/vuesanity';

// Minimum date
minDate(new Date('2024-01-01'), 'Date must be after 2024-01-01');

// Maximum date
maxDate(new Date(), 'Date cannot be in the future');

// Date range
dateRange(
  new Date('2024-01-01'),
  new Date('2024-12-31'),
  'Date must be in 2024'
);
```

## 5. Form Submission

### Basic Submission

```typescript
import { reactive } from 'vue';
import VueSanity, { required, email } from '@siyavuyachagi/vuesanity';

const form = new VueSanity(myForm);

const submitForm = async () => {
  // Validation happens automatically on VueSanity instantiation
  if (!form.isValid) {
    console.log('Validation failed:', form.errors);
    return;
  }

  // Get clean validated data
  const payload = form.normalizedModel;

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error('Submission failed:', error);
  }
};
```

### Submission with Re-validation

```typescript
const form = new VueSanity(myForm, false); // false = don't clean values after validation

const submitForm = async () => {
  // Re-validate before submission
  const newForm = new VueSanity(myForm);

  if (!newForm.isValid) {
    console.log('Validation errors:', newForm.errors);
    return;
  }

  await submitData(newForm.normalizedModel);
};
```

## 6. Error Handling

### Display Field Errors in Template

```vue
<template>
  <form @submit.prevent="submit">
    <div>
      <label for="email">Email</label>
      <input
        id="email"
        v-model="form.email.value"
        type="email"
        placeholder="Enter your email"
      />
      <div v-if="form.email.errors.length > 0" class="error">
        <p v-for="(error, idx) in form.email.errors" :key="idx">
          {{ error }}
        </p>
      </div>
    </div>

    <div>
      <label for="password">Password</label>
      <input
        id="password"
        v-model="form.password.value"
        type="password"
        placeholder="Enter your password"
      />
      <div v-if="form.password.errors.length > 0" class="error">
        <p v-for="(error, idx) in form.password.errors" :key="idx">
          {{ error }}
        </p>
      </div>
    </div>

    <button type="submit" :disabled="!formValidator.isValid">
      Submit
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import VueSanity, { required, email } from '@siyavuyachagi/vuesanity';

const form = reactive({
  email: { value: '', validations: [required(), email()], errors: [] },
  password: { value: '', validations: [required()], errors: [] }
});

const formValidator = new VueSanity(form);

const submit = () => {
  if (formValidator.isValid) {
    console.log('Submit data:', formValidator.normalizedModel);
  }
};
</script>

<style scoped>
.error {
  color: red;
  margin-top: 0.5rem;
  font-size: 0.875rem;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

## 7. Working with FormData

### Automatic FormData Generation

```typescript
const uploadForm: ModelConfig = reactive({
  title: {
    value: 'My Document',
    validations: [required()],
    errors: []
  },
  file: {
    value: null,
    validations: [
      required('File is required'),
      extensions(['pdf', 'docx']),
      maxSize(5)
    ],
    errors: []
  }
});

const form = new VueSanity(uploadForm);

if (form.isValid) {
  // FormData is automatically generated
  const formData = form.formData;

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData // No need to set Content-Type header
  });
}
```

### Manual FormData Generation

```typescript
import VueSanity from '@siyavuyachagi/vuesanity';

const data = {
  name: 'John',
  age: 25,
  file: fileObject,
  hobbies: ['reading', 'coding']
};

// Use static method
const formData = VueSanity.getFormData(data);

const response = await fetch('/api/submit', {
  method: 'POST',
  body: formData
});
```

## 8. Advanced Usage

### Custom Validators

Create your own validation rules that follow the same pattern:

```typescript
// Custom validator function
const strongPassword = (message?: string) => {
  return (value: any): string => {
    if (!value) return '';

    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumbers = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*]/.test(value);

    if (!hasUppercase || !hasLowercase || !hasNumbers || !hasSpecial) {
      return (
        message ||
        'Password must contain uppercase, lowercase, numbers, and special characters'
      );
    }
    return '';
  };
};

// Use in form
const form = new VueSanity({
  password: {
    value: '',
    validations: [required(), minChars(8), strongPassword()],
    errors: []
  }
});
```

### Conditional Validation

```typescript
const applicantForm: ModelConfig = reactive({
  hasExperience: {
    value: false,
    validations: [],
    errors: []
  },
  yearsOfExperience: {
    value: null,
    validations: [], // Will be conditionally set
    errors: []
  }
});

// Conditionally add validators
if (applicantForm.hasExperience.value) {
  applicantForm.yearsOfExperience.validations = [
    required('Years of experience is required'),
    min(1, 'Must have at least 1 year'),
    max(60, 'Please enter a valid number')
  ];
}

const form = new VueSanity(applicantForm);
```

### Multi-step Form Validation

```typescript
const multiStepForm = reactive({
  // Step 1: Personal Info
  firstName: {
    value: '',
    validations: [required(), alpha(true)],
    errors: []
  },
  lastName: {
    value: '',
    validations: [required(), alpha(true)],
    errors: []
  },
  // Step 2: Contact Info
  email: {
    value: '',
    validations: [required(), email()],
    errors: []
  },
  phone: {
    value: '',
    validations: [required(), phone()],
    errors: []
  }
});

const validateStep = (stepFields: string[]): boolean => {
  const stepForm = Object.fromEntries(
    stepFields.map(field => [field, multiStepForm[field]])
  );

  const validator = new VueSanity(stepForm);
  return validator.isValid;
};

// Usage
if (validateStep(['firstName', 'lastName'])) {
  console.log('Step 1 passed, move to step 2');
} else {
  console.log('Fix errors before proceeding');
}
```

### Dynamic Form Fields

```typescript
const dynamicForm = reactive<ModelConfig>({
  name: {
    value: '',
    validations: [required()],
    errors: []
  }
});

const addEmailField = () => {
  dynamicForm.email = {
    value: '',
    validations: [required(), email()],
    errors: []
  };

  // Re-validate with new field
  const form = new VueSanity(dynamicForm);
  console.log('Updated validation state:', form.isValid);
};

const removeField = (fieldName: string) => {
  delete dynamicForm[fieldName];

  // Re-validate
  const form = new VueSanity(dynamicForm);
  console.log('Updated validation state:', form.isValid);
};
```

### Combining Multiple File Fields

```typescript
const documentUploadForm: ModelConfig = reactive({
  idDocument: {
    value: null,
    validations: [
      required('ID document required'),
      extensions(['pdf', 'jpg', 'png']),
      maxSize(5)
    ],
    errors: []
  },
  proofOfAddress: {
    value: null,
    validations: [
      required('Proof of address required'),
      extensions(['pdf', 'jpg', 'png']),
      maxSize(5)
    ],
    errors: []
  }
});

const form = new VueSanity(documentUploadForm);

if (form.isValid) {
  const formData = form.formData;
  // Both files will be included in FormData
  // formData.getAll('idDocument') and formData.getAll('proofOfAddress')
}
```

### Reset Form After Submission

```typescript
const resetForm = () => {
  Object.keys(myForm).forEach(key => {
    if (Array.isArray(myForm[key].value)) {
      myForm[key].value = [];
    } else if (typeof myForm[key].value === 'object') {
      myForm[key].value = null;
    } else {
      myForm[key].value = '';
    }
    myForm[key].errors = [];
  });

  // Re-validate to update state
  const form = new VueSanity(myForm);
};
```


## 9. Import Usage Examples

### Example 1: Simple Project
```typescript
// Just import what you need from main entry
import VueSanity, { required, email, minChars } from '@siyavuyachagi/vuesanity';
import type { ModelConfig } from '@siyavuyachagi/vuesanity';

const form = new VueSanity(myModel);
```

### Example 2: Large Project (Optimized)
```typescript
// Import by category for better tree-shaking
import VueSanity from '@siyavuyachagi/vuesanity';
import { required, email, minChars, maxChars, alpha } from '@siyavuyachagi/vuesanity/validators/string';
import { maxSize, extensions, image } from '@siyavuyachagi/vuesanity/validators/file';
import type { ModelConfig } from '@siyavuyachagi/vuesanity';
```

### Example 3: All Validators
```typescript
// Import all validators at once
import VueSanity, * as validators from '@siyavuyachagi/vuesanity';

const stringValidators = {
  required: validators.required,
  email: validators.email,
  // ... etc
};
```


## 10. Tips & Best Practices

1. **Always initialize `errors` as empty array** - Required for the library to work properly
2. **Use TypeScript** - Define your form model with `ModelConfig` type for better IDE support
3. **Import only needed validators** - Keep your bundle small by importing only used validators
4. **Validate at submission** - Don't validate on every keystroke for better performance
5. **Provide clear error messages** - Help users understand what went wrong
6. **Test custom validators** - Ensure your custom rules work as expected
7. **Clean up after submission** - Reset form state for better UX