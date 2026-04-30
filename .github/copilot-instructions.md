# Vue-CodeMirror6 Workspace Instructions

**Project**: A Vue 2 & 3 compatible CodeMirror 6 component library
**Tech Stack**: TypeScript, Vue 3 (with vue-demi for Vue 2 support), Vite, Vitest, CodeMirror 6
**Language**: Primarily TypeScript with Vue SFC components

## Essential Commands

| Task                   | Command                                            |
| ---------------------- | -------------------------------------------------- |
| **Development server** | `pnpm dev`                                         |
| **Build library**      | `pnpm build` (includes type checking)              |
| **Build docs**         | `pnpm build:docs` then `pnpm preview`              |
| **Run tests**          | `pnpm test` (watch mode) or `pnpm test:run` (once) |
| **Test coverage**      | `pnpm test:coverage`                               |
| **All linting**        | `pnpm lint` (oxlint, eslint, prettier)             |
| **Type check**         | `pnpm type-check` (vue-tsc)                        |

## Architecture & Key Patterns

### Main Component (`src/index.ts`, `src/Meta.ts`)

- **Vue Composition API** with `vue-demi` for Vue 2/3 compatibility
- **Core Props**: `modelValue`, `lang`, `extensions`, `linter`, `keymap`, `dark`, `readonly`, `disabled`, etc.
- **Exposed Methods**: `getView()`, `focus()`, `getRange()`, `setCursor()`, `getSelection()` (CodeMirror5 API compatibility layer)
- **Event Emitters**: `ready`, `update`, `change`, `destroy`
- **Two Setup Modes**: `basic` (basicSetup) or `minimal` (minimalSetup)

### Design Principles

1. **Unidirectional + v-model binding**: Text content updates flow via v-model
2. **Optional ChainING on `view.value`**: All CodeMirror view access uses `view.value?.` to handle SSR
3. **Props over Extensions**: Explicit props (`lang`, `linter`, `keymap`) separate from generic `extensions[]` for better type safety and DX
4. **Lazy Initialization**: Editor only initializes in browser (client-side), SSR-safe with `onMounted` checks

### Testing Strategy (`src/__tests__/`)

- **`CodeMirror.spec.ts`**: Component functionality (rendering, props, v-model, events, slots, public methods)
- **`CodeMirror.ssr.spec.ts`**: SSR compatibility (server-side rendering, safe method calls, hydration, cleanup)
- **Framework**: Vitest with happy-dom environment
- **Setup**: Uses Vue Test Utils for component mounting
- **Coverage Targets**: All public methods and critical code paths (see vitest.config.ts for exclusions)

## Code Quality Standards

### Linting & Formatting

- **Oxlint**: Fast, Rust-based linting (primary)
- **ESLint**: Vue plugin + TypeScript rules + accessibility checks
- **Prettier**: Code formatting
- **vue-tsc**: Type checking before build

Run all checks: `pnpm lint` (automatically fixes most issues)

### TypeScript

- **Strict Mode**: Enabled
- **Vue Support**: `@vue/eslint-config-typescript`
- **Type Declarations**: Auto-generated via `vite-plugin-dts` during build
- **Aliases**: `@` → `src/`, `vue-codemirror6` → `src/`

## Important Context

### SSR Compatibility (Critical)

The component must work in SSR environments (Nuxt.js, etc.):

- `view.value` may be `undefined` on server ⚠️
- Always use optional chaining: `view.value?.method()`
- Browser-only code wrapped in `if (typeof window !== 'undefined')`
- See [SSR_FIX_SUMMARY.md](../SSR_FIX_SUMMARY.md) for detailed changes

### Build Outputs

### Generated Metadata

- `src/Meta.ts` is generated automatically when starting the dev server or running the library build.
- If `src/Meta.ts` is missing in a fresh checkout, run `pnpm dev` or `pnpm build` before treating it as a broken import.

Multiple formats in `dist/`:

- ES modules: `index.es.js`
- CommonJS: `index.cjs.js`
- UMD: `index.umd.js`
- IIFE: `index.iife.js`
- Types: `index.d.ts`

### Peer Dependencies

CodeMirror 6 packages are peer deps (not bundled):

```text
@codemirror/{commands,language,lint,search,state,view}
@codemirror/autocomplete
codemirror (state/view core)
style-mod
vue: ^2.7.14 || ^3.3.4
```

Users must install these separately to avoid duplication.

### Common Development Tasks

**Adding a new prop**: Add to interface → component props → applicable compartment/state → test it

**Adding language support demo**: Add to `src-docs/components/` and import in `App.vue`

**Fixing a bug**: Create test first in `__tests__/`, implement fix in `src/`, verify with `pnpm test`

**Updating themes or extensions**: Use the `extensions` prop or create a helper function in `src/helpers/`

## Key Files Reference

| File                                                                            | Purpose                                         |
| ------------------------------------------------------------------------------- | ----------------------------------------------- |
| [src/index.ts](../src/index.ts)                                                 | Main component definition                       |
| [src/Meta.ts](../src/Meta.ts)                                                   | Component metadata and type definitions         |
| [src/**tests**/CodeMirror.spec.ts](../src/__tests__/CodeMirror.spec.ts)         | Component tests                                 |
| [src/**tests**/CodeMirror.ssr.spec.ts](../src/__tests__/CodeMirror.ssr.spec.ts) | SSR tests                                       |
| [vite.config.ts](../vite.config.ts)                                             | Build config (outputs, plugins, DTS generation) |
| [vitest.config.ts](../vitest.config.ts)                                         | Test config (happy-dom, coverage)               |
| [eslint.config.ts](../eslint.config.ts)                                         | Linting config                                  |

## Common Pitfalls to Avoid

1. **Direct `view` access without optional chaining** → SSR will break
2. **Importing `@codemirror` modules in component** → May cause bundling issues; prefer `extensions` prop
3. **Mutating props directly** → Use emitted events or expose methods instead
4. **Async state changes without `nextTick`** → Can cause race conditions in updates
5. **Forgetting to test SSR mode** → Use `pnpm test` to run all tests including SSR

## Workspace Conventions

- **Vue 3 syntax throughout** (vue-demi handles Vue 2 compatibility)
- **TypeScript strict mode**
- **Composition API only** (no Options API)
- **Kebab-case for component props** (auto-converted from camelCase)
- **PascalCase for type names**, camelCase for variables/functions
- **Comments for complex CodeMirror API usage** (document non-obvious patterns)
