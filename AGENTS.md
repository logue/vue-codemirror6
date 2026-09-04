# AGENTS.md

You are an expert in TypeScript, Rsbuild, Rstest, and Vue Web application development. You write maintainable, performant, and accessible code.

## Setup & Overview

- **Build tool**: Rsbuild
- **Linter**: Rslint and Biome (with `@logue/biome-plugins` custom rules)
- **Testing**: Rstest
- **Language**: TypeScript 7
- **Package manager**: pnpm (do not use npm or yarn)

**Last updated**: 2026-09-04
**Verified with**: `package.json` in this repository

### Tool Versions

See `package.json` for authoritative dependency versions.

This guide assumes:

- TypeScript 7.0.2 or later
- Rsbuild 2.2.3 or later
- Rstest 0.11.12 or later

**If you encounter version-related issues, check `package.json` directly—it is the source of truth.**

### Dependency Management

- `minimumReleaseAge: 0` is set in `pnpm-workspace.yaml` to prevent unpredictable auto-injection of `minimumReleaseAgeExclude`
- This ensures version resolution is deterministic and reproducible across projects

### VS Code Setup

Recommended extensions are listed in `.vscode/extensions.json`.
Formatter and linter are configured in `.vscode/settings.json`:

- Default formatter: **Biome**
- Format on save: enabled
- Auto-fix on save: Rslint

When you open the project in VS Code, you'll be prompted to install recommended extensions.

## Project

### Project Structure

This project uses two complementary build tools:

- **Rsbuild** - Builds the library for distribution (ESM, CJS, etc.)
  - Command: `pnpm run build`
  - Output: `dist/` (published to npm)
  - Configuration: `rsbuild.config.ts`, `tsconfig.rsbuild.json`

#### TypeScript Configuration Strategy

TypeScript configurations are organized by **tool name, not by purpose**:

- `tsconfig.rstest.json` - Testing configuration (if applicable)

This approach eliminates conditional branching based on build purpose.
Instead, each tool has its own explicit configuration namespace,
making the build pipeline transparent and maintainable.

### Development Workflow

- `pnpm run dev` - Watch mode for library

## Commands

- `pnpm run build` - Build for production
- `pnpm run dev` - Start dev server
- `pnpm run preview` - Preview the built demo site
- `pnpm run test` - Run tests
- `pnpm run test:watch` - Watch mode for tests
- `pnpm run lint` - Lint and format all code (Biome + Rslint)
- `pnpm run inspect` - Inspect final rsbuild config
- `pnpm run clean` - Remove build artifacts
- `pnpm run clean:hard` - Remove build artifact and build caches.

## Documentation

- Rsbuild: <https://rsbuild.rs/llms.txt>
- Rslint: <https://rslint.rs/llms.txt>
- Rstest: <https://rstest.rs/llms.txt>
- Vue: <https://vuejs.org/llms-full.txt>

## Code Style

TypeScript conventions, lint rules, and their rationale are defined in
[`@logue/biome-plugins`](https://github.com/logue/biome-plugins/raw/refs/heads/main/AGENTS.md). Read that file for the full
picture. The summary of what is **enforced at lint time** in this project:

| Rule                     | Severity | What it checks                                    |
| ------------------------ | -------- | ------------------------------------------------- |
| `enforce-pure-src`       | error    | No Storybook/demo imports inside `src/`           |
| `prefer-union-over-enum` | error    | `enum` is forbidden; use union types              |
| `no-null-type`           | warn     | `\| null` in type annotations; use optional (`?`) |

### Directory Structure & File Organization

- **`types/`** — Type-only definitions:
  - `.d.ts`: Type aliases, interfaces, generic types (no values)
  - `.ts`: Type definitions paired with default values or constants
- **`interfaces/`** — Use only when:
  - Multiple inheritance levels needed
  - Clear contract inheritance matters

### Facade Pattern: Hiding Complexity

This project employs the **Facade pattern**. The public API should be simple and focused;
internal complexity is intentionally hidden.

- Users interact with high-level operations (read/write files, transform data)
- Implementation details (binary parsing, encoding, version handling) are internal
- This reduces cognitive load and provides stable contracts

Example: [`symbol-art-parser`](https://github.com/logue/symbol-art-parser) exposes only `.sar` ↔ JSON conversions, hiding binary protocol details.

### API Design Principle

Prioritize external API clarity over internal implementation patterns.
Hidden complexity is acceptable if it provides users with simple, intuitive interfaces.

This may include using the same identifier for both type and value when it improves ergonomics.

## Testing

This project uses **Rstest** for testing.

### Running Tests

- `pnpm run test` - Run all tests
- `pnpm run test:watch` - Run tests in watch mode

### Test Structure & Naming

Tests are co-located with source code in `__tests__/` directories:

```plain
src/
  components/
    Button.ts
    __tests__/
      Button.spec.ts
  utils/
    helpers.ts
    __tests__/
      helpers.spec.ts
```

Naming convention:

- Test files: `[SourceFile].spec.ts`
- Co-location makes tests easy to find and maintain

### Test Code Style

- Use descriptive test names
- Group related tests with `describe`
- Use `it` or `test` for individual cases
- Clean up resources after tests (`afterEach`, `afterAll`)
- Follow the same TypeScript rules as non-test code

## Markdown Generation

When generating markdown (documentation, AGENTS.md, etc.):

- **Preserve code formatting**: `__` should NOT be converted to bold
  within inline code or code blocks
- Use backticks for inline code: `` `__tests__` ``
- Code blocks will preserve literal `__` as-is
- This applies to Node.js globals (`__dirname`, `__filename`)
  and directory names (`__tests__`, `__mocks__`, etc.)

Example:

- ✓ Tests in `` `__tests__` `` directories
- ✗ Tests in `**tests**` directories (incorrect)
