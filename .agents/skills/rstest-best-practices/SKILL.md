---
name: rstest-best-practices
description: Rstest best practices for project setup, configuration, CLI workflow, test writing, mocking, snapshot testing, DOM testing, coverage, multi-project setup, and CI integration. Use when setting up, writing, or reviewing Rstest tests and test projects. For systematic startup, build, runtime, logging, memory, or performance diagnosis, use rstest-debugging.
---

# Rstest Best Practices

Apply these rules when setting up, writing, or reviewing Rstest projects.

## Workflow

- Inspect the existing package manager, dependency policy, module mode, build configuration, test layout, and framework conventions before editing.
- Add `@rstest/core`, a package-local test script, and a config file whose extension matches the package's module mode.
- Reuse existing build configuration only when doing so lowers maintenance cost and remains compatible. An adapter is optional; use an independent Rstest config when adapter integration is incompatible or disproportionately costly, and explicitly reproduce required aliases, plugins, defines, environments, and externals.
- Configure test discovery, environment, and setup files intentionally. Do not enable `passWithNoTests` unless an empty test set is an expected and documented state.
- Verify test discovery with `rstest list`, then run focused tests, the full suite, and the project's existing build or type-check command.

## Configuration and environments

- Use `defineConfig` from `@rstest/core` and a config file extension compatible with the package's module mode.
- Prefer explicit imports from `@rstest/core` over `globals: true`.
- Use `setupFiles` for shared matchers and cleanup; use `plugins`, `resolve`, or `source` for ordinary build integration and low-level `tools` only when necessary.
- Set `include` explicitly when the package's test layout is non-standard; do not assume the default discovery pattern.
- Use `node` for server/SSR tests, `happy-dom` or `jsdom` for simulated DOM tests, and Browser Mode for real-browser behavior; install the selected environment package explicitly.
- For React or Vue component tests, register the matching build plugin, use the corresponding Testing Library, and centralize matcher extension and cleanup in a setup file.
- Use multiple test projects only when environments or configurations genuinely differ; keep global options such as reporters, coverage, pool, isolation, and bail at the root.

## Test writing

- Prefer small tests that verify one public behavior; use `.skip` or `.todo` intentionally and never commit `.only`.
- Keep test APIs and test files in the same module system as the project; do not mix ESM/CJS assumptions without verifying the runtime and bundler behavior.
- Prefer `await expect(promise).resolves...` and `.rejects...` over `try/catch` patterns that can miss assertions.
- Use `includeSource` only for small utilities, guard tests with `import.meta.rstest`, and define it as `false` in production builds.

## Mocking

- Use `rs.fn()` for functions, `rs.spyOn()` for object methods, and `rs.mock()` factories for modules; mock external boundaries rather than the subject under test.
- Choose `clearMocks`, `resetMocks`, or `restoreMocks` according to whether calls, implementations, or original methods must be restored between tests.
- Choose the module-mocking API that matches the module system; verify the exact request string and register hoisted/static mocks before the module under test is evaluated.
- Module mocks replace runtime behavior but do not necessarily remove the real dependency from the Rspack build graph. Use aliases or narrowly scoped externals only when the build still traverses an unwanted or unavailable dependency, and verify the runtime externalization format.

## Snapshots and coverage

- Keep snapshots small and deterministic: use inline snapshots for short output, file snapshots for large structured output, and serializers for paths or unstable data. Review every update.
- Enable coverage with `--coverage` or `coverage.enabled`.
- Choose a coverage provider supported by the installed Rstest version and add its package explicitly; do not copy a V8 or Istanbul provider choice without checking project needs.
- Set `coverage.include` deliberately before adding thresholds; choose reporters for humans and CI artifacts separately.

## Running and CI

- Use `rstest` for a single run; `rstest run` is an optional explicit equivalent. Use `rstest --watch` or `rstest watch` only for local development.
- Use `rstest list` to verify discovery, positional filters or `-t` for focused runs, `-u` for intentional snapshot updates, and `-c` for a non-default config.
- In CI, never use watch mode. Use sharding with blob reports and `rstest merge-reports` when distributing tests; use JUnit when the CI system requires machine-readable results.
- If passing-test logs are too noisy, consider `silent: 'passed-only'`; disable it temporarily when diagnosing setup or runtime output.

## First-line debugging

- Start with a focused repro and `--reporter=verbose`; use `--printConsoleTrace` for noisy or unclear console output.
- Use `DEBUG=rstest` and inspect `dist/.rstest-temp/.rsbuild/` to verify final Rstest/Rsbuild/Rspack configuration and generated build output.
- Use breakpoints through the Rstest VS Code extension or a JavaScript Debug Terminal for runtime failures.
- Use `rstest-debugging` for systematic startup, build, runtime, logging, memory, or performance diagnosis.

## Documentation

- For the latest Rstest docs, read https://rstest.rs/llms.txt
