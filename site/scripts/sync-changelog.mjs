import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(__dirname, '..', '..', 'CHANGELOG.md');
const destPath = join(__dirname, '..', 'content', 'docs', 'changelog.mdx');

const body = existsSync(sourcePath)
  ? readFileSync(sourcePath, 'utf-8')
  : '_No releases yet._\n';

const frontmatter = `---
title: Changelog
description: Release history for @aliraslan/fx.
---

`;

mkdirSync(dirname(destPath), { recursive: true });
writeFileSync(destPath, frontmatter + body);
