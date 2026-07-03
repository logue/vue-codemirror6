---
name: rstest-best-practices
description: Rstest best practices for config, CLI workflow, test writing, mocking, snapshot testing, DOM testing, coverage, multi-project setup, CI integration, performance and debugging. Use when writing, reviewing, or troubleshooting Rstest test projects.
---

# Rstest Best Practices

Apply these rules when writing or reviewing Rstest test projects.

## Configuration

- Use `rstest.config.ts` and `defineConfig` from `@rstest/core`
- Prefer explicit imports `import { test, expect, describe } from '@rstest/core'` over `globals: true`
- For Rsbuild projects, use `@rstest/adapter-rsbuild` with `extends: withRsbuildConfig()` to reuse build config
- For Rslib projects, use `@rstest/adapter-rslib` with `extends: withRslibConfig()` to reuse build config
- Use `setupFiles` for shared test setup (e.g., custom matchers, cleanup hooks)
- When using Rsbuild plugins (e.g., `@rsbuild/plugin-react`), add them via the `plugins` field
- For deep-level or advanced build configuration needs, use `tools.rspack` or `tools.bundlerChain`

## CLI

- Use `rstest` or `rstest run` to run tests (`run` disables watch mode, suitable for CI)
- Use `rstest --watch` or `rstest watch` for local development with file watching
- Use `rstest list` to list all test files and test names
- Use `rstest -u` to update snapshots
- Use `--reporter=verbose` when debugging test failures for detailed output
- Use `--config` (`-c`) to specify a custom config file path

## Test writing

- Import test APIs from `@rstest/core`: `test`, `describe`, `expect`, `beforeEach`, `afterEach`, etc.
- Use `test` or `it` for test cases; use `describe` for grouping related tests
- Use `.only` to focus on specific tests during development, but never commit `.only` to the codebase
- Use `.skip` or `.todo` to mark incomplete or temporarily skipped tests
- Prefer small, focused test cases that test a single behavior
- For async error paths, prefer `await expect(fn()).rejects.toThrow(ErrorClass)` (or `.rejects.toMatchObject({ ... })`) over `try/catch` with `expect.fail` or `.catch(e => e)` patterns — the matcher form fails clearly if the promise unexpectedly resolves, keeps the assertion in one chain, and avoids forgetting to assert the throw at all
- For async happy paths, use `await expect(fn()).resolves.toEqual(...)` for the same reason
- Use `includeSource` for in-source testing of small utility functions (Rust-style `import.meta.rstest`)
- For in-source tests, wrap test code in `if (import.meta.rstest) { ... }` and define `import.meta.rstest` as `false` in production build config

## Test environment

- Use `testEnvironment: 'node'` (default) for Node.js / server-side code
- Use `testEnvironment: 'jsdom'` or `testEnvironment: 'happy-dom'` for DOM / browser API testing
- Install `jsdom` or `happy-dom` as a dev dependency when using DOM environments
- Prefer `happy-dom` for faster DOM testing; use `jsdom` when better browser API compatibility is needed
- For real browser testing, use `@rstest/browser` with Playwright
- Use inline project configs to run different test environments within one project (e.g., `node` and `jsdom` projects)

## React / Vue testing

- For React: use `@rsbuild/plugin-react` plugin and `@testing-library/react` for component testing
- For Vue: use `@rsbuild/plugin-vue` plugin and `@testing-library/vue` for component testing
- Create a `rstest.setup.ts` with `expect.extend(jestDomMatchers)` and `afterEach(() => cleanup())` for Testing Library
- Add the setup file to `setupFiles` in config
- For SSR testing, use `testEnvironment: 'node'` and test with `react-dom/server` or framework-specific SSR APIs

## Mocking

- Use `rs.mock('./module')` to mock modules
- Use `rs.fn()` to create mock functions
- Use `rs.spyOn(object, 'method')` to spy on methods
- Prefer `clearMocks`, `resetMocks`, or `restoreMocks` config options to automatically clean up mocks between tests
- Use factory functions in `rs.mock('./module', () => ({ ... }))` to provide mock implementations

## Snapshot testing

- Use `toMatchSnapshot()` for general snapshot testing
- Use `toMatchInlineSnapshot()` for small, readable inline snapshots
- Use `toMatchFileSnapshot()` for large or structured outputs (e.g., HTML, generated code)
- Keep snapshots concise — only include relevant data, avoid timestamps and session IDs
- Use `expect.addSnapshotSerializer()` to mask paths or sensitive data in snapshots
- Use `path-serializer` to normalize file paths across platforms
- Review snapshot changes carefully in code review

## Coverage

- Enable coverage with `--coverage` CLI flag or `coverage.enabled: true` in config
- Install `@rstest/coverage-istanbul` for the Istanbul coverage provider
- Use `coverage.include` to specify source files for coverage (e.g., `['src/**/*.{js,ts,tsx}']`)
- Use `coverage.thresholds` to enforce minimum coverage requirements
- Use `coverage.reporters` to generate reports in different formats (e.g., `text`, `lcov`, `html`)

## Multi-project testing

- Use `projects` field in root config to define multiple test projects
- For monorepos, use glob patterns like `'packages/*'` to auto-discover sub-projects
- Use `defineProject` helper in sub-project configs
- Extract shared config and use `mergeRstestConfig` to compose project configs
- Global options (`reporters`, `pool`, `isolate`, `coverage`, `bail`) must be set at the root level, not in projects

## CI integration

- Use `rstest run` (not `rstest watch`) in CI
- Use `--shard` for parallel test execution across CI machines (e.g., `--shard 1/3`)
- Use `--reporter=blob` with `rstest merge-reports` to combine sharded results
- Use `--reporter=junit` with `outputPath` for CI report integration
- The `github-actions` reporter is auto-enabled in GitHub Actions for inline error annotations
- Use `--bail` to stop early on first failure when appropriate

## Performance

- Disable `isolate` (`--no-isolate`) when tests have no side effects for faster execution via module cache reuse
- Use `pool.maxWorkers` to control parallelism based on available resources
- Keep test build fast by avoiding unnecessary Rspack plugins in test config
- Use test filtering (`rstest <pattern>` or `-t <name>`) to run only relevant tests during development
- Leverage watch mode's incremental re-runs for fast local feedback

## Debugging

- Run with `DEBUG=rstest` to enable debug mode, which writes final configs and build outputs to disk
- Read generated files in `dist/.rstest-temp/.rsbuild/` to confirm final Rstest/Rsbuild/Rspack config
- Use VS Code's JavaScript Debug Terminal to run `rstest` with breakpoints
- Use `--reporter=verbose` for detailed per-test output
- Use `--printConsoleTrace` to trace console calls to their source
- Add VS Code launch config for debugging specific test files with `@rstest/core/bin/rstest.js`

## Profiling

- Use Rsdoctor with `RSDOCTOR=true rstest run` to analyze test build performance
- Use `samply` for native profiling of both main and worker processes
- Use Node.js `--heap-prof` for memory profiling

## Toolchain integration

- Use the official VS Code extension (`rstack.rstest`) for in-editor test running and debugging
- For Rslib libraries, use `@rstest/adapter-rslib` for config reuse
- For Rsbuild apps, use `@rstest/adapter-rsbuild` for config reuse
- Use `process.env.RSTEST` to detect test environment and apply test-specific config

## Documentation

- For the latest Rstest docs, read https://rstest.rs/llms.txt
