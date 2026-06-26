# tsup -> Rslib Migration Checklist

Use this reference when the source project builds libraries with `tsup`.

## Checklist

Copy this checklist and check off items as you complete them:

- [ ] Step 0: Read official guide (https://rslib.rs/guide/migration/tsup) ⛔ BLOCKING
- [ ] Step 1: Inventory current `tsup` behavior and customizations
  - [ ] Record key build scripts, `tsup` CLI options, and configuration files
  - [ ] Record key config/plugins and output behavior (format, d.ts, externals, output structure, etc.)
  - [ ] Record output usage expectations (how outputs are consumed)
- [ ] Step 2: Execute migration following the official guide
  - [ ] Apply guide steps with minimal scope
  - [ ] Map plugins and other advanced customizations
- [ ] Step 3: Verify behavior and output compatibility
  - [ ] Build passes without errors
  - [ ] Build with watch mode runs without errors and incremental rebuild works as expected
  - [ ] Output structure, formats, file extensions, and declaration files match expectations
  - [ ] Output can be consumed and run as expected
  - [ ] Check whether `package.json` fields need updates (`main`, `module`, `types`, `exports`, `files`, `bin`, etc.)
- [ ] Step 4: Cleanup and summarize
  - [ ] Remove obsolete tsup-only deps/config/scripts after verification
  - [ ] Summarize config mapping and remaining manual follow-ups
