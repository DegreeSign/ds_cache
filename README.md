# DegreeSign Server Cache SDK

Instant data read/write for any project.

## Change Log

[Change Log](changes.md)

## Setup

Install with `yarn add @degreesign/cache` or `npm install @degreesign/cache`.

## Usage

Import and use the SDK functions as shown below with examples using absolute paths.

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
  redJCompressed
} from '@degreesign/cache';

// Validate Folder (create if does not exist)
safeFolder('/absolute/path/to/target/folder'); // Returns true if successful

// Delete Folder
delFolder('/absolute/path/to/target/folder'); // Returns true if deleted

// File Stats
fileStats('/absolute/path/to/target/file.txt'); // Returns fs.Stats object or undefined

// Delete File
delFile('/absolute/path/to/target/file.txt'); // Returns true if deleted

// Write to files
wrt('/absolute/path/to/file.txt', 'Hello, world!'); // Returns true if written

// Write JSON to files
wrtJ('/absolute/path/to/file.json', { key: 'value' }); // Returns true if written

// Write Compressed JSON files
wrtJCompressed({
  fileName: '/absolute/path/to/file.json.gz',
  inputData: { key: 'value' }
}); // Returns true if written

// Read files
red('/absolute/path/to/file.txt'); // Returns string content or undefined

// Read JSON files
redJ('/absolute/path/to/file.json'); // Returns parsed JSON or undefined

// Read Compressed JSON files
redJCompressed({
  fileName: '/absolute/path/to/file.json.gz'
}); // Returns parsed JSON or undefined
```