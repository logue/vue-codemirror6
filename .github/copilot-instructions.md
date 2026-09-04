# AI Project Instructions

This project strictly enforces framework configurations, linter priority, and task-specific workflows via Vercel Skills and the root `AGENTS.md`.

## Mandatory Rule Initialization
Before generating, modifying, or refactoring any code (especially Vue, Vapor, and Rstack settings), you MUST execute the following command to load the precise coding rules:

```bash
npx skills list
```

## Architecture Context
- **Linter Priority**: Always prioritize Rslint for auto-fixes over Biome config.
- **Rules & Examples**: Follow the skills loaded by `npx skills`.
