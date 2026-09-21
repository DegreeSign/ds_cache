# DegreeSign Server Cache SDK

**Instant, dependency-free data read/write caching for Node.js — one tiny TypeScript SDK that reads and writes files, JSON, and gzipped JSON with safe folders and a live disk-backed cache.**

[![npm version](https://img.shields.io/npm/v/@degreesign/cache.svg?style=flat-square)](https://www.npmjs.com/package/@degreesign/cache)
[![npm downloads](https://img.shields.io/npm/dm/@degreesign/cache.svg?style=flat-square)](https://www.npmjs.com/package/@degreesign/cache)
[![changelog](https://img.shields.io/badge/changelog-view-blue.svg?style=flat-square)](./changes.md)
[![license](https://img.shields.io/npm/l/@degreesign/cache.svg?style=flat-square)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178c6.svg?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-339933.svg?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg?style=flat-square)](./package.json)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/DegreeSign/ds_cache/pulls)

---

## Table of Contents

- [Introduction](#introduction)
- [Why DegreeSign Server Cache SDK?](#why-degreesign-server-cache-sdk)
- [Installation](#installation)
  - [npm](#npm)
  - [yarn](#yarn)
  - [pnpm](#pnpm)
  - [CDN](#cdn)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [File Writes](#file-writes)
  - [File Reads](#file-reads)
  - [Compressed JSON](#compressed-json)
  - [Folders and File Utilities](#folders-and-file-utilities)
  - [Disk-Backed Live Cache](#disk-backed-live-cache)
- [TypeScript](#typescript)
- [FAQ](#faq)
- [Change Log](#change-log)
- [Keywords](#keywords)
- [License](#license)

---

## Introduction

**DegreeSign Server Cache SDK** (`@degreesign/cache`) is a tiny, zero-dependency Node.js library for fast, reliable data persistence and caching on the local filesystem. It gives you simple, safe helpers to write and read plain text, JSON, and gzip-compressed JSON, manage folders and files, and keep a disk-backed in-memory cache — all with TypeScript types out of the box.

The SDK ships as a single minified CommonJS bundle and works anywhere Node.js runs: servers, CLIs, background jobs, Electron main processes, and serverless functions with a writable filesystem. Every function returns a predictable value (`true`, `false`, or the data) instead of throwing, so your caching layer never takes down your app.

## Why DegreeSign Server Cache SDK?

- **Zero dependencies** — no runtime packages, no supply-chain risk, no bloat.
- **Tiny and fast** — one minified Node.js bundle with synchronous, low-overhead file access.
- **Safe by default** — never throws; operations return `boolean` or `undefined` and log helpful, timestamped errors.
- **JSON and gzip built in** — persist plain objects or shrink them on disk with `wrtJCompressed` / `redJCompressed`.
- **Disk-backed live cache** — `saveCache` / `readCache` keep hot data in memory and fall back to disk on cold reads.
- **First-class TypeScript** — fully typed generics (`readJ<T>`, `readCache<T>`) and shipped `.d.ts` declarations.
- **Predictable API** — short, memorable, tree-shakeable exports for files, folders, and cache.
- **Framework agnostic** — use it in Express, Fastify, NestJS, Next.js server code, CLIs, and more.

## Installation

### npm

```bash
npm install @degreesign/cache
```

### yarn

```bash
yarn add @degreesign/cache
```

### pnpm

```bash
pnpm add @degreesign/cache
```

### CDN

Load the published bundle directly from a CDN (Node.js/Deno runtime — the SDK uses `node:fs` and `node:zlib`):

```html
<script type="module">
  import {
    wrtJ, redJ, saveCache, readCache
  } from 'https://esm.sh/@degreesign/cache@1.0.0';
</script>
```

Or resolve a version-pinned file URL with unpkg / jsDelivr:

```text
https://unpkg.com/@degreesign/cache@1.0.0/dist/node/degreesign.node.min.js
https://cdn.jsdelivr.net/npm/@degreesign/cache@1.0.0/dist/node/degreesign.node.min.js
```

## Quick Start

```ts
import {
  safeFolder,
  delFolder,
  fileStats,
  delFile,
  wrt,
  wrtJ,
  wrtJCompressed,
  red,
  redJ,
  redJCompressed,
  saveCache,
  readCache,
  getCacheDir,
  setCacheDir,
} from '@degreesign/cache';

// Validate Folder (create if it does not exist)
safeFolder('/absolute/path/to/target/folder'); // true

// Delete Folder
delFolder('/absolute/path/to/target/folder'); // true if deleted

// File Stats
fileStats('/absolute/path/to/target/file.txt'); // fs.Stats | undefined

// Delete File
delFile('/absolute/path/to/target/file.txt'); // true if deleted

// Write to a file
wrt('/absolute/path/to/file.txt', 'Hello, world!'); // true

// Write JSON to a file
wrtJ('/absolute/path/to/file.json', { key: 'value' }); // true

// Write compressed JSON to a file
wrtJCompressed({
  fileName: '/absolute/path/to/file.json.gz',
  inputData: { key: 'value' },
}); // true

// Read a file
red('/absolute/path/to/file.txt'); // 'Hello, world!' | undefined

// Read JSON from a file
redJ('/absolute/path/to/file.json'); // { key: 'value' } | undefined

// Read compressed JSON from a file
redJCompressed({
  fileName: '/absolute/path/to/file.json.gz',
}); // { key: 'value' } | undefined

// Disk-backed live cache
setCacheDir('/absolute/path/to/cache-folder');
saveCache('users/1', { id: 1, name: 'Ada' }); // true
readCache<{ id: number; name: string }>('users/1'); // { id: 1, name: 'Ada' } | undefined
```

> Tip: `wrt` / `red` and their JSON variants expect an **absolute path**. Use `safeFolder` (or `setCacheDir`) first to guarantee the directory exists.

## API Reference

All exports are available from the package root and from the built `dist/` declarations.

### File Writes

| Function | Signature | Returns | Description |
| --- | --- | --- | --- |
| `wrt` | `(fileName: string, inputData: string) => boolean` | `boolean` | Writes a UTF-8 string to a file. Returns `true` on success. |
| `wrtJ` | `<T>(fileName: string, inputData: T) => boolean` | `boolean` | Serializes `inputData` to JSON and writes it to a file. |
| `wrtJCompressed` | `<T>({ fileName, inputData }: { fileName: string; inputData: T }) => boolean` | `boolean` | JSON-serializes then gzip-compresses data before writing. |

### File Reads

| Function | Signature | Returns | Description |
| --- | --- | --- | --- |
| `red` | `(fileName: string, disableLog?: boolean) => string \| undefined` | `string \| undefined` | Reads a file as a UTF-8 string. Pass `disableLog` to silence error logs. |
| `redJ` | `<T>(fileName: string, disableLog?: boolean) => T \| undefined` | `T \| undefined` | Reads a file and parses it as JSON. |
| `redJCompressed` | `<T>({ fileName, disableLog }: { fileName: string; disableLog?: boolean }) => T \| undefined` | `T \| undefined` | Reads a gzip file, decompresses it, and parses the JSON. |

### Compressed JSON

| Function | Signature | Returns | Description |
| --- | --- | --- | --- |
| `wrtJCompressed` | `<T>({ fileName, inputData }) => boolean` | `boolean` | Gzip-compresses JSON on write — ideal for large payloads and archives. |
| `redJCompressed` | `<T>({ fileName, disableLog? }) => T \| undefined` | `T \| undefined` | Gunzips and parses JSON on read. |

### Folders and File Utilities

| Function | Signature | Returns | Description |
| --- | --- | --- | --- |
| `safeFolder` | `(targetFolder: string) => boolean` | `boolean` | Creates a folder (recursively) if it does not exist. Safe to call repeatedly. |
| `delFolder` | `(targetFolder: string) => boolean` | `boolean` | Recursively deletes a folder, including its contents. |
| `delFile` | `(targetFile: string) => boolean` | `boolean` | Deletes a single file if it exists. |
| `fileStats` | `(targetFile: string) => Stats \| undefined` | `fs.Stats \| undefined` | Returns Node's `fs.Stats` (size, timestamps, etc.) for a file. |

### Disk-Backed Live Cache

| Function | Signature | Returns | Description |
| --- | --- | --- | --- |
| `saveCache` | `(key: string, data: any) => boolean` | `boolean` | Stores data in the in-memory live cache and persists it to `<cacheDir>/<key>.json`. |
| `readCache` | `<T>(key: string) => T \| undefined` | `T \| undefined` | Reads from memory first, then falls back to disk and repopulates the live cache. |
| `getCacheDir` | `() => string` | `string` | Returns the current cache directory (defaults to `./cache/`). |
| `setCacheDir` | `(newDir: string) => void` | `void` | Sets the cache directory and creates it with `safeFolder` if needed. |

## TypeScript

The SDK is written in TypeScript and ships type declarations (`dist/index.d.ts`). Generic reads are fully typed:

```ts
import { readCache, readJ } from '@degreesign/cache';

interface User {
  id: number;
  name: string;
}

const user = readCache<User>('users/1'); // User | undefined
const config = readJ<{ port: number }>('/etc/app/config.json'); // { port: number } | undefined
```

## FAQ

**What is DegreeSign Server Cache SDK?**
It is a lightweight Node.js/TypeScript SDK for reading and writing files, JSON, and gzip-compressed JSON to the local filesystem, plus a disk-backed in-memory cache (`saveCache` / `readCache`).

**Is it free?**
Yes. It is open source under the [MIT License](./LICENSE) and free for personal and commercial use.

**Does it work with Node.js and the browser?**
It is built for Node.js 18+ (it uses `node:fs` and `node:zlib`). It is not designed to run in the browser, where those built-ins do not exist; in a bundler targeted at the web, you would need a filesystem shim.

**Does it have any dependencies?**
No. `@degreesign/cache` has **zero runtime dependencies** — only dev dependencies for building and bundling.

**Is it written in TypeScript?**
Yes. The source is TypeScript, fully typed, and ships `.d.ts` declarations with generic reads such as `readJ<T>` and `readCache<T>`.

**Which frameworks does it support?**
Any Node.js environment: Express, Fastify, Koa, NestJS, Next.js server routes, CLIs, Electron main process, and serverless functions with a writable filesystem. It is framework agnostic.

**Does it throw errors?**
No. Functions return `true` / `false` or `undefined` and log timestamped errors instead of throwing. Reads accept a `disableLog` flag to stay quiet.

**How is this different from Redis or a database?**
It is a local filesystem cache — no server, no network, no setup. It is ideal for build artifacts, scraped data, config snapshots, and hot local data, not for distributed or multi-writer workloads.

## Change Log

See [changes.md](./changes.md) for release history.

## Keywords

node cache, nodejs cache, server cache, file cache, filesystem cache, disk cache, JSON cache, gzip cache, compressed JSON, TypeScript cache SDK, zero dependency cache, Node.js persistence, local cache library, read write files Node.js, sync file cache, live cache, disk-backed cache, data persistence SDK, degreesign, @degreesign/cache.

## License

[MIT](./LICENSE) © Prince Hasn
