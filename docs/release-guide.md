# VueSanity — Release Guide

A step-by-step checklist for preparing and publishing a new version of VueSanity.

---

## 1. Determine Version Type

Use [Semantic Versioning](https://semver.org/spec/v2.0.0.html):

| Change Type                                     | Version Bump | Example           |
| ----------------------------------------------- | ------------ | ----------------- |
| Bug fixes / internal improvements               | PATCH        | `1.0.3` → `1.0.4` |
| New validators / features (backward compatible) | MINOR        | `1.0.4` → `1.1.0` |
| Breaking changes (API, types, behavior)         | MAJOR        | `1.x.x` → `2.0.0` |
| Pre-release / beta                              | Suffix       | `2.0.0-beta.0`    |

> ⚠️ Never override or mutate an already-published version. Every release is immutable.

---

## 2. Pre-Release Checklist

### Code

- [ ] All new validators are implemented and exported from their barrel (`index.ts`)
- [ ] New validators are re-exported from `src/validators/index.ts`
- [ ] New validators are exported from `src/index.ts` (main entry point)
- [ ] New types are exported from `src/types/index.ts`
- [ ] No TypeScript errors (`tsc --noEmit`)
- [ ] No lint warnings

### Tests

- [ ] Unit tests written for all new validators
- [ ] Tests follow the AAA pattern (Arrange / Act / Assert)
- [ ] All tests pass: `npm test`
- [ ] Coverage is 90%+: `npm run test:coverage`

### Build

- [ ] Clean build succeeds: `npm run build`
- [ ] `dist/` folder is generated and contains `.js`, `.cjs`, and `.d.ts` files
- [ ] Verify exports: `cat dist/index.d.ts`

### Documentation

- [ ] `CHANGELOG.md` updated with all changes under the correct version header
- [ ] `README.md` updated if new validators, patterns, or features were added
- [ ] `docs/export-structure-organization.md` updated if file structure changed
- [ ] `docs/project-stats.md` updated (validator counts, file count, bundle size)
- [ ] `docs/quick-reference-commands.md` updated with new validator examples

---

## 3. Update Version

Edit `package.json`:

```json
{
  "version": "2.0.0"
}
```

For a beta release:

```json
{
  "version": "2.0.0-beta.1"
}
```

---

## 4. Update Changelog

Add a new section at the top of `CHANGELOG.md` (above the previous release):

```markdown
## [X.Y.Z] - YYYY-MM-DD

### ⚠ Breaking Changes ← only if applicable

### 🎉 Features

### 🛠 Fixes

### 🧪 Tests

### 📚 Documentation

### ⌛ Maintenance

### 📝 Notes
```

---

## 5. Commit & Tag

```bash
# Stage all changes
git add .

# Commit using Conventional Commits format
git commit -m "chore: release vX.Y.Z"

# Create an annotated git tag
git tag -a vX.Y.Z -m "Release vX.Y.Z"

# Push commits and tags
git push origin main --tags
```

---

## 6. Create GitHub Release

1. Go to your repository on GitHub
2. Click **Releases** → **Draft a new release**
3. Select the tag you just pushed (e.g. `v2.0.0`)
4. Set the release title: `vX.Y.Z`
5. Paste the relevant `CHANGELOG.md` section as the release notes
6. For beta releases: check **Set as a pre-release**
7. Click **Publish release**

> The GitHub Actions workflow (`.github/workflows/publish.yml`) will automatically trigger on publish and deploy to npm with the correct tag (`latest` or `beta`).

---

## 7. Verify npm Publish

After the workflow completes:

```bash
# Check the published version
npm view @siyavuyachagi/vuesanity version

# Check all published versions
npm view @siyavuyachagi/vuesanity versions

# Install and smoke-test locally
npm install @siyavuyachagi/vuesanity@latest
```

For beta:

```bash
npm install @siyavuyachagi/vuesanity@beta
```

---

## 8. Post-Release

- [ ] Confirm package appears on [npmjs.com](https://www.npmjs.com/package/@siyavuyachagi/vuesanity)
- [ ] Confirm GitHub Release is visible and correctly tagged
- [ ] Run `npm run metrics` and update `docs/project-stats.md` if numbers changed
- [ ] Announce the release if applicable (GitHub Discussions, social, etc.)

---

## Hotfix Workflow

If a bug is found in a previously released version:

```bash
# Create a branch from the affected release tag
git checkout -b hotfix/v1.0.5 v1.0.4

# Fix the bug, then bump PATCH version in package.json
# Update CHANGELOG.md

git add .
git commit -m "fix: <describe the fix>"
git tag -a v1.0.5 -m "Hotfix v1.0.5"
git push origin hotfix/v1.0.5 --tags

# Merge back into main
git checkout main
git merge hotfix/v1.0.5
git push origin main
```

---

## npm Tag Reference

| Scenario           | npm Tag  | Version Format  |
| ------------------ | -------- | --------------- |
| Stable release     | `latest` | `2.0.0`         |
| Beta / pre-release | `beta`   | `2.0.0-beta.0`  |
| Alpha              | `beta`   | `2.0.0-alpha.0` |
| Release candidate  | `beta`   | `2.0.0-rc.1`    |

The publish workflow auto-detects the correct tag based on the version string in `package.json`.

---

## Quick Commands Reference

```bash
npm test                  # Run all tests
npm run test:coverage     # Run tests with coverage report
npm run build             # Build the package
npm run metrics           # Print build stats
npm run export:structure  # Generate project structure export
```
