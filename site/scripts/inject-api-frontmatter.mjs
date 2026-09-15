// typedoc-plugin-markdown emits plain Markdown files with no frontmatter.
// Fumadocs' `docs` collection (content/docs/**) requires a `title` string in
// frontmatter for every page, so this walks the generated content/docs/api
// tree after `typedoc` runs and prepends a title derived from each file's
// first `# ` heading.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const apiDir = join(__dirname, '..', 'content', 'docs', 'api');

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
    } else if (entry.endsWith('.md')) {
      injectFrontmatter(full);
    }
  }
}

function injectFrontmatter(filePath) {
  const body = readFileSync(filePath, 'utf-8');
  const heading = body.match(/^#\s+(.+)$/m);
  const title = heading ? heading[1].trim() : 'API Reference';
  const escapedTitle = title.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const frontmatter = `---\ntitle: "${escapedTitle}"\n---\n\n`;
  writeFileSync(filePath, frontmatter + body);
}

walk(apiDir);
