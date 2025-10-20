# Internal Rules and Conventions

## Naming Conventions

### Variables

* Use **camelCase** for all local and module-level variables.
* Variable names should be **descriptive**, not abbreviated.
* Avoid single letters except for very short loops (`i`, `j`, etc.).
* Prefix booleans with `is`, `has`, or `should` (e.g., `isValid`, `hasError`, `shouldUpdate`).
* Use plural names for arrays and collections (e.g., `rules`, `errors`, `validators`).

### Functions

* **camelCase** for regular functions and composables.
* Function names should **start with a verb** (e.g., `validateForm`, `getRuleName`).

### Classes

* **PascalCase** (e.g., `VueSanity`, `ValidationResult`, `RuleParser`).

### Constants

* **UPPER_CASE** with underscores (e.g., `DEFAULT_RULES`, `MAX_LENGTH`).

### Files

* **kebab-case** for all filenames (e.g., `rule-parser.ts`, `use-validator.ts`).
* Test files should mirror the source name with `.test.ts` (e.g., `rule-parser.test.ts`).

### Types & Interfaces

* **PascalCase** for both (e.g., `ValidationSchema`, `RuleDefinition`).
* Use `I` prefix only if it improves clarity — otherwise skip it.

### Enums

* **PascalCase** for the enum name, and **UPPER_CASE** for members.

  ```ts
  enum RuleType {
    REQUIRED = "required",
    EMAIL = "email",
  }
  ```

---

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org):

* `feat:` add new feature
* `fix:` bug fix or improvement
* `chore:` maintenance

---

## Folder Structure Rules

* `src/` contains TypeScript only.
* No external imports in `dist/`.
* Always export from `src/index.ts`.
* Tests should import and test from `src/`, never from `dist/`.
* `/docs` folder contains documentation and guides.

---

## Versioning Strategy

### Release Management

* **Never override or mutate a released version.** Each release is immutable.
* Always create a **new version number** for any change, even bug fixes.
* Use **Semantic Versioning** (MAJOR.MINOR.PATCH):
  * `PATCH` (e.g., `1.0.1`) – bug fixes and improvements to existing functionality
  * `MINOR` (e.g., `1.1.0`) – new features (backward compatible)
  * `MAJOR` (e.g., `2.0.0`) – breaking changes

### Branching Strategy

* Keep one main development branch (`main`).
* Tag releases using git tags (e.g., `v1.0.0`, `v1.0.1`, `v1.1.0`).
* For hotfixes on old versions, create a temporary branch from the release tag, fix, and release as a new patch version.

### Example Workflow

1. Release `v1.0.0` to production
2. Continue development on `main`
3. Bug discovered in `v1.0.0`
4. Create hotfix branch from `v1.0.0` tag
5. Fix bug and release as `v1.0.1`
6. Merge hotfix back into `main`

---

## Testing Conventions

All tests should follow the **three-stage testing structure** for clarity and consistency:

### Testing Stages (AAA Pattern)

1. **Setup (Arrange)** – Prepare all data, objects, mocks, and dependencies required for the test.
2. **Process (Act)** – Execute the action or function under test.
3. **Assertion (Assert)** – Verify that the outcome matches the expected result.

**Example:**

```ts
test('should return sum of two numbers', () => {
  // Setup
  const calculator = new Calculator();

  // Process
  const result = calculator.add(2, 3);

  // Assertion
  expect(result).toBe(5);
});
```