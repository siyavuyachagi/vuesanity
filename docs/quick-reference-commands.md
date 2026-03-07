# VueSanity - Quick Reference Guide

## 🎯 All Validators at a Glance

### Boolean Validators

```typescript
mustBeTrue(); // Value must be true
mustBeFalse(); // Value must be false
```

### Date Validators

```typescript
maxDate(new Date()); // Before date
minDate(new Date("2024-01-01")); // After date
rangeDate(min, max); // Between dates
```

### String Validators

```typescript
alpha(true); // Letters only
alphanumeric(false); // Letters + numbers
chars(10); // Exact length
differentFrom(() => model.old.value); // Must differ from another field
email(); // Valid email
maxChars(50); // Max length
minChars(8); // Min length
numeric(true, false); // Numbers only, allow (decimals, negative)
password(); // Password strength
phone(); // E.164 format
regex(/^[A-Z]{3}\d{3}$/); // Custom pattern
required(); // Not empty
sameAs(() => pwd.value); // Compare values
url(); // Valid URL
```

### File Validators

```typescript
fileExtension(["pdf", "doc"]); // File type by extension
fileSize(2); // Exactly 2MB
fileType("image/png", "Invalid file type"); // Image file
maxFileSize(5); // Max 5MB
minFileSize(0.1); // Min 0.1MB
```

### Number Validators

```typescript
maxNumber(100); // <= 100
minNumber(0); // >= 0
rangeNumber(1, 100); // Between 1-100
```

---

## 🚀 Quick Start

### Installation

```bash
npm install @siyavuyachagi/vuesanity
```

### With createModel<T> (Recommended)

```typescript
import VueSanity, {
  createModel,
  required,
  email,
  minChars,
} from "@siyavuyachagi/vuesanity";

interface LoginDto {
  email: string;
  password: string;
}

const loginForm = createModel<LoginDto>({
  email: { value: "", validations: [required(), email()] },
  password: { value: "", validations: [required(), minChars(8)] },
});

const validator = new VueSanity(loginForm);

console.log(validator.isValid); // true/false
console.log(validator.errors); // { email: [...], password: [...] }
console.log(validator.normalizedModel); // { email: '...', password: '...' }
console.log(validator.formData); // FormData object
```

### With reactive<ModelConfig<T>> (Manual)

```typescript
import { reactive } from "vue";
import VueSanity, { required, email, minChars } from "@siyavuyachagi/vuesanity";
import type { ModelConfig } from "@siyavuyachagi/vuesanity";

interface LoginDto {
  email: string;
  password: string;
}

const form = reactive<ModelConfig<LoginDto>>({
  email: { value: "", validations: [required(), email()], errors: [] },
  password: { value: "", validations: [required(), minChars(8)], errors: [] },
});

const validator = new VueSanity(form);
```

---

## 📥 Import Patterns

### All Validators (Main Entry)

```typescript
import VueSanity, {
  createModel,
  mustBeTrue,
  mustBeFalse,
  required,
  email,
  minChars,
  password,
  differentFrom,
  maxFileSize,
  fileExtension,
  minNumber,
  maxNumber,
  rangeNumber,
  minDate,
  maxDate,
} from "@siyavuyachagi/vuesanity";
```

### By Category

```typescript
// Strings only
import {
  required,
  email,
  minChars,
  password,
  differentFrom,
} from "@siyavuyachagi/vuesanity/validators/string";

// Booleans only
import {
  mustBeTrue,
  mustBeFalse,
} from "@siyavuyachagi/vuesanity/validators/boolean";

// Files only
import {
  maxFileSize,
  fileExtension,
  fileType,
} from "@siyavuyachagi/vuesanity/validators/file";

// Numbers only
import {
  minNumber,
  maxNumber,
  rangeNumber,
} from "@siyavuyachagi/vuesanity/validators/number";

// Dates only
import {
  minDate,
  maxDate,
  rangeDate,
} from "@siyavuyachagi/vuesanity/validators/date";
```

### Types

```typescript
import type {
  ModelConfig,
  FieldConfig,
  Field,
  ValidationRule,
} from "@siyavuyachagi/vuesanity";
```

---

## 💾 FormData Usage

### Automatic Generation

```typescript
const validator = new VueSanity(form);
if (validator.isValid) {
  const formData = validator.formData;

  await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
}
```

### Manual Generation

```typescript
import VueSanity from "@siyavuyachagi/vuesanity";

const data = { name: "John", age: 25, file: fileObject };
const formData = VueSanity.getFormData(data);
```

---

## 🛠️ Build Commands

```bash
# Install dependencies
npm install

# Build project
npm run build

# Build with watch
npm run build -- --watch

# Link locally for testing
npm link

# Unlink
npm unlink

# Publish to npm
npm publish
```

---

## 🧪 Testing Patterns

### Test Valid Form

```typescript
const form = createModel<{ email: string }>({
  email: { value: "test@example.com", validations: [email()] },
});
const v = new VueSanity(form);
expect(v.isValid).toBe(true);
expect(v.errors.email).toBeUndefined();
```

### Test Invalid Form

```typescript
const form = createModel<{ email: string }>({
  email: { value: "invalid", validations: [email()] },
});
const v = new VueSanity(form);
expect(v.isValid).toBe(false);
expect(v.errors.email).toBeDefined();
```

### Test FormData

```typescript
const form = createModel<{ name: string; file: File }>({
  name: { value: "John", validations: [required()] },
  file: { value: fileObj, validations: [required()] },
});
const v = new VueSanity(form);
expect(v.formData.get("name")).toBe("John");
expect(v.formData.get("file")).toBe(fileObj);
```

---

## ⚡ Performance Tips

1. **Validate on Submission** - Not on every keystroke
2. **Import by Category** - Better tree-shaking
3. **Use FormData** - Built-in optimization
4. **Create Once** - Reuse validator instances
5. **Lazy Load** - Code-split validator categories

---

## 🐛 Troubleshooting

### Issue: Imports not working

```bash
# Ensure build is run
npm run build

# Check dist/ folder exists
ls -la dist/

# Verify exports
cat dist/index.d.ts
```

### Issue: TypeScript errors with createModel

```typescript
// Define a DTO interface
interface LoginDto {
  email: string;
  password: string;
}

// Use createModel<T> — no need to manually type errors or reactive
const form = createModel<LoginDto>({
  email: { value: "", validations: [required(), email()] },
  password: { value: "", validations: [required()] },
});
```

### Issue: TypeScript errors with reactive

```typescript
// Use ModelConfig<T> with an interface
import type { ModelConfig } from '@siyavuyachagi/vuesanity';

interface LoginDto { email: string; password: string; }

const form = reactive<ModelConfig<LoginDto>>({
  email: { value: '', validations: [...], errors: [] },
  password: { value: '', validations: [...], errors: [] }
});
```

### Issue: Validation not working

```typescript
// When using reactive manually, ensure errors array is initialized
{
  email: {
    value: '',
    validations: [...],
    errors: []  // ← Required when not using createModel!
  }
}

// Re-create validator if form changes
const validator = new VueSanity(myForm);
```

---

## 📚 Documentation Links

- **README**: Intro and quick reference
- **Usage Guide**: Complete guide with examples
- **API Reference**: All validators documented
- **Internal Rules**: Code standards and conventions
- **GitHub**: https://github.com/siyavuyachagi/vuesanity

---

## 🎯 Common Use Cases

### Login Form

```typescript
interface LoginDto {
  email: string;
  password: string;
}

const loginForm = createModel<LoginDto>({
  email: { value: "", validations: [required(), email()] },
  password: { value: "", validations: [required(), minChars(8)] },
});
```

### Registration Form

```typescript
interface RegisterDto {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}

const regForm = createModel<RegisterDto>({
  firstName: { value: "", validations: [required(), alpha(true)] },
  email: { value: "", validations: [required(), email()] },
  password: { value: "", validations: [required(), password()] },
  confirmPassword: {
    value: "",
    validations: [required(), sameAs(() => regForm.password!.value)],
  },
  acceptedTerms: {
    value: false,
    validations: [mustBeTrue("You must accept the terms")],
  },
});
```

### Change Password Form

```typescript
interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

const changeForm = createModel<ChangePasswordDto>({
  oldPassword: { value: "", validations: [required()] },
  newPassword: {
    value: "",
    validations: [
      required(),
      password(),
      differentFrom(
        () => changeForm.oldPassword!.value,
        "New password must differ",
      ),
    ],
  },
});
```

### File Upload

```typescript
interface UploadDto {
  title: string;
  file: File;
}

const uploadForm = createModel<UploadDto>({
  title: { value: "", validations: [required()] },
  file: {
    value: null,
    validations: [required(), fileExtension(["pdf"]), maxFileSize(5)],
  },
});
```

### Survey Form

```typescript
interface SurveyDto {
  birthDate: string;
  rating: number;
  website: string;
}

const surveyForm = createModel<SurveyDto>({
  birthDate: { value: null, validations: [required(), maxDate(new Date())] },
  rating: { value: null, validations: [required(), rangeNumber(1, 5)] },
  website: { value: "", validations: [url()] },
});
```

---

## 💡 Pro Tips

1. **`createModel<T>`** - Prefer this over manual `reactive<ModelConfig<T>>` for full type safety
2. **`Field` type** - Use for individual field props in components: `defineProps<{ name: Field }>()`
3. **Custom Validators** - Create your own following the `(value: any) => string | null` pattern
4. **Async Validation** - Wrap in a composable that awaits before calling `new VueSanity(...)`
5. **Multi-step Forms** - Validate each step separately using partial models
6. **`cleanValues: false`** - Pass `false` as second arg to preserve values after validation
7. **Reset Forms** - Clear values and re-instantiate VueSanity to reset state

---
