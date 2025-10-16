# Internal Rules and Conventions

## Naming Conventions

### Variables
- Use **camelCase** for all local and module-level variables.
- Variable names should be **descriptive**, not abbreviated.
- Avoid single letters except for very short loops (`i`, `j`, etc.).
- Prefix booleans with `is`, `has`, or `should` (e.g., `isValid`, `hasError`, `shouldUpdate`).
- Use plural names for arrays and collections (e.g., `rules`, `errors`, `validators`).

### Functions
- **camelCase** for regular functions and composables.
- Function names should **start with a verb** (e.g., `validateForm`, `getRuleName`).

### Classes
- **PascalCase** (e.g., `VueSanity`, `ValidationResult`, `RuleParser`).

### Constants
- **UPPER_CASE** with underscores (e.g., `DEFAULT_RULES`, `MAX_LENGTH`).

### Files
- **kebab-case** for all filenames (e.g., `rule-parser.ts`, `use-validator.ts`).
- Test files should mirror the source name with `.test.ts` (e.g., `rule-parser.test.ts`).

### Types & Interfaces
- **PascalCase** for both (e.g., `ValidationSchema`, `RuleDefinition`).
- Use `I` prefix only if it improves clarity — otherwise skip it.

### Enums
- **PascalCase** for the enum name, and **UPPER_CASE** for members.
  ```ts
  enum RuleType {
    REQUIRED = "required",
    EMAIL = "email",
  }


## Commit Messages
Use [Conventional Commits](https://www.conventionalcommits.org):
- feat: add new feature
- fix: bug fix
- chore: maintenance

## Folder Structure Rules
- `src/` contains TypeScript only.
- No external imports in `dist/`.
- Always export from `src/index.ts`.
