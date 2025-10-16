# VueSanity - Export Structure & Barrel Exports

## 📁 Complete File Structure

```
src/
├── core/
│   ├── index.ts                    (Barrel: exports VueSanity + getFormData)
│   ├── vuesanity.ts                (Main validation class)
│   └── form-data.helper.ts         (FormData conversion utility)
│
├── validators/
│   ├── index.ts                    (Master barrel: re-exports all validators)
│   │
│   ├── string/
│   │   ├── index.ts                (Barrel: all string validators)
│   │   ├── required.ts
│   │   ├── email.ts
│   │   ├── min-chars.ts
│   │   ├── max-chars.ts
│   │   ├── chars.ts
│   │   ├── phone.ts
│   │   ├── same-as.ts
│   │   ├── url.ts
│   │   ├── regex.ts
│   │   ├── alpha.ts
│   │   ├── alphanumeric.ts
│   │   └── numeric.ts
│   │
│   ├── file/
│   │   ├── index.ts                (Barrel: all file validators)
│   │   ├── extensions.ts
│   │   ├── max-size.ts
│   │   ├── min-size.ts
│   │   ├── size.ts
│   │   └── image.ts
│   │
│   ├── number/
│   │   ├── index.ts                (Barrel: all number validators)
│   │   ├── min.ts
│   │   ├── max.ts
│   │   └── range.ts
│   │
│   └── date/
│       ├── index.ts                (Barrel: all date validators)
│       ├── min.ts
│       ├── max.ts
│       └── range.ts
│
├── types/
│   ├── index.ts                    (Barrel: all types)
│   ├── field.ts
│   ├── model.ts
│   └── rule.ts
│
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
import type { ModelConfig } from '@siyavuyachagi/vuesanity/types/model';
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