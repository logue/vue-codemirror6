# AGENTS.md

You are an expert in JavaScript, Rsbuild, and web application development. You write maintainable, performant, and accessible code.

## Commands

- `pnpm run dev` - Start the dev server
- `pnpm run build` - Build the app for production
- `pnpm run preview` - Preview the production build locally

Always run `pnpm lint` and `pnpm build` before committing. These are also enforced by husky pre-commit hooks via lint-staged.

---

## TypeScript Rules

- **No `any`** — use `unknown` and narrow with type guards.
- **Explicit return types** on exported functions.
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

- Always use `<style scoped>` — unscoped styles are prohibited.
- CSS custom properties (design tokens) must be defined in a shared file (e.g., `src/styles/variables.css`) and not duplicated per component.

---

## Component Naming

- Component files: **PascalCase**, multi-word required (e.g., `UserCard.vue`, `AppHeader.vue`).
  - `src/components/**/*.vue` — `error`
- Do not create single-word components like `Header.vue` or `Card.vue`.

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
- **Import order** (enforced by rslint, auto-fixed by `pnpm lint`):
  1. Node built-ins
  2. Vue core (`vue`, `vue-router`, `@vue/*`, `@rsbuild/*`)
  3. External packages
  4. Internal (`@/**`)
  5. Sibling / index
  6. Type imports
     A blank line is required between each group.

---

## Docs

- Rsbuild: <https://rsbuild.rs/llms.txt>
- Rslib: <https://rslib.rs/llms.txt>
- Rspack: <https://rspack.rs/llms.txt>
- Rstest: <https://rstest.rs/llms.txt>

## Tools

### Rslint

- Run `pnpm run lint` to lint your code
- The configuration is in `rslint.config.ts`

### Rstest

- Run `pnpm run test` to run tests
- Run `pnpm run test:watch` to run tests in watch mode

### Biome

- Run `pnpm run format` to format your code
- Run `pnpm run check` to lint and format in one step

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

## What NOT to Do

- Do not use `any` — use `unknown` with type guards.
- Do not use Options API (`defineComponent`, `data()`, `methods:`).
- Do not use runtime `defineProps({ title: String })` declarations.
- Do not write `../` relative imports that traverse parent directories (exception: `src/**/__tests__/` may use `../` to reach the component under test).
- Do not use `<style>` without `scoped`.
- Do not add `eslint-disable` comments without a description.
- Do not install packages with `npm` or `yarn` — use `pnpm` only.
