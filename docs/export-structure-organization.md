# VueSanity - Export Structure & Barrel Exports

## 📁 Complete File Structure

- Complete Project File Structure: [/project-structure.md](./project-structure.md)

## 🎯 Import Patterns

### Pattern 1: Import Everything (Recommended for small projects)
```typescript
import VueSanity, {
  createModel,
  required,
  email,
  minChars,
  maxChars,
  phone,
  mustBeTrue,
  mustBeFalse,
  maxFileSize,
  minDate,
  rangeDate
} from '@siyavuyachagi/vuesanity';
import type { ModelConfig, FieldConfig, Field, ValidationRule } from '@siyavuyachagi/vuesanity';
```

### Pattern 2: Import by Category (Recommended for larger projects)
```typescript
// String validators only
import { required, email, minChars, password, differentFrom } from '@siyavuyachagi/vuesanity/validators/string';

// Boolean validators only
import { mustBeTrue, mustBeFalse } from '@siyavuyachagi/vuesanity/validators/boolean';

// File validators only
import { maxFileSize, fileExtension, fileType } from '@siyavuyachagi/vuesanity/validators/file';

// Number validators only
import { minNumber, maxNumber, rangeNumber } from '@siyavuyachagi/vuesanity/validators/number';

// Date validators only
import { minDate, maxDate, rangeDate } from '@siyavuyachagi/vuesanity/validators/date';

// All validators
import * as validators from '@siyavuyachagi/vuesanity/validators';
```

### Pattern 3: Import Core Only
```typescript
import VueSanity, { getFormData, createModel } from '@siyavuyachagi/vuesanity/core';
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
├── createModel (utility)
├── All Boolean Validators (2)
├── All String Validators (14)
├── All File Validators (5)
├── All Number Validators (3)
├── All Date Validators (3)
└── All Types (ModelConfig, FieldConfig, Field, ValidationRule)
```

### src/core/index.ts
```
Exports:
├── VueSanity (class)
├── getFormData (utility)
└── createModel (utility)
```

### src/validators/index.ts
```
Re-exports:
├── src/validators/boolean/index
├── src/validators/string/index
├── src/validators/file/index
├── src/validators/number/index
└── src/validators/date/index
```

### src/validators/boolean/index.ts
```
Exports:
├── mustBeTrue
└── mustBeFalse
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
├── differentFrom
├── url
├── regex
├── alpha
├── alphanumeric
├── numeric
└── password
```

### src/validators/file/index.ts
```
Exports:
├── fileExtension
├── maxFileSize
├── minFileSize
├── fileSize
└── fileType
```

### src/validators/number/index.ts
```
Exports:
├── minNumber
├── maxNumber
└── rangeNumber
```

### src/validators/date/index.ts
```
Exports:
├── minDate
├── maxDate
└── rangeDate
```

### src/types/index.ts
```
Exports:
├── FieldConfig
├── Field
├── ModelConfig
└── ValidationRule
```