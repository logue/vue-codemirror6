# tsc -> Rslib Migration Checklist

Use this reference when the source project builds libraries with `tsc`.

## Checklist

Copy this checklist and check off items as you complete them:

- [ ] Step 0: Read official guide (https://rslib.rs/guide/migration/tsc) ⛔ BLOCKING
- [ ] Step 1: Inventory current `tsc` behavior and customizations
  - [ ] Record key build scripts, `tsc` CLI options, and `tsconfig.json` usage
  - [ ] Record key compile behavior and output behavior (JavaScript files format, declaration files output, output structure, JSX handling, etc.)
  - [ ] Record output usage expectations (how outputs are consumed)
- [ ] Step 2: Execute migration following the official guide
  - [ ] Apply guide steps with minimal scope
  - [ ] Map customizations before and after tsc scripts
- [ ] Step 3: Verify behavior and output compatibility
  - [ ] Build passes without errors
  - [ ] Build with watch mode runs without errors and incremental rebuild works as expected
  - [ ] Output structure, formats, file extensions, and declaration files match expectations
  - [ ] Output can be consumed and run as expected
  - [ ] Check whether `package.json` fields need updates (`main`, `module`, `types`, `exports`, `files`, `bin`, etc.)
- [ ] Step 4: Cleanup and summarize
  - [ ] Remove obsolete tsc-only scripts after verification
  - [ ] Summarize config mapping and remaining manual follow-ups
