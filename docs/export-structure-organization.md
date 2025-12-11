# VueSanity - Export Structure & Barrel Exports

## 📁 Complete File Structure

```
src/
├── core/
│   ├── index.ts                    (Barrel: exports VueSanity + getFormData)
│   └── vuesanity.ts                (Main validation class)
├── helpers/
│   ├── country-codes.ts             (List of countries, ISO codes, dialing codes)
│   └── form-data.ts                 (Utility for converting objects to FormData)
├── types/
│   ├── index.ts                    (Barrel: all types)
│   ├── field.ts
│   ├── model-config.ts
│   └── rule.ts
├── validators/
│   ├── date/
│   |   ├── index.ts                (Barrel: all date validators)
│   |   ├── max-date.ts
│   |   ├── min-date.ts
│   │   └── range-date.ts
│   ├── file/
│   │   ├── file-extensions.ts
│   │   ├── file-size.ts
│   │   ├── file-type.ts
│   │   ├── index.ts                (Barrel: all file validators)
│   │   ├── max--file-size.ts
│   │   └── min-file-size.ts
│   ├── number/
│   │   ├── index.ts                (Barrel: all number validators)
│   │   ├── max-number.ts
│   │   ├── min-number.ts
│   │   └── range-nuumber.ts
│   ├── string/
│   │   ├── alpha.ts
│   │   ├── alphanumeric.ts
│   │   ├── chars.ts
│   │   ├── different-from.ts
│   │   ├── email.ts
│   │   ├── index.ts                (Barrel: all string validators)
│   │   ├── max-chars.ts
│   │   ├── min-chars.ts
│   │   ├── numeric.ts
│   │   ├── password.ts
│   │   ├── phone.ts
│   │   ├── regex.ts
│   │   ├── required.ts
│   │   ├── same-as.ts
│   │   └── url.ts
│   └── index.ts                    (Master barrel: re-exports all validators)
└── index.ts                        (Main entry point - exports everything)
```

## 🎯 Import Patterns

### Pattern 1: Import Everything (Recommended for small projects)
```typescript
import VueSanity, {
  required,
  email,
  minChars,
  maxChars,
  phone,
  maxSize,
  minDate,
  range
} from '@siyavuyachagi/vuesanity';
import type { ModelConfig, FieldConfig, ValidationRule } from '@siyavuyachagi/vuesanity';
```

### Pattern 2: Import by Category (Recommended for larger projects)
```typescript
// String validators only
import { required, email, minChars } from '@siyavuyachagi/vuesanity/validators/string';

// File validators only
import { maxSize, extensions, image } from '@siyavuyachagi/vuesanity/validators/file';

// Number validators only
import { min, max, range } from '@siyavuyachagi/vuesanity/validators/number';

// Date validators only
import { minDate, maxDate, dateRange } from '@siyavuyachagi/vuesanity/validators/date';

// All validators
import * as validators from '@siyavuyachagi/vuesanity/validators';
```

### Pattern 3: Import Core Only
```typescript
import VueSanity, { getFormData } from '@siyavuyachagi/vuesanity/core';
```

### Pattern 4: Individual Imports (Tree-shaking friendly)
```typescript
import VueSanity from '@siyavuyachagi/vuesanity/core/vuesanity';
import { required } from '@siyavuyachagi/vuesanity/validators/string/required';
import type { ModelConfig } from '@siyavuyachagi/vuesanity/types/model-config';
```

## 📦 Export Hierarchy

### src/index.ts (Main Entry Point)
```
Exports:
├── VueSanity (class)
├── getFormData (utility)
├── All String Validators (12)
├── All File Validators (5)
├── All Number Validators (3)
├── All Date Validators (3)
└── All Types
```

### src/core/index.ts
```
Exports:
├── VueSanity (class)
└── getFormData (utility)
```

### src/validators/index.ts
```
Re-exports:
├── src/validators/string/index
├── src/validators/file/index
├── src/validators/number/index
└── src/validators/date/index
```

### src/validators/string/index.ts
```
Exports:
├── required
├── email
├── minChars
├── maxChars
├── chars
├── phone
├── sameAs
├── url
├── regex
├── alpha
├── alphanumeric
└── numeric
```

### src/validators/file/index.ts
```
Exports:
├── extensions
├── maxSize
├── minSize
├── size
└── image
```

### src/validators/number/index.ts
```
Exports:
├── min
├── max
└── range
```

### src/validators/date/index.ts
```
Exports:
├── minDate
├── maxDate
└── dateRange
```

### src/types/index.ts
```
Exports:
├── FieldConfig
├── ModelConfig
└── ValidationRule
```