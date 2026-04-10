# Project Structure
Generated: 2026-04-10T20:57:13.436Z

## Flat List
```
./CHANGELOG.md
./coverage
./coverage/base.css
./coverage/block-navigation.js
./coverage/coverage-final.json
./coverage/favicon.png
./coverage/index.html
./coverage/prettify.css
./coverage/prettify.js
./coverage/sort-arrow-sprite.png
./coverage/sorter.js
./coverage/src
./coverage/src/core
./coverage/src/core/create-model.ts.html
./coverage/src/core/index.html
./coverage/src/core/index.ts.html
./coverage/src/core/vuesanity.ts.html
./coverage/src/helpers
./coverage/src/helpers/country-codes.ts.html
./coverage/src/helpers/form-data.ts.html
./coverage/src/helpers/index.html
./coverage/src/index.html
./coverage/src/index.ts.html
./coverage/src/validators
./coverage/src/validators/boolean
./coverage/src/validators/boolean/index.html
./coverage/src/validators/boolean/index.ts.html
./coverage/src/validators/boolean/must-be-false.ts.html
./coverage/src/validators/boolean/must-be-true.ts.html
./coverage/src/validators/date
./coverage/src/validators/date/index.html
./coverage/src/validators/date/index.ts.html
./coverage/src/validators/date/max-date.ts.html
./coverage/src/validators/date/min-date.ts.html
./coverage/src/validators/date/range-date.ts.html
./coverage/src/validators/file
./coverage/src/validators/file/file-extension.ts.html
./coverage/src/validators/file/file-size.ts.html
./coverage/src/validators/file/file-type.ts.html
./coverage/src/validators/file/index.html
./coverage/src/validators/file/index.ts.html
./coverage/src/validators/file/max-file-size.ts.html
./coverage/src/validators/file/min-file-size.ts.html
./coverage/src/validators/number
./coverage/src/validators/number/index.html
./coverage/src/validators/number/index.ts.html
./coverage/src/validators/number/max-number.ts.html
./coverage/src/validators/number/min-number.ts.html
./coverage/src/validators/number/range-number.ts.html
./coverage/src/validators/string
./coverage/src/validators/string/alpha.ts.html
./coverage/src/validators/string/alphanumeric.ts.html
./coverage/src/validators/string/chars.ts.html
./coverage/src/validators/string/different-from.ts.html
./coverage/src/validators/string/email.ts.html
./coverage/src/validators/string/index.html
./coverage/src/validators/string/index.ts.html
./coverage/src/validators/string/max-chars.ts.html
./coverage/src/validators/string/min-chars.ts.html
./coverage/src/validators/string/numeric.ts.html
./coverage/src/validators/string/password.ts.html
./coverage/src/validators/string/phone.ts.html
./coverage/src/validators/string/regex.ts.html
./coverage/src/validators/string/required.ts.html
./coverage/src/validators/string/same-as.ts.html
./coverage/src/validators/string/url.ts.html
./docs
./docs/export-structure-organization.md
./docs/internal-rules.md
./docs/project-stats.md
./docs/quick-reference-commands.md
./docs/release-guide.md
./docs/usage.md
./LICENSE
./package-lock.json
./package.json
./README.md
./scripts
./scripts/export-structure.js
./scripts/metrics.js
./src
./src/core
./src/core/create-model.ts
./src/core/index.ts
./src/core/vuesanity.ts
./src/helpers
./src/helpers/country-codes.ts
./src/helpers/form-data.ts
./src/index.ts
./src/types
./src/types/field-config.ts
./src/types/index.ts
./src/types/model-config.ts
./src/types/validation-rule.ts
./src/validators
./src/validators/boolean
./src/validators/boolean/index.ts
./src/validators/boolean/must-be-false.ts
./src/validators/boolean/must-be-true.ts
./src/validators/date
./src/validators/date/index.ts
./src/validators/date/max-date.ts
./src/validators/date/min-date.ts
./src/validators/date/range-date.ts
./src/validators/file
./src/validators/file/file-extension.ts
./src/validators/file/file-size.ts
./src/validators/file/file-type.ts
./src/validators/file/index.ts
./src/validators/file/max-file-size.ts
./src/validators/file/min-file-size.ts
./src/validators/index.ts
./src/validators/number
./src/validators/number/index.ts
./src/validators/number/max-number.ts
./src/validators/number/min-number.ts
./src/validators/number/range-number.ts
./src/validators/string
./src/validators/string/alpha.ts
./src/validators/string/alphanumeric.ts
./src/validators/string/chars.ts
./src/validators/string/different-from.ts
./src/validators/string/email.ts
./src/validators/string/index.ts
./src/validators/string/max-chars.ts
./src/validators/string/min-chars.ts
./src/validators/string/numeric.ts
./src/validators/string/password.ts
./src/validators/string/phone.ts
./src/validators/string/regex.ts
./src/validators/string/required.ts
./src/validators/string/same-as.ts
./src/validators/string/url.ts
./tests
./tests/core
./tests/core/vuesanity.test.ts
./tests/helpers
./tests/helpers/form-data.test.ts
./tests/integration
./tests/integration/vuesanity.integration.test.ts
./tests/types
./tests/types/login-dto.ts
./tests/types/register-dto.ts
./tests/validators
./tests/validators/booelan.test.ts
./tests/validators/date.test.ts
./tests/validators/file.test.ts
./tests/validators/number.test.ts
./tests/validators/string.test.ts
./tsconfig.build.json
./tsconfig.json
./vitest.config.ts
```

## Tree View
```
- CHANGELOG.md
- coverage
  - base.css
  - block-navigation.js
  - coverage-final.json
  - favicon.png
  - index.html
  - prettify.css
  - prettify.js
  - sort-arrow-sprite.png
  - sorter.js
  - src
    - core
      - create-model.ts.html
      - index.html
      - index.ts.html
      - vuesanity.ts.html
    - helpers
      - country-codes.ts.html
      - form-data.ts.html
      - index.html
    - index.html
    - index.ts.html
    - validators
      - boolean
        - index.html
        - index.ts.html
        - must-be-false.ts.html
        - must-be-true.ts.html
      - date
        - index.html
        - index.ts.html
        - max-date.ts.html
        - min-date.ts.html
        - range-date.ts.html
      - file
        - file-extension.ts.html
        - file-size.ts.html
        - file-type.ts.html
        - index.html
        - index.ts.html
        - max-file-size.ts.html
        - min-file-size.ts.html
      - number
        - index.html
        - index.ts.html
        - max-number.ts.html
        - min-number.ts.html
        - range-number.ts.html
      - string
        - alpha.ts.html
        - alphanumeric.ts.html
        - chars.ts.html
        - different-from.ts.html
        - email.ts.html
        - index.html
        - index.ts.html
        - max-chars.ts.html
        - min-chars.ts.html
        - numeric.ts.html
        - password.ts.html
        - phone.ts.html
        - regex.ts.html
        - required.ts.html
        - same-as.ts.html
        - url.ts.html
- docs
  - export-structure-organization.md
  - internal-rules.md
  - project-stats.md
  - quick-reference-commands.md
  - release-guide.md
  - usage.md
- LICENSE
- package-lock.json
- package.json
- README.md
- scripts
  - export-structure.js
  - metrics.js
- src
  - core
    - create-model.ts
    - index.ts
    - vuesanity.ts
  - helpers
    - country-codes.ts
    - form-data.ts
  - index.ts
  - types
    - field-config.ts
    - index.ts
    - model-config.ts
    - validation-rule.ts
  - validators
    - boolean
      - index.ts
      - must-be-false.ts
      - must-be-true.ts
    - date
      - index.ts
      - max-date.ts
      - min-date.ts
      - range-date.ts
    - file
      - file-extension.ts
      - file-size.ts
      - file-type.ts
      - index.ts
      - max-file-size.ts
      - min-file-size.ts
    - index.ts
    - number
      - index.ts
      - max-number.ts
      - min-number.ts
      - range-number.ts
    - string
      - alpha.ts
      - alphanumeric.ts
      - chars.ts
      - different-from.ts
      - email.ts
      - index.ts
      - max-chars.ts
      - min-chars.ts
      - numeric.ts
      - password.ts
      - phone.ts
      - regex.ts
      - required.ts
      - same-as.ts
      - url.ts
- tests
  - core
    - vuesanity.test.ts
  - helpers
    - form-data.test.ts
  - integration
    - vuesanity.integration.test.ts
  - types
    - login-dto.ts
    - register-dto.ts
  - validators
    - booelan.test.ts
    - date.test.ts
    - file.test.ts
    - number.test.ts
    - string.test.ts
- tsconfig.build.json
- tsconfig.json
- vitest.config.ts
```