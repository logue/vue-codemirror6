# AGENT.md

This file provides guidance for AI coding agents (GitHub Copilot, Claude, Cursor, etc.) working in this repository.

---

## Project Overview

CodeMirror component for Vue2 and Vue3.

- **Framework**: Vue 3 (`<script setup>` SFC only)
- **Build tool**: Vite 8
- **Language**: TypeScript (strict)
- **Package manager**: pnpm (do not use npm or yarn)
- **Node version**: `^20.19.0 || >=22.12.0`

---

## Commands

```bash
pnpm dev              # Start dev server (http://localhost:5173)
pnpm build            # Type-check + production build
pnpm lint             # Run all linters (oxlint → eslint → prettier → stylelint)
pnpm type-check       # vue-tsc type check only
pnpm test:unit        # Vitest unit tests
pnpm test:coverage    # Vitest with coverage report
pnpm test:e2e         # Playwright E2E tests
pnpm build:analyze    # Bundle size analysis (rollup-plugin-visualizer)
pnpm clean            # Clear Vite dev cache
```

Always run `pnpm lint` and `pnpm type-check` before committing. These are also enforced by husky pre-commit hooks via lint-staged.

---

## TypeScript Rules

- **No `any`** — use `unknown` and narrow with type guards.
- **Explicit return types** on exported functions (Pinia stores are exempt due to setup-style inference).
- **Use `type` over `interface`** for object shapes; extend via intersection (`&`).
- **Union literal types** instead of magic strings:
  ```ts
  type Status = 'active' | 'inactive' | 'pending';
  ```
- **Underscore prefix** for intentionally unused variables: `_value`, `_error`.
- **Array type syntax**: `string[]` not `Array<string>`.
- **Generic constructors**: left-hand side style — `const map: Map<string, User> = new Map()`.

---

## Vue SFC Rules

### Script

- Always use `<script setup lang="ts">` — Options API is prohibited.
- `defineProps` and `defineEmits` must use **type-based declarations** (runtime declarations are prohibited):

  ```ts
  // OK
  const props = defineProps<{ title: string; count?: number }>();
  const emit = defineEmits<{ change: [value: string]; close: [] }>();

  // NG
  const props = defineProps({ title: String });
  ```

- Return values from composables as individual `ref`s (not `reactive`) to enable destructuring.
- Internal state exposed from composables should be wrapped in `readonly()`.

### Template

- **Self-closing void elements**: `<br />`, `<img />`, `<input />`.
- **Attribute order** (enforced by `vue/attributes-order`):
  `DEFINITION` → `LIST_RENDERING` → `CONDITIONALS` → `RENDER_MODIFIERS` → `UNIQUE` → `TWO_WAY_BINDING` → `OTHER_DIRECTIVES` → `ATTR_DYNAMIC` → `ATTR_STATIC` → `ATTR_SHORTHAND_BOOL` → `EVENTS` → `CONTENT`
- Run `pnpm lint` to auto-fix attribute order.

### Style

- Always use `<style lang="scss" scoped>` — unscoped styles are prohibited.
- CSS custom properties (design tokens) must be defined in a shared file (e.g., `src/styles/variables.scss`) and not duplicated per component.
- CSS property order is enforced by stylelint-order — run `pnpm lint:style` to auto-fix.

---

## Component Naming

- Component files: **PascalCase**, multi-word required (e.g., `UserCard.vue`, `AppHeader.vue`).
  - `src/components/**/*.vue` — `error`
  - `src/pages/**/*.vue` and `src/layouts/**/*.vue` — `warn` (file-based routing constraint)
- Do not create single-word components like `Header.vue` or `Card.vue` outside of pages/layouts.

---

## Import Rules

- **Always use the `@/` alias** for internal imports — relative parent traversal (`../`) is prohibited in application code:

  ```ts
  // OK
  import { useUserStore } from '@/stores/user';
  import type { User } from '@/types';

  // NG
  import { useUserStore } from '../../../stores/user';
  ```

  > **Exception**: test files under `src/**/__tests__/` may use `../` to import the component under test (e.g., `import MyComponent from '../MyComponent.vue'`). This is intentional and the ESLint rule is disabled for that scope.

- The `~` alias maps to `node_modules` (e.g., `~/some-lib/style.css`).
- **Import order** (enforced by `import-x/order`, auto-fixed by `pnpm lint:eslint`):
  1. Node built-ins
  2. Vue core (`vue`, `vue-router`, `pinia`, `@vue/*`, `@vitejs/*`)
  3. External packages
  4. Internal (`@/**`)
  5. Sibling / index
  6. Type imports
     A blank line is required between each group.

---

## Pinia Store Rules

- Use **setup-store style** exclusively (not options-store style):
  ```ts
  // OK
  export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null);
    function setUser(u: User) {
      user.value = u;
    }
    return { user, setUser };
  });
  ```
- Store ID must match the file name (e.g., `defineStore('user', ...)` in `stores/user.ts`).
- Persist state via `pinia-plugin-persistedstate` — do not manually read/write `localStorage`.

---

## Accessibility (a11y)

Rules are enforced by `eslint-plugin-vuejs-accessibility`. Key points:

- `<a>` elements must have text content (`vuejs-accessibility/anchor-has-content: error`).
- Avoid `autofocus` (`vuejs-accessibility/no-autofocus: warn`).
- For **single input** → use `<label for="id">` or nesting.
- For **compound UI** (e.g., slider + number input sharing a label) → use `aria-labelledby` or `<fieldset>` + `<legend>`:

  ```vue
  <!-- Compound: aria-labelledby -->
  <p id="volume-label">Volume</p>
  <input type="range" v-model="volume" aria-labelledby="volume-label" />
  <input type="number" v-model="volume" aria-labelledby="volume-label" />

  <!-- Or: fieldset + legend -->
  <fieldset>
    <legend>Volume</legend>
    <input type="range" v-model="volume" />
    <input type="number" v-model="volume" />
  </fieldset>
  ```

- `vuejs-accessibility/label-has-for` is set to `warn` for compound UI patterns. When disabling intentionally, add a description comment (required by `eslint-comments/require-description`):
  ```vue
  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -- compound slider+input UI -->
  ```

---

## ESLint Disable Policy

`eslint-comments/require-description` is set to `error`. Every `eslint-disable` comment **must** include a reason:

```ts
// OK
// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- third-party type gap, no @types available

// NG
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
```

---

## Testing

### Unit tests (Vitest)

- Test files: `src/**/__tests__/*.ts`
- Follow **Arrange / Act / Assert** structure.
- Mock external dependencies (API, DB, browser APIs) — tests must not make real network calls.
- Coverage threshold: **80%** lines and functions (enforced in CI).

### E2E tests (Playwright)

- Test files: `e2e/**/*.{test,spec}.{js,ts}`
- Test user-visible behavior, not implementation details.

---

## Git & PR Rules

- Commit messages follow **Conventional Commits**:
  ```
  feat(auth): add JWT refresh token rotation
  fix(api): handle 429 rate limit with exponential backoff
  docs: update README setup instructions
  ```
- PRs should be focused on a single purpose; aim for diffs under ~400 lines.
- Minimum **1 approving review** required before merging to `master`.
- PR description must include: what changed, how to test, and screenshots if UI is affected.

---

## Environment Variables

- All client-side env vars must be prefixed with `VITE_APP_`:
  ```
  VITE_APP_TITLE=My App
  VITE_APP_API_BASE_URL=https://api.example.com
  ```
- Copy `.env.example` to `.env` before running the dev server.
- Never commit `.env` — it is in `.gitignore`.
- Access via `import.meta.env.VITE_APP_*` (typed in `env.d.ts`).

---

## What NOT to Do

- Do not use `any` — use `unknown` with type guards.
- Do not use Options API (`defineComponent`, `data()`, `methods:`).
- Do not use runtime `defineProps({ title: String })` declarations.
- Do not write `../` relative imports that traverse parent directories (exception: `src/**/__tests__/` may use `../` to reach the component under test).
- Do not use `<style>` without `scoped`.
- Do not write bare `localStorage` / `sessionStorage` access — use `pinia-plugin-persistedstate`.
- Do not add `eslint-disable` comments without a description.
- Do not install packages with `npm` or `yarn` — use `pnpm` only.
