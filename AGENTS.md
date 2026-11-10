# AGENTS.md

This project uses Rstack CLI as its JS toolchain:

- Read the docs linked from `node_modules/rstack/docs/llms.txt` when needed
- Online docs: <https://rstack.rs/llms.txt>
- Run `rs -h` for CLI help

## Setup & Overview

- **Build tools**: Rstack (rslib for library, rsbuild for demo, rspress for documantation site)
- **Linter**: Rslint and Prettier
- **Testing**: Rstest
- **Language**: TypeScript 7
- **Package manager**: pnpm (do not use npm or yarn)

**Last updated**: 2026-11-05
**Verified with**: `package.json` in this repository

### Tool Versions

See `package.json` for authoritative dependency versions.

This guide assumes:

- TypeScript 7.0.2 or later
- rstack 0.9.0 or later

**If you encounter version-related issues, check `package.json` directly—it is the source of truth.**

### Dependency Management

- `minimumReleaseAge: 0` is set in `pnpm-workspace.yaml` to prevent unpredictable auto-injection of `minimumReleaseAgeExclude`
- This ensures version resolution is deterministic and reproducible across projects

### VS Code Setup

Recommended extensions are listed in `.vscode/extensions.json`.
Formatter and linter are configured in `.vscode/settings.json`:

- Default formatter: **Prettier**
- Format on save: enabled
- Auto-fix on save: Rslint

When you open the project in VS Code, you'll be prompted to install recommended extensions.

## Project

### Project Structure

This project uses the Rstack CLI as a unified interface for the library,
demo, tests, and linting:

- **Rslib** - Builds the library for distribution (ESM and UMD)
  - Command: `pnpm run build`
  - Output: `dist/` (published to npm)
- **Rsbuild** - Builds the demo (Playground).
  - Command: `pnpm run build:demo`
  - Output: `src-docs/public/demo/` (served by the documentation site and embedded on its Playground page)
- **Rspress** - Builds the documentation site
  - Source: `src-docs/`
  - Command: `pnpm run build:docs`
  - Output: `docs/`
- **Rstest** - Runs the test suite
  - Command: `pnpm run test`
- **Rslint and Prettier** - Lints and formats the project
  - Command: `pnpm run lint`

All tool configuration is defined in `rstack.config.ts` through
`define.app`, `define.doc`, `define.lib`, `define.test` ,`define.lint`, and `define.fmt`.
TypeScript compiler options remain separated by use case:

- `tsconfig.rslib.json` - Library source and declaration generation
- `tsconfig.rsbuild.json` - Demo application
- `tsconfig.rspress.json` - Documentation site and theme
- `tsconfig.rstest.json` - Tests

### Development Workflow

- `pnpm run dev` - Start the demo development server with hot reload
- `pnpm run build` - Build the library for production
- `pnpm run build:demo` - Build the demo application into `src-docs/public/demo/` for the documentation site's Playground page
- `pnpm run preview` - Preview the built demo application
- `pnpm run dev:docs` - Start the Rspress documentation server
- `pnpm run build:docs` - Build the documentation into `docs/`
- `pnpm run preview:docs` - Preview the built documentation site

## Commands

- `pnpm run dev` - Start the demo development server with hot reload
- `pnpm run dev:docs` - Start the Rspress documentation server
- `pnpm run build:docs` - Build the documentation into `docs/`
- `pnpm run preview:docs` - Preview the built documentation site
- `pnpm run lint` - Lint and format all code (Biome + Rslint)
- `pnpm run analyze` - Analyze library build artifacts
- `pnpm run test` - Run tests at once
- `pnpm run test:watch` - Watch mode for tests
- `pnpm run clean` - Remove build artifacts
- `pnpm run clean:hard` - Remove build artifact and build caches

### Rsdoctor Analysis (AI Internal Use)

Use Rsdoctor analysis internally to support evidence-based bundle optimization.
Keep this workflow read-only unless the user explicitly asks for setup or code
changes.

The `rg` command (ripgrep) used below is a standalone tool and is not installed
by `pnpm install`. Install it with your OS package manager if it is unavailable:

- macOS (Homebrew): `brew install ripgrep`
- Debian/Ubuntu: `sudo apt install ripgrep`
- Windows (WinGet): `winget install BurntSushi.ripgrep.MSVC`

Verify the installation with `rg --version`.

- First check a user-provided or known path for a real `rsdoctor-data.json`. If
  no path is available and a report needs to be generated, run
  `pnpm run analyze` before searching. Since `.rstack/` is gitignored, use
  `rg --hidden --no-ignore --files .rstack` to locate the generated file;
  ordinary `rg --files` will omit it.
- Do not run `rsdoctor-agent` until the data file exists. If it is missing, ask
  for its path or generate it with `pnpm run analyze` when generation is
  required.
- `rsdoctor` from `@rsdoctor/cli` is only the browser viewer. It is not a
  substitute for the data-fetching `rsdoctor-agent` from
  `@rsdoctor/agent-cli`.
- This repository uses `@rsdoctor/rspack-plugin` 1.6.x. If JSON output is not
  produced by the normal script, use `RSDOCTOR_OUTPUT=json RSDOCTOR=true pnpm run build`.
  For plugin versions below 1.5.11, configure brief JSON output instead of
  using `RSDOCTOR_OUTPUT=json`.
- Validate that the generated data is valid JSON before analysis. A
  `.rstack/.rsdoctor/manifest.json` file alone is only a viewer index.
- Fetch only the default evidence first: build cost, top assets, top packages,
  duplicate packages, cross-chunk duplication, and retained tree-shaking
  modules. Bound output with filters, pagination, and limits.
- Rank recommendations by measured impact. Trace issuer/reference chains,
  inspect bailout reasons, change configuration, or rerun builds only as an
  explicit follow-up.
- Present findings as high-priority issues, proposed solutions, optional
  reference-chain follow-ups, and remaining deep-dive categories. Include
  concrete sizes, times, counts, paths, or rule codes where available.

For command details and version-specific generation rules, read
`.agents/skills/rsdoctor-analysis/SKILL.md` and its references.

### Rspress Documentation

The documentation site is configured with `define.doc()` in `rstack.config.ts`.
Its source root is `src-docs/` and its generated output is `docs/`; keep these
paths aligned with the Rspress config and the package scripts. When updating the
documentation site, follow `.agents/skills/rspress-docs-generator/SKILL.md` and
validate changes with `pnpm run build:docs`.

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
