# vue-codemirror6 Agent Instructions

## Project Overview

**vue-codemirror6** is a Vue 3 component library providing CodeMirror 6 integration for both Vue 2.7+ and Vue 3.3+. The library enables rich code editing capabilities with syntax highlighting, linting, and full TypeScript support.

- **Main Entry**: `src/index.ts` (library exports)
- **Demo/Docs**: `src/docs/` (Rsbuild-based demo site)
- **Component**: `src/CodeMirror.vue` (main Vue component)
- **Package Manager**: pnpm@11.8.0+
- **Node Version**: ^22.18.0 || >=24.12.0

## Build System (Rslib + Rsbuild)

### Library Build (Rslib)

- **Config**: `rslib.config.ts`
- **Command**: `pnpm build-only` (or `rslib` directly)
- **Output**:
  - ESM: `dist/index.es.js` (with `.d.ts`)
  - CJS: `dist/index.cjs`
  - UMD: `dist/index.umd.js`
- **Features**: Vue plugin bundled, source maps included, package metadata injected

### Demo/Docs Build (Rsbuild)

- **Config**: `rsbuild.config.ts`
- **Commands**:
  - Development: `pnpm dev` (serves demo at `http://localhost:3000`)
  - Production: `pnpm build:docs` (outputs to `docs/`)
  - Preview: `pnpm preview`
- **Demo Entry**: `src/docs/index.ts`
- **Template**: `index.html`
- **Features**: Vue 3, SCSS support, code examples, interactive components

## Development Workflow

### Installation & Setup

```bash
pnpm install
```

### Common Commands

- **Development**: `pnpm dev` — starts demo dev server
- **Library Watch**: `pnpm dev:lib` — watches library source for changes
- **Build All**: `pnpm build` — runs type-check + library build
- **Build Library**: `pnpm build-only` — Rslib library build
- **Build Docs**: `pnpm build:docs` — Rsbuild demo site
- **Type Check**: `pnpm type-check` — vue-tsc validation
- **Clean Cache**: `pnpm clean` — removes build cache

### Testing & Quality

- **Run Tests**: `pnpm test` — Rstest runner
- **Watch Tests**: `pnpm test:ui` — interactive test UI
- **Coverage**: `pnpm test:coverage` — coverage report
- **Lint**: `pnpm lint` — runs all linters
  - `pnpm lint:check` — Biome check with auto-fix
  - `pnpm lint:rslint` — Rslint validation
  - `pnpm lint:format` — Prettier formatting

## Testing

This project uses **Rstest** for unit testing with Vue Test Utils and Testing Library.

### Test Files

- Located in `src/__tests__/` (mirrors source structure)
- File pattern: `*.spec.ts` or `*.test.ts`
- Configuration: `rstest.config.ts`

### Test Strategy

- Component rendering and props validation
- v-model binding and events (update, change, focus)
- Method exposure (view, selection, cursor, json, etc.)
- SSR compatibility
- Edge cases and error handling

## Code Style & Quality

### Linting Tools

- **Rslint** (`rslint.config.ts`): Fast, Rust-based linting
- **Biome** (`biome.json`): Code formatting and analysis
- **Prettier** (`.prettierrc`): Code formatting fallback

### TypeScript

- **Config Files**:
  - `tsconfig.json` — base configuration
  - `tsconfig.app.json` — application code
  - `tsconfig.node.json` — build script tooling
  - `tsconfig.rstest.json` — test files
- **Vue SFC Typing**: Full support via `@vue/language-features`

### Import Path Aliases

- `@` → `src/` (use in source code, see `rslib.config.ts` and `rsbuild.config.ts`)
- `vue-codemirror6` → `src/` (demo self-reference, allows testing published API)

## Project Structure

```
vue-codemirror6/
├── src/
│   ├── index.ts                 # Library entry
│   ├── CodeMirror.vue           # Main component
│   ├── docs/                    # Demo/documentation site
│   ├── helpers/                 # Utility functions
│   ├── types/                   # TypeScript definitions
│   └── __tests__/               # Unit tests
├── rslib.config.ts              # Library build configuration
├── rsbuild.config.ts            # Demo build configuration
├── rstest.config.ts             # Test configuration
├── rslint.config.ts             # Linting configuration
├── biome.json                   # Code formatting config
├── tsconfig.json                # TypeScript base
├── vitest.config.ts             # Vitest (used by rstest)
├── package.json                 # Dependencies & scripts
└── index.html                   # Demo HTML template
```

## Key Files to Know

- **Component**: `src/CodeMirror.vue` — Main Vue SFC
- **Types**: `src/Meta.ts` — Version/build date injection
- **Exports**: `src/index.ts` — What gets published
- **Tests**: `src/__tests__/CodeMirror.spec.ts` — Component tests
- **Helpers**: `src/helpers/h-demi.ts` — Vue 2/3 compatibility utilities

## Important Patterns

### Vue 2/3 Compatibility

- Uses `vue-demi` for cross-version support
- Composition API works on both versions
- `script setup` syntax available via SFC compiler

### Library Output

- ESM bundle with `.d.ts` declaration files
- CommonJS for Node.js consumers
- UMD for direct `<script>` tags (globals: `autocomplete`, `commands`, `language`, `lint`, etc.)
- Source maps for debugging

### Build Artifacts

- Keep `dist/` in `.gitignore` (rebuilt on CI)
- Published files in `package.json` `files` field: `CHANGELOG.md` and `/dist`
- UMD globals defined in `rslib.config.ts` for each CodeMirror module

## Before Making Changes

1. **Run full test suite**: `pnpm test`
2. **Type check**: `pnpm type-check`
3. **Lint code**: `pnpm lint`
4. **Test in demo**: `pnpm dev` and verify component in browser
5. **Build all targets**: `pnpm build`

## Common Tasks

### Adding a Prop

1. Update `CodeMirror.vue` `defineProps`
2. Add TypeScript type in `types/`
3. Update README.md props table
4. Add test case in `src/__tests__/`
5. Test with `pnpm dev`

### Adding a Method

1. Implement in `CodeMirror.vue` using `defineExpose`
2. Export type in `src/index.ts` if needed
3. Add test case in `src/__tests__/`
4. Update README.md method docs
5. Verify backward compatibility with CM5 compat layer

### Fixing a Bug

1. Write a failing test
2. Fix the implementation
3. Verify test passes: `pnpm test`
4. Check demo: `pnpm dev`
5. Run full lint/type/build: `pnpm build`

### Updating Dependencies

- Review breaking changes for Rslib/Rsbuild/Vue versions
- Run `pnpm install` to update lock file
- Run full test suite: `pnpm test`
- Test demo: `pnpm dev`
- Verify builds: `pnpm build`

## Release Process

1. Update version in `package.json`
2. Run `pnpm version` (auto-generates CHANGELOG)
3. Commit & tag
4. Push to remote
5. CI publishes to npm

The `pnpm version` script uses `auto-changelog` and runs Husky hooks.

## Debugging

### Dev Server Issues

- Check port 3000 availability: `pnpm dev --port 5173`
- Clear cache: `pnpm clean`
- Reinstall node_modules: `rm -rf node_modules && pnpm install`

### Build Errors

- Verify TypeScript: `pnpm type-check`
- Check Rslib config for output target mismatch
- Look at `dist/` for partial builds (may cause confusion)

### Test Failures

- Run UI mode for interactive debugging: `pnpm test:ui`
- Check Rstest config for environment variables (Happy DOM, Vue Test Utils)
- Verify mock setup matches real CodeMirror API

## Additional Resources

- [CodeMirror 6 Docs](https://codemirror.net/6/)
- [Vue 3 Guide](https://vuejs.org/)
- [Rslib Documentation](https://lib.rspack.dev/)
- [Rsbuild Documentation](https://rsbuild.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
