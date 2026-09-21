# AGENTS.md

Guidance for AI agents and contributors working on the `@degreesign/cache` repository.

## Project

DegreeSign Server Cache SDK — a zero-dependency Node.js/TypeScript SDK for reading and writing files, JSON, and gzip-compressed JSON, plus a disk-backed live cache. Source lives in `src/`, build output in `dist/` (generated, do not edit by hand).

## Version bumps

The published version lives in `package.json` (`version`). Whenever you bump it, you MUST update every version reference in the docs in the same change:

1. `package.json` — `version` (source of truth).
2. `README.md` — every CDN URL in the Installation section (`esm.sh`, `unpkg`, `jsDelivr`) is version-pinned; update the `@X.Y.Z` tag.
3. `changes.md` — add a new entry at the top under the changelog header, in the format:
   `### <D Month YYYY> (version X.Y.Z)` followed by a bullet list of changes.

Rules:
- Never bump only `package.json`; leaving the docs stale is a bug.
- Use [Semantic Versioning](https://semver.org/): MAJOR for breaking changes, MINOR for new features, PATCH for fixes.
- Keep the date format consistent with existing entries (`14 December 2025`, `22 September 2026`).
- The npm version badge in `README.md` is dynamic and needs no manual edit.

## Build

```bash
yarn build   # or npm run build — runs webpack
```

Rules:
- NEVER build the project as part of routine work. `dist/` is generated and should only be produced deliberately by a maintainer, not by agents.
- If you must build for testing, delete the build output and revert any resulting changes to tracked files in `dist/` once testing is done. Leave the working tree exactly as it was before the build.

## Style

- TypeScript, 4-space indentation, single quotes, no source comments unless necessary.
- API functions should not throw; return `boolean` / `undefined` and log errors with a timestamp.
